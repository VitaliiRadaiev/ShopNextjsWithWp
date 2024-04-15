'use client';

import React, { useCallback } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { ImageRemote } from '@/app/6_shared/ui/Images';
import { useQueryAction } from '@/app/6_shared/hooks/hooks';
import { LoadingDots } from '@/app/6_shared/ui/LoadingDots/LoadingDots';
import { searchProducts } from '@/app/5_entities/products';
import { formatCurrencyString } from '@/app/6_shared/utils/formatCurrencyString';


export function ListSearchSuggestions({ searchQuery }: { searchQuery: string }) {
    const callback = useCallback(() => searchProducts(searchQuery), [searchQuery]);
    const { data: products, isLoading, error } = useQueryAction(callback);

    return (
        <div
            className={clsx(
                "absolute l-0 w-full transition-opacity top-[calc(100%+0.5rem)]",
                { "opacity-0 pointer-events-none": false }
            )}
        >
            {!!searchQuery.trim().length &&
                <div className='bg-white flex flex-col gap-1 p-1'>
                    {isLoading &&
                        <div className='text-[12px] text-white flex items-center justify-center absolute inset-0 z-10 bg-slate-900/40'>
                            <LoadingDots />
                        </div>
                    }
                    {products && !!products.length
                        ? products.map(product =>
                            <Link key={product.node.id} href={`/product/${product.node.slug}`} className="flex gap-3 p-1 transition hover:bg-slate-100">
                                <div className='h-[80px] w-[80px] grow-0 shrink-0 flex items-center justify-center border bg-white border-slate-200 p-1'>
                                    <ImageRemote
                                        src={product.node.featuredImage?.node.sourceUrl}
                                        className='w-auto h-auto max-h-full max-w-full'
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <div>
                                    <div className=' font-bold text-md'>
                                        {product.node.title}
                                    </div>

                                    <div className='text-sm'>
                                        <strong className='me-1'>Цена:</strong>
                                        {product.node.salePrice
                                            ? <>
                                                <span className='me-1'>
                                                    {formatCurrencyString(product.node.regularPrice)}
                                                </span>
                                                <del className='text-primary-light'>
                                                    {formatCurrencyString(product.node.salePrice)}
                                                </del>
                                            </>
                                            : <span className='me-1'>
                                                {formatCurrencyString(product.node.regularPrice)}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </Link>
                        )
                        : <div>Ничего не найдено</div>
                    }
                </div>
            }

        </div>

    );
}