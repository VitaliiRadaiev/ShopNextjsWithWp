import { TAGS, fetchApi } from "@/app/6_shared/api/graphqlApi";
import { ProductsApi } from "./ProductsApi";
import { FetchProductsQueriesType, ProductSingleType } from "./types";
import { FragmentProductCardFields } from "@/app/6_shared/api/fragments";
import { ProductCardType } from "@/app/6_shared/types/types";

export async function fetchProductsByTagsAndCategory(categoryIn: string, tagIn: string) {
    const { data } = await fetchApi({
        query: `
            query getProducts($categoryIn: [String], $tagIn: [String]) {
                products(first: 5, where: {categoryIn: $categoryIn, tagIn: $tagIn}) {
                    nodes {
                        ${FragmentProductCardFields}
                    }
                }
            }
        `,
        variables: {
            categoryIn,
            tagIn
        },
        options: {
            next: {
                revalidate: 600
            },
        }
    })
    return data.data.products.nodes as ProductCardType[];
}

export async function fetchProducts({
    count,
    categorySlug,
    tags,
    minPrice,
    maxPrice,
    inStock,
    endCursor,
    filters,
    sortBy
}: FetchProductsQueriesType) {    
    const { data } = await fetchApi({
        query: `
            query getCategoryProducts(
                $first: Int = 15,
                $after: String = "",
                $category: String = "",
                $tagIn: [String] = "",
                $stockStatus: [StockStatusEnum] = IN_STOCK
            ) {
                products(
                    first: $first,
                    after: $after,
                    where: {
                        category: $category,
                        tagIn: $tagIn,
                        stockStatus: $stockStatus,
                        taxonomyFilter: {
                            relation: AND,
                            filters: [
                                ${filters 
                                    ? filters?.map(filter => {
                                        return `{taxonomy: ${filter.taxonomy.toUpperCase()}, terms: [${filter.terms.map(i => `\"${i}\"`).join(',')}]},`
                                    }).join(',')
                                    : ''
                                }
                            ]
                        },
                        ${minPrice ? `minPrice: ${minPrice},` : ''}
                        ${maxPrice ? `maxPrice: ${maxPrice},` : ''}
                        ${
                            sortBy === 'cheap'
                                ? 'orderby: {field: PRICE, order: ASC},' :
                            sortBy === 'expensive'
                                ? 'orderby: {field: PRICE, order: DESC},' :
                            sortBy === 'rank'
                                ? 'orderby: {field: RATING},' : ''
                        }
                    }
                ) {
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                    nodes {
                        ${FragmentProductCardFields}
                    }
                }
            }
        `,
        variables: {
            first: count,
            category: categorySlug,
            tagIn: tags,
            stockStatus: inStock ? ["IN_STOCK"] : ["IN_STOCK", "OUT_OF_STOCK"],
            after: endCursor
        },
        options: {
            cache: 'no-cache'
        }
    })

    return {
        products: data.data.products.nodes,
        pageInfo: data.data.products.pageInfo
    } as {
        products: ProductCardType[];
        pageInfo: {
            hasNextPage: boolean;
            endCursor: string;
        }    
    }
}

const FragmentCommentFields = `
    content
    status
    author {
        node {
            name
            id
            databaseId
        }
    }
    databaseId
    date
`

export async function fetchProductBySlug(productSlug: string) {
    const { data } = await fetchApi({
        query: `
            query getProduct($id: ID!) {
                product(id: $id, idType: SLUG) {
                    reviewCount
                    reviews(where: {parentIn: "null"}) {
                        edges {
                            rating
                            node {
                                ${FragmentCommentFields}
                                replies {
                                    nodes {
                                        ${FragmentCommentFields}
                                    }
                                }
                            }
                        }
                    }
                ... on SimpleProduct {
                    id
                    databaseId
                    attributes {
                        nodes {
                            ... on GlobalProductAttribute {
                                id
                                name
                                options
                                label
                                terms {
                                    nodes {
                                        name
                                    }
                                }
                            }
                            ... on LocalProductAttribute {
                                id
                                name
                                label
                                options
                            }
                        }
                    }
                    averageRating
                    commentCount
                    description
                    galleryImages {
                    nodes {
                        sourceUrl
                    }
                    }
                    regularPrice
                    salePrice
                    stockStatus
                    title
                    productTags {
                    nodes {
                        name
                        id
                        slug
                    }
                    }
                }
                }
            }
        `,
        variables: {
            id: productSlug
        },
        options: {
            next: {
                tags: [TAGS.product]
            }
        }
    });

    return data.data.product as ProductSingleType | null;
}

export async function fetchRelatedProductsByProductSlug(productSlug: string) {
    const { data } = await fetchApi({
        query: `
            query getRelatedProducts($id: ID!) {
                product(id: $id, idType: SLUG) {
                    related(first: 5) {
                        nodes {
                            ${FragmentProductCardFields}
                        }
                    }
                }
            }
        `,
        variables: {
            id: productSlug
        },
        options: {
            next: {
                revalidate: 3600
            }
        }
    })

    const products = data?.data?.product?.related?.nodes;

    return products ? products as ProductCardType[] : null;
}

export async function searchProducts(text: string) {
    if(!text.length) return [];
    const { data } = await fetchApi({
        query: `
            query search($search: String = "", $categoryNotIn: [String]!) {
                products(first: 5, where: {search: $search, categoryNotIn: $categoryNotIn}) {
                    edges {
                        node {
                            ${FragmentProductCardFields}
                        }
                    }
                }
            }
        `,
        variables: {
            search: text,
            categoryNotIn: ["emptycategory"]
        }
    })

    return data.data.products.edges as { node: ProductCardType}[];
}