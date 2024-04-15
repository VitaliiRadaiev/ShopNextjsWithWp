// 'use client';

// import { fetchMe } from "@/app/5_entities/users";
// import { createUnidentifiedUserAction, setAuthCookyAction } from "./actions";

// export async function identifyUser() {
//     const jwt = localStorage.getItem('user-jwt');

//     if (jwt) {
//         const user = await fetchMe(jwt);
//         if(user) {
//             setAuthCookyAction({
//                 isIdentified: user.isIdentified,
//                 jwtToken: jwt
//             });
//         }
//     } else {
//         const newUserData = await createUnidentifiedUserAction();
//         if (newUserData) {
//             localStorage.setItem('user-jwt', newUserData.jwtToken);
//             setAuthCookyAction({
//                 isIdentified: false,
//                 jwtToken: newUserData.jwtToken
//             });
//         }
//     }
// }