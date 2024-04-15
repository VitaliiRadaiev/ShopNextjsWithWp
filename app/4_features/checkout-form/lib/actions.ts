'use server';

import { OrderType } from "@/app/5_entities/orders";
import { fetchApi } from "@/app/6_shared/api/graphqlApi";
import { FragmentProductCardFields } from "@/app/6_shared/api/fragments";

interface CreateOrderQueryDataType {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    paymentMethod: string;
}


export async function createOrderAction(sessionToken: string, queryData: CreateOrderQueryDataType) {
    const { data } = await fetchApi({
        query: `
            mutation createOrder(
                $email: String!, 
                $firstName: String!, 
                $lastName: String!, 
                $phone: String!, 
                $isPaid: Boolean = false, 
                $paymentMethod: String = "cod",
                $address1: String!
            ) {
                checkout(
                    input: {
                        billing: {
                            email: $email, 
                            firstName: $firstName, 
                            lastName: $lastName, 
                            phone: $phone
                        }, 
                        isPaid: $isPaid, 
                        paymentMethod: $paymentMethod,  
                        shipping: {
                            address1: $address1
                        }
                    }
                ) {
                    order {
                        billing {
                            email
                            firstName
                            lastName
                            phone
                        }
                        date
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
                    }
                    result
                }    
            }
        `,
        variables: {
            email: queryData.email,
            firstName: queryData.firstName,
            lastName: queryData.lastName,
            phone: queryData.phone,
            paymentMethod: queryData.paymentMethod,
            address1: queryData.address
        },
        sessionToken
    })

    return {
        data: data.data.checkout,
        errors: data.errors 
    } as {
        data: {
            order: OrderType;
            result: string;
        };
        errors?: {
            message: string;
        }[]
    }
}