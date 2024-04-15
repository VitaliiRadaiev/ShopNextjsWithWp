'use client';

import clsx from 'clsx';
import { OrderType } from '../lib/types';
import { H4 } from '@/app/6_shared/ui/Titles';
import Link from 'next/link';
import { ImageRemote } from '@/app/6_shared/ui/Images';
import { getRemoteImage } from '@/app/6_shared/utils/getRemoteImage';
import { addCurrencySymbol } from '@/app/6_shared/utils/addCurrencySymbol';
import { OrderStatus } from './OrderStatus';
import { CollapseBox } from '@/app/6_shared/ui/CollapseBox';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { formatCurrencyString } from '@/app/6_shared/utils/formatCurrencyString';

interface OrderCardProps {
    order: OrderType;
    isFullContentShow?: boolean;
}

export function OrderCard({ order, isFullContentShow }: OrderCardProps) {
    const [collapsed, setCollapsed] = useState(!!isFullContentShow || false);
    return (
        <div className='border border-slate-400 p-3'>
            <div className='flex gap-4 flex-wrap justify-between bg-slate-200 rounded p-4'>
                <div>
                    <div className='flex gap-2 items-end'>
                        <H4 className=' !leading-none'>Номер заказа: </H4>
                        <p className='leading-none'>
                            {order.orderNumber}
                        </p>
                    </div>
                    <div className='text-[14px] text-primary-light'>{new Date(order.date).toLocaleString()}</div>
                </div>
                <div>
                    <OrderStatus status={order.status} />
                </div>
                {!isFullContentShow &&
                    <div className='basis-full'>
                        <button
                            className='flex items-center gap-2 text-secondary'
                            onClick={() => setCollapsed(prev => !prev)}
                        >
                            {collapsed
                                ? <>
                                    Скрыть
                                    <ChevronUpIcon className='h-[1em] w-auto' />
                                </>
                                : <>
                                    Показать больше
                                    <ChevronDownIcon className='h-[1em] w-auto' />
                                </>
                            }
                        </button>
                    </div>
                }
            </div>
            <CollapseBox isCollapsed={collapsed} primaryStateIsOpen={isFullContentShow}>
                <hr className='mt-4' />
                <div className="mt-6">
                    <H4>Получаетль</H4>
                    <div className="mt-2">
                        <div className="bg-slate-100 rounded p-4">
                            <table className='text-left'>
                                <tbody>
                                    <tr>
                                        <th className='pr-4 py-2'>Имя</th>
                                        <td>{order.billing.firstName}</td>
                                    </tr>
                                    <tr>
                                        <th className='pr-4 py-2'>Фамилия</th>
                                        <td>{order.billing.lastName}</td>
                                    </tr>
                                    <tr>
                                        <th className='pr-4 py-2'>E-mail</th>
                                        <td>{order.billing.email}</td>
                                    </tr>
                                    <tr>
                                        <th className='pr-4 py-2'>Телефон</th>
                                        <td>{order.billing.phone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <H4>Данные заказа</H4>
                    <div className="mt-2">
                        <div className="bg-slate-100 rounded p-4">
                            <table className='text-left [&_tr]:align-top [&_tr]:pr-4 [&_tr]:py-2 [&_td]:py-2 [&_p]:mb-[0.6em] last:[&_p]:mb-0'>
                                <tbody>
                                    <tr>
                                        <th className='pr-4 py-2'>Способ доставки</th>
                                        <td>Нова Почта</td>
                                    </tr>
                                    <tr>
                                        <th className='pr-4 py-2'>Адрес доставки</th>
                                        <td dangerouslySetInnerHTML={{ __html: order.shipping.address1 }}></td>
                                    </tr>
                                    <tr>
                                        <th className='pr-4 py-2'>Метод оплаты</th>
                                        <td>{order.paymentMethodTitle}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <H4>Товары</H4>
                    <div className="mt-2">
                        <div className="bg-slate-100 rounded p-4">
                            <ul className='flex flex-col gap-2'>
                                {order.lineItems.nodes.map(orderItem => {
                                    return (
                                        <li className='p-2 bg-slate-50 rounded' key={orderItem.product.node.id}>
                                            <div className='relative flex gap-4'>
                                                <Link
                                                    href={'/product/' + orderItem.product.node.slug}
                                                    className={clsx(
                                                        'flex items-center justify-center h-14 w-14 shrink-0 grow-0',
                                                        'transition-opacity hover:opacity-70 border border-slate-300'
                                                    )}
                                                >
                                                    <ImageRemote
                                                        src={orderItem.product.node.featuredImage?.node.sourceUrl}
                                                        className='w-auto h-auto max-w-full max-h-full'
                                                    />
                                                </Link>
                                                <div className='shrink grow flex flex-col gap-2'>
                                                    <Link
                                                        href={'/product/' + orderItem.product.node.slug}
                                                        className={clsx(
                                                            'text-secondary text-[14px] md:text-[16px] leading-snug -tracking-wide ',
                                                            'uppercase font-semibold block',
                                                            'transition-colors hover:text-secondary-light'
                                                        )}
                                                    >
                                                        {orderItem.product.node.title}
                                                    </Link>
                                                    <div className="flex gap-2 flex-wrap justify-between text-[12px] md: text-[14px]">
                                                        <div>
                                                            Количество: <span className='font-bold'>{orderItem.quantity}</span> ед.
                                                        </div>
                                                        <div className='whitespace-normal'>
                                                            {orderItem.product.node.salePrice
                                                                ? <div className='flex gap-2'>
                                                                    <span className="font-bold">{formatCurrencyString(orderItem.product.node.regularPrice)}</span>
                                                                    <span className="text-primary-light line-through">{formatCurrencyString(orderItem.product.node.salePrice)}</span>
                                                                </div>
                                                                : <span className=" font-bold">{formatCurrencyString(orderItem.product.node.regularPrice)}</span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <hr className='mt-4' />
                            <div className='mt-4 flex items-center justify-between gap-4'>
                                <span className='text-primary-light text-[16px]'>Стоимость доставки</span>
                                <span className='font-bold text-[#5e616b] text-end'>По тарифам перевозчика</span>
                            </div>
                            <hr className='mt-4' />
                            <div className='mt-4 flex items-center justify-between flex-wrap gap-4'>
                                <span className='text-primary-light text-[22px]'>Итого:</span>
                                <span className='text-[38px] leading-none font-bold text-[#5e616b]'>{formatCurrencyString(order.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CollapseBox>
        </div>
    );
}