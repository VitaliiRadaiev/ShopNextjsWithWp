import clsx from 'clsx';
import { ReactNode } from 'react';
import { OrderItemType, OrderedProductType } from '../lib/types';
import { ImageRemote } from '@/app/6_shared/ui/Images';
import { getRemoteImage } from '@/app/6_shared/utils/getRemoteImage';
import Link from 'next/link';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { truncateText } from '@/app/6_shared/utils/trancateText';
import { addCurrencySymbol } from '@/app/6_shared/utils/addCurrencySymbol';
import { Label } from '@/app/5_entities/products/ui/Label';
import { Status } from '@/app/5_entities/products';
import { formatCurrencyString } from '@/app/6_shared/utils/formatCurrencyString';

interface BasketProductCardProps {
    orderItem: OrderItemType;
    removeFromBasketSlot: ReactNode;
    quantitySlot: ReactNode;
}

export function BasketProductCard({ orderItem, removeFromBasketSlot, quantitySlot }: BasketProductCardProps) {
    return (
        <div
            className={clsx(
                'grid grid-cols-[60px_1fr] gap-3 py-4 px-2 relative',
                'md:grid-cols-[200px_1fr_auto_minmax(160px,_auto)] md:py-8 md:ps-5 md:pr-10 md:gap-5'
            )}
        >
            <div className="absolute z-5 top-3 right-1">
                {removeFromBasketSlot}
            </div>
            <div className="absolute top-0 left-0 z-6 flex items-start justify-between p-1 md:p-2">
                <div className='flex flex-col gap-1'>
                    <Label productTags={orderItem.product.node.productTags.nodes} />
                </div>
            </div>
            <div className="row-span-3 md:row-auto" >
                <Link
                    href={'/product/' + orderItem.product.node.slug}
                    className={clsx(
                        'flex items-center justify-center h-28 md:h-[200px]',
                        'transition-opacity hover:opacity-70'
                    )}
                >
                    <ImageRemote
                        src={orderItem.product.node.featuredImage?.node.sourceUrl}
                        className='w-auto h-auto max-w-full max-h-full'
                    />
                </Link>
            </div>
            <div className="">
                <Link
                    href={'/product/' + orderItem.product.node.slug}
                    className={clsx(
                        'text-secondary text-[16px] md:text-[20px] leading-snug -tracking-wide ',
                        'uppercase font-semibold pr-8 block md:pr-0',
                        'transition-colors hover:text-secondary-light'
                    )}
                >
                    {orderItem.product.node.title}
                </Link>
                <div className="mt-auto pt-2 md:pt-3 [&_.status]:justify-start [&_.status]:ps-[1.6em]">
                    <Status status={orderItem.product.node.stockStatus} />
                </div>
            </div>
            <div className="">
                {quantitySlot}
            </div>
            <div className="md:text-right">
                <div className="text-[24px] md:text-[28px] text-[#5e616b]">
                    {orderItem.product.node.salePrice
                        ? <>
                            <div className="text-[0.6em] text-primary-light line-through">{formatCurrencyString(orderItem.product.node.regularPrice)}</div>
                            <div className=" font-bold">{formatCurrencyString(orderItem.product.node.salePrice)}</div>
                        </>
                        : <div className=" font-bold">{formatCurrencyString(orderItem.product.node.regularPrice)}</div>
                    }
                </div>
            </div>
        </div>
    );
}

