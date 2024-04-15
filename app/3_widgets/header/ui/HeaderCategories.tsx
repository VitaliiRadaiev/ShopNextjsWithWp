"use client"

import React, { JSX, useState } from 'react';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { CategoryType } from '@/app/5_entities/categories';
import Link from 'next/link';
import { Scrollbar } from 'swiper/modules';

interface HeaderCategoriesProps {
    categories: CategoryType[]
}

export function HeaderCategories({ categories }: HeaderCategoriesProps): JSX.Element {
    const [isSliderEnd, setIsSliderEnd] = useState(true);
    const [isSliderBeginning, setIsSliderBeginning] = useState(true);
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={'auto'}
            freeMode={true}
            speed={150}
            scrollbar={{
                hide: false
            }}
            modules={[Scrollbar]}
            onSwiper={(swiper) => {
                setIsSliderBeginning(swiper.isBeginning);
                setIsSliderEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
                setIsSliderBeginning(swiper.isBeginning);
                setIsSliderEnd(swiper.isEnd);
            }}
            className={clsx(
                'header-categories',
                '[&.header-categories]:mr-[-1px] [&.header-categories]:mb-[-2px] [&.header-categories]:pb-[2px]',
                '[&.header-categories_.swiper-scrollbar]:top-[calc(100%-2px)] [&.header-categories_.swiper-scrollbar]:left-0',
                '[&.header-categories_.swiper-scrollbar]:w-full [&.header-categories_.swiper-scrollbar]:h-[2px]',
                '[&.header-categories_.swiper-scrollbar-drag]:bg-slate-500 [&.header-categories_.swiper-scrollbar-drag]:rounded-none',
                {
                    'before:absolute before:top-0 before:left-0 before:z-2 before:h-[calc(100%-2px)] before:w-8 before:pointer-events-none before:bg-gradient-to-r before:from-slate-500 before:to-transparent': !isSliderBeginning,
                    'after:absolute after:top-0 after:right-0 after:z-2 after:h-[calc(100%-2px)] after:w-8 after:pointer-events-none after:bg-gradient-to-l after:from-slate-500 after:to-transparent': !isSliderEnd
                }
            )}
        >
            <SwiperSlide key={'categories'} style={{ width: 'auto' }} className='[&_a]:last:border-r'>
                <Link
                    href={'/categories'}
                    className={`
                            h-10 p-2 text-white transition
                            hover:bg-secondary-light flex 
                            items-center justify-center
                            border-l border-slate-500 text-md font-semibold
                            shrink grow min-w-56
                            `}
                >
                    Категории
                </Link>
            </SwiperSlide>
            {categories.map(category =>
                <SwiperSlide key={category.slug} style={{ width: 'auto' }} className='[&_a]:last:border-r'>
                    <Link
                        href={'/catalog/' + category.slug}
                        className={`
                            h-10 p-2 text-white transition
                            hover:bg-secondary-light flex 
                            items-center justify-center
                            border-l border-slate-500 text-md font-semibold
                            shrink grow min-w-56
                            `}
                    >
                        {category.name}
                    </Link>
                </SwiperSlide>
            )}
        </Swiper>
    );
}