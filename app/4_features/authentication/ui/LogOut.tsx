// "use client";

// import React, { JSX } from 'react';
// import clsx from 'clsx';
// import { Button } from '@/app/6_shared/ui/Buttons/Button';
// import { identifyUser } from '../lib/identifyUser';
// import { useRouter } from 'next/navigation';


// export function LogOut(): JSX.Element {
//     const router = useRouter();

//     const logOut = async () => {
//         localStorage.removeItem('user-jwt');
//         await identifyUser();
//         router.replace('/authorization');
//     }

//     return (
//         <Button onClick={logOut}>
//             Выйти
//         </Button>
//     );
// }