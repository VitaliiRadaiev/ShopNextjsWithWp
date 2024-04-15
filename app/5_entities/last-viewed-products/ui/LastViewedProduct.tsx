// import clsx from 'clsx';
// import { ProductType } from '../../products';
// import Link from 'next/link';
// import { ImageRemote } from '@/app/6_shared/ui/Images';
// import { getRemoteImage } from '@/app/6_shared/utils/getRemoteImage';
// import { addCurrencySymbol } from '@/app/6_shared/utils/addCurrencySymbol';

// interface LastViewedProductProps {
//     product: ProductType;
// }

// export function LastViewedProduct({ product }: LastViewedProductProps) {
//     return (
//         <Link
//             href={'/product/' + product.id}
//             className={clsx(
//                 'flex gap-3 bg-white py-3 px-2 border border-slate-300 lg:px-3 lg:py-4',
//                 'transition-shadow hover:shadow-[0px_0px_10px_rgba(0,0,0,0.25)]'
//             )}
//         >
//             <div className='flex items-center justify-center h-[110px] w-16 shrink-0 grow-0'>
//                 <ImageRemote
//                     src={getRemoteImage(product.images)}
//                     className='w-auto h-auto max-w-full max-h-full'
//                 />
//             </div>
//             <div className='flex flex-col gap-3'>
//                 <div className='text-[12px] lg:text-[14px]'>{product.title}</div>
//                 <div className='mt-auto text-[#5e616b] text-[14px] lg:text-[19px] font-bold'>{addCurrencySymbol(product.price, { space: true })}</div>
//             </div>
//         </Link>
//     );
// }