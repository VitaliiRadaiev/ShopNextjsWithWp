export const FragmentProductCardFields = `
    ... on SimpleProduct {
        id
        databaseId
        averageRating
        featuredImage {
            node {
                sourceUrl
            }
        }
        price
        salePrice
        slug
        stockStatus
        title
        regularPrice
        productTags {
            nodes {
                name
                id
                slug
            }
        }
    }
`;

export const FragmentCartFields = `
    total
    subtotal
    contents(first: 100) {
        itemCount
        productCount
        nodes {
            product {
                node {
                    ${FragmentProductCardFields}
                }
            }
            quantity
            subtotal
            key
        }
    }
`;