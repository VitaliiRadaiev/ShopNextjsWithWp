// import { Api } from "@/app/6_shared/api/Api";
// import { LastViewedProductsType } from "..";


// export class LastVIewedProductsApi extends Api {
//     static currentUrl: string = `${this.baseUrl}/lastViewedProducts`;

//     static getProducts = async (jwt: string) => {
//         const res = await fetch(`${this.currentUrl}`, {
//             method: 'GET',
//             headers: {
//                 'authorization': 'Bearer ' + jwt
//             }
//         })

//         return await this.handleResponse<LastViewedProductsType>(res);
//     }

//     static addProduct = async (jwt: string, productId: string) => {
//         const res = await fetch(`${this.currentUrl}/product/${productId}`, {
//             method: 'PUT',
//             headers: {
//                 'authorization': 'Bearer ' + jwt
//             }
//         })

//         return await this.handleResponse<LastViewedProductsType>(res);
//     }

//     static removeProduct = async (jwt: string, productId: string) => {
//         const res = await fetch(`${this.currentUrl}/product/${productId}`, {
//             method: 'DELETE',
//             headers: {
//                 'authorization': 'Bearer ' + jwt
//             }
//         })

//         return await this.handleResponse<LastViewedProductsType>(res);
//     }
// }