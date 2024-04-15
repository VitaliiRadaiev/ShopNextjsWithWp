import React, { JSX, ReactNode } from 'react';
import clsx from 'clsx';
import { ImageRemote } from '@/app/6_shared/ui/Images';
import Link from 'next/link';
import { shimmer } from '@/app/6_shared/utils/shimmer';
import { Stars } from '@/app/6_shared/ui/Stars';
import { formatCurrencyString } from '@/app/6_shared/utils/formatCurrencyString';
import { ProductCardFromRestType, ProductCardType, StockStatusVariantsRestType } from '@/app/6_shared/types/types';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { XCircleIcon } from '@heroicons/react/24/solid';

interface ProductCardProps {
    product: ProductCardFromRestType;
    addToCartSlot: ReactNode;
    // addToWishListSlot: ReactNode;
}

export function ProductCardRest({ product, addToCartSlot }: ProductCardProps): JSX.Element {
    return (
        <div
            className={clsx(
                "flex flex-col h-full relative"
            )}
        >
            <div className="absolute top-0 left-0 w-full z-6 flex items-start justify-between p-1 md:p-2">
                <div className='flex flex-col gap-1'>
                    <Label productTags={product.tags} />
                </div>
                <div>
                   
                </div>
            </div>

            <Link
                href={`/product/${product.slug}`}
                className="h-[140px] md:h-[200px] p-3 md:p-5 flex items-center justify-center"
            >
                <ImageRemote
                    src={product.images[0]?.src}
                    className='w-auto h-auto max-w-full max-h-full'
                />
            </Link>
            <div className="px-4 pb-4 md:px-5 md:pb-5 flex flex-col text-center shrink grow">
                <div className='flex justify-center'>
                    <Stars clickable={false} startValue={+product.average_rating} />
                </div>
                <Link
                    href={`/product/${product.slug}`}
                    className={clsx(
                        'transition-colors text-secondary hover:text-secondary-light',
                        'font-semibold text-[14px] md:text-[20px] mt-2'
                    )}
                >
                    {product.name}
                </Link>
                <div className="mt-auto pt-2 md:pt-3 text-[12px] md:text-[14px]">
                    <Status status={product.stock_status} />
                </div>
                <div className="text-[20px] md:text-[24px] md:mt-3">
                    {!!product.sale_price.length
                        ? <>
                            <div className="text-[0.6em] text-primary-light line-through">{formatCurrencyString(product.regular_price)}</div>
                            <div className=" font-bold">{formatCurrencyString(product.sale_price)}</div>
                        </>
                        : <div className=" font-bold">{formatCurrencyString(product.regular_price)}</div>
                    }
                </div>
                <div className="mt-3">{addToCartSlot}</div>
            </div>
        </div>
    );
}


interface LabelProps {
    productTags: ProductCardFromRestType['tags'];
}


export function Label({ productTags }: LabelProps) {
    return (
        <>
            {productTags.map(productTag => {

                return (
                    <div key={productTag.id}
                        className={clsx(
                            'py-[2px] px-1 rounded-[2px] uppercase text-[8px] md:text-[11px] leading-none self-start text-white bg-primary',
                            {
                                '!bg-info': productTag.slug === 'novelty',
                                '!bg-secondary': productTag.slug === 'promotion',
                                '!bg-primary': productTag.slug === 'best-seller',
                                '!bg-third': productTag.slug === 'recommended',
                            }
                        )}
                    >
                        {productTag.name}
                    </div>
                );
            })}
        </>
    );
}

interface StatusProps {
    status: StockStatusVariantsRestType;
}

export function Status({ status }: StatusProps) {

    const value = status === 'instock'
        ? <>
            <CheckCircleIcon className='text-[#6a9a4d] h-[1.4em] w-auto absolute top-1/2 left-0 translate-x-[calc(-100%-6px)] -translate-y-1/2' />
            <span className='border-b border-[currentColor] border-dashed'>
                В наличии
            </span>
        </>
        : <>
            <XCircleIcon className='text-[#ff0000] h-[1.4em] w-auto absolute top-1/2 left-0 translate-x-[calc(-100%-6px)] -translate-y-1/2' />
            <span className='border-b border-[currentColor] border-dashed'>
                Не в наличии
            </span>
        </>

    return (
        <div className='status text-primary-light flex justify-center'>
            <div className='flex items-center justify-center gap-1 relative self-center'>
                {value}
            </div>
        </div>
    );
}