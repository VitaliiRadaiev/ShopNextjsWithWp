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

export const FragmentOrderFields = `
    date
    billing {
        email
        firstName
        lastName
        phone
    }
    databaseId
    lineItems {
        nodes {
            quantity
            total
            product {
                node {
                    ${FragmentProductCardFields}
                }
            }
        }
    }
    orderNumber
    paymentMethod
    paymentMethodTitle
    shipping {
        address1
    }
    status
    total
`;

export const FragmentCustomerFields = `
    databaseId
    jwtRefreshToken
    jwtAuthToken
    username
    sessionToken
    role
    billing {
        email
        firstName
        lastName
        phone
    }
`;
