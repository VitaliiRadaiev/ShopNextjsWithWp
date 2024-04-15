"use client";

import React, { CSSProperties, JSX, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductSingleType } from '../lib/types';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';
import { ImageRemote } from '@/app/6_shared/ui/Images';
import { Label } from './Label';

interface GalleryProps {
    product: ProductSingleType;
    //toggleWishlistSlot: ReactNode;
}

export function Gallery({ product }: GalleryProps): JSX.Element {
    const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);

    const styles = {
        '--swiper-pagination-bullet-width': '12px',
        '--swiper-pagination-bullet-height': '12px',
        '--swiper-theme-color': '#0E3C67'

    } as CSSProperties;

    return (
        <div className='relative'>
            <div className="absolute top-0 left-0 w-full z-6 flex items-start justify-between p-1 md:p-2">
                <div className='flex flex-col gap-1'>
                    <Label productTags={product.productTags.nodes}/>
                </div>
                <div>
                   
                </div>
            </div>

            <Swiper
                style={styles}
                spaceBetween={10}
                pagination={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className={clsx(
                    '[&_.swiper-pagination]:static [&_.swiper-pagination]:mt-6 lg:[&_.swiper-pagination]:hidden'
                )}
            >
                {!!product.galleryImages.nodes.length
                    ? product.galleryImages.nodes.map(img =>
                        <SwiperSlide
                            key={img.sourceUrl}
                            className='!h-[282px] !flex items-center justify-center p-4 lg:!h-[400px]'
                        >
                            <ImageRemote
                                src={img.sourceUrl}
                                className='w-auto h-auto max-w-full max-h-full'
                            />
                        </SwiperSlide>)

                    : <SwiperSlide
                        className='!h-[282px] !flex items-center justify-center p-4 lg:!h-[400px]'
                    >
                        <ImageRemote
                            src={null}
                            className='w-auto h-auto max-w-full max-h-full'
                        />
                    </SwiperSlide>
                }
            </Swiper>
            <div className='hidden lg:block w-[335px] pr-[40px] pl-[40px] relative mx-auto'>
                <Swiper
                    onSwiper={(swiper) => setThumbsSwiper(swiper)}
                    spaceBetween={15}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }}
                    modules={[FreeMode, Navigation, Thumbs,]}
                    className="!mx-[-1px] !px-[1px]"
                >
                    {product.galleryImages.nodes.map(img =>
                        <SwiperSlide
                            key={img.sourceUrl}
                            className={clsx(
                                '!h-[52px] !flex items-center justify-center border border-transparent transition',
                                'hover:border-slate-300 [&.swiper-slide-thumb-active]:border-secondary'
                            )}
                        >
                            <ImageRemote
                                className='w-auto h-auto max-w-full max-h-full'
                                src={img.sourceUrl}
                                width={52}
                                height={52}
                            />
                        </SwiperSlide>
                    )}
                </Swiper>
                <div className="swiper-button-next !size-[40px] after:!text-[14px] after:font-bold !text-third !right-0 hover:bg-slate-100 transition"></div>
                <div className='swiper-button-prev !size-[40px] after:!text-[14px] after:font-bold !text-third !left-0 hover:bg-slate-100 transition'></div>
            </div>
        </div>
    );
}