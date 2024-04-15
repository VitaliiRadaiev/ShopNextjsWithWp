// 'use client';

// import clsx from 'clsx';
// import { addProductToWishlistAction, removeProductFromWishlistAction } from '../lib/actions';
// import { StarIcon } from '@heroicons/react/24/solid';
// import { useFormStatus } from 'react-dom';
// import { PropsWithChildren } from 'react';
// import { Spinner } from '@/app/6_shared/ui/Spinner';

// interface ToggleWishlistProductProps {
//     productId: string;
//     inWishlist: boolean;
// }

// export function ToggleWishlistProduct({ productId, inWishlist }: ToggleWishlistProductProps) {
//     const addProductActionWithProductId = addProductToWishlistAction.bind(null, productId);
//     const removeProductActionWithProductId = removeProductFromWishlistAction.bind(null, productId);

//     if (inWishlist) {
//         return (
//             <form action={removeProductActionWithProductId}>
//                 <ButtonSubmit>
//                     <StarIcon className='h-full w-auto text-secondary' />
//                 </ButtonSubmit>
//             </form>
//         );
//     } else {
//         return (
//             <form action={addProductActionWithProductId}>
//                 <ButtonSubmit>
//                     <StarIcon className='h-full w-auto text-slate-200' />
//                 </ButtonSubmit>
//             </form>
//         );
//     }
// }

// function ButtonSubmit({ children }: PropsWithChildren) {
//     const { pending } = useFormStatus();
//     return (
//         <button
//             className={clsx(
//                 'h-9 w-9 p-1 flex items-center justify-center cursor-pointer',
//                 'transition hover:bg-[#fbfbfb]',
//                 {
//                     'cursor-default': pending
//                 }
//             )}
//             onClick={(e) => {
//                 if (pending) e.preventDefault();
//             }}
//         >
//             {pending
//                 ? <Spinner className='w-4/5 h-auto' />
//                 : <>{children}</>
//             }
//         </button>
//     );
// }