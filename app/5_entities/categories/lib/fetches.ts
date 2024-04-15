import { TAGS, fetchApi } from "@/app/6_shared/api/graphqlApi";
import { CategoriesApi } from "./CategoriesApi";
import { AttributeType, CategoryType, TagType } from "./types";

const FragmentCategoryFields = `
    databaseId
    image {
        sourceUrl
        altText
    }
    name
    slug
`

export async function fetchCategories() {
    const { data } = await fetchApi({
        query: `
            query getProductCategories {
                productCategories(where: {orderby: MENU_ORDER, order: ASC}) {
                    nodes {
                        ${FragmentCategoryFields}
                    }
                }
            }
        `,
        options: {
            next: {
                revalidate: 600
            }
        }
    })

    const categories = data.data.productCategories.nodes as CategoryType[]
    return categories.filter(category => category.slug !== 'emptycategory');
}

export async function fetchCategoryBySlug(categorySlug: string) {
    const { data } = await fetchApi({
        query: `
            query getProductCategory($id: ID!, $id1: ID!, $categoryIn: [String]!) {
                productCategory(id: $id, idType: SLUG) {
                    ${FragmentCategoryFields}
                }
                product(id: $id1, idType: SLUG) {
                    attributes {
                        nodes {
                        label
                        name
                            ... on GlobalProductAttribute {
                                id
                                terms {
                                    nodes {
                                        name
                                        slug
                                        id
                                        databaseId
                                    }
                                }
                            }
                        }
                    }
                }
                minPrice: products(
                    where: {categoryIn: $categoryIn, orderby: {field: PRICE, order: ASC}}
                    first: 1
                ) {
                    nodes {
                      ... on SimpleProduct {
                        price
                      }
                    }
                }
                maxPrice: products(
                    where: {categoryIn: $categoryIn, orderby: {field: PRICE, order: DESC}}
                    first: 1
                ) {
                    nodes {
                      ... on SimpleProduct {
                        price
                      }
                    }
                }
                productTags {
                    nodes {
                      slug
                      name
                      databaseId
                    }
                }
            }
        `,
        variables: {
            id: categorySlug,
            id1: categorySlug + '-attributes',
            categoryIn: categorySlug
        },
        options: {
            next: {
                revalidate: 600
            }
        }
    })
    
    return {
        productCategory: data.data.productCategory,
        attributes: data.data.product?.attributes?.nodes || [],
        priceRange: {
            from: extractNumberFromString(data.data.minPrice.nodes[0].price),
            to: extractNumberFromString(data.data.maxPrice.nodes[0].price)
        },
        tags: data.data.productTags.nodes
    } as {
        productCategory: CategoryType,
        attributes: AttributeType[],
        priceRange: {
            from: number;
            to: number;
        },
        tags: TagType[]
    }
}

function extractNumberFromString(inputString: string | null | undefined) {
    if(!inputString) return 0;

    const digitsOnly = inputString.replace(/[^\d]/g, '');

    const numberValue = parseInt(digitsOnly, 10);

    return numberValue;
}