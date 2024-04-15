// "use client";

// import React, { JSX, useRef } from 'react';
// import clsx from 'clsx';
// import { H2 } from '@/app/6_shared/ui/Titles';
// import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// import { Navigation } from 'swiper/modules';

// import 'swiper/css';
// import { LastViewedProductsType } from '..';
// import { LastViewedProduct } from './LastViewedProduct';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// interface LastViewedProductsProps {
//     lastViewedProducts: LastViewedProductsType;
// }

// export function LastViewedProducts({ lastViewedProducts }: LastViewedProductsProps): JSX.Element {

//     return (
//         <div className='bg-[#f1f1f1] py-16'>
//             <div className="container">
//                 <div slot='container-start' className='flex flex-wrap items-center justify-between gap-3'>
//                     <H2>ранее вы смотрели</H2>
//                     <div className="flex">
//                         <button
//                             className={clsx(
//                                 'last-viewed-slider-btn-prev',
//                                 'flex items-center justify-center p-1 h-8 w-8 border border-slate-300 text-primary',
//                                 '[&.swiper-button-disabled]:opacity-60 [&.swiper-button-disabled]:pointer-events-none'
//                             )}
//                         >
//                             <ChevronLeftIcon className='h-full w-auto' />
//                         </button>
//                         <button
//                             className={clsx(
//                                 'last-viewed-slider-btn-next',
//                                 'flex items-center justify-center p-1 h-8 w-8 border border-slate-300 text-primary',
//                                 '[&.swiper-button-disabled]:opacity-60 [&.swiper-button-disabled]:pointer-events-none'
//                             )}
//                         >
//                             <ChevronRightIcon className='h-full w-auto' />
//                         </button>
//                     </div>
//                 </div>
//                 <div className='mt-4'>
//                     <Swiper
//                         onSwiper={(swiper) => {
//                             swiper.el.style.opacity = '1';
//                         }}
//                         spaceBetween={10}
//                         breakpoints={{
//                             0: {
//                                 slidesPerView: 2
//                             },
//                             640: {
//                                 slidesPerView: 3
//                             },
//                             1024: {
//                                 slidesPerView: 5
//                             }
//                         }}
//                         navigation={{
//                             prevEl: '.last-viewed-slider-btn-prev',
//                             nextEl: '.last-viewed-slider-btn-next'
//                         }}
//                         modules={[Navigation]}
//                         className="!p-2 !-m-2 opacity-0"
//                     >

//                         {lastViewedProducts.products.map(product => {
//                             return (
//                                 <SwiperSlide
//                                     key={product.id}
//                                     className={clsx(

//                                     )}
//                                 >
//                                     <LastViewedProduct product={product} />
//                                 </SwiperSlide>
//                             );
//                         })}
//                     </Swiper>
//                 </div>
//             </div>
//         </div>
//     );
// }