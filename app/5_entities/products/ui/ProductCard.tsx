import React, { JSX, ReactNode } from 'react';
import clsx from 'clsx';
import { ImageRemote } from '@/app/6_shared/ui/Images';
import Link from 'next/link';
import { shimmer } from '@/app/6_shared/utils/shimmer';
import { Label } from './Label';
import { Status } from './Status';
import { Stars } from '@/app/6_shared/ui/Stars';
import { formatCurrencyString } from '@/app/6_shared/utils/formatCurrencyString';
import { ProductCardType } from '@/app/6_shared/types/types';

interface ProductCardProps {
    product: ProductCardType;
    addToCartSlot: ReactNode;
    // addToWishListSlot: ReactNode;
}

export function ProductCard({ product, addToCartSlot }: ProductCardProps): JSX.Element {
    return (
        <div
            className={clsx(
                "flex flex-col h-full relative"
            )}
        >
            <div className="absolute top-0 left-0 w-full z-6 flex items-start justify-between p-1 md:p-2">
                <div className='flex flex-col gap-1'>
                    <Label productTags={product.productTags.nodes} />
                </div>
                <div>
                   
                </div>
            </div>

            <Link
                href={`/product/${product.slug}`}
                className="h-[140px] md:h-[200px] p-3 md:p-5 flex items-center justify-center"
            >
                <ImageRemote
                    src={product.featuredImage?.node.sourceUrl}
                    className='w-auto h-auto max-w-full max-h-full'
                />
            </Link>
            <div className="px-4 pb-4 md:px-5 md:pb-5 flex flex-col text-center shrink grow">
                <div className='flex justify-center'>
                    <Stars clickable={false} startValue={product.averageRating} />
                </div>
                <Link
                    href={`/product/${product.slug}`}
                    className={clsx(
                        'transition-colors text-secondary hover:text-secondary-light',
                        'font-semibold text-[14px] md:text-[20px] mt-2'
                    )}
                >
                    {product.title}
                </Link>
                <div className="mt-auto pt-2 md:pt-3 text-[12px] md:text-[14px]">
                    <Status status={product.stockStatus} />
                </div>
                <div className="text-[20px] md:text-[24px] md:mt-3">
                    {product.salePrice
                        ? <>
                            <div className="text-[0.6em] text-primary-light line-through">{formatCurrencyString(product.regularPrice)}</div>
                            <div className=" font-bold">{formatCurrencyString(product.salePrice)}</div>
                        </>
                        : <div className=" font-bold">{formatCurrencyString(product.regularPrice)}</div>
                    }
                </div>
                <div className="mt-3">{addToCartSlot}</div>
            </div>
        </div>
    );
}


export function ProductCardSkeleton() {
    return (
        <div
            className={`${shimmer} relative overflow-hidden bg-white p-3: md:p-5 flex flex-col items-center pb-4`}
        >
            <div className='px-2 w-full'>
                <div className="h-[140px] md:h-[200px] bg-gray-100 w-full"></div>
            </div>
            <div className=" bg-gray-100 text-[14px] md:text-[20px] h-[1em] mt-3 w-10/12"></div>
            <div className=" bg-gray-100 text-[14px] md:text-[20px] h-[1em] mt-3 w-1/2"></div>
            <div className=" bg-gray-100 text-[14px] md:text-[20px] h-[1em] mt-3 w-9/12"></div>
            <div className=" bg-gray-100 h-8 md:h-10 mt-6 w-8/12 rounded"></div>
        </div>
    );
}