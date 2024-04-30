"use client";

import React, { JSX, useEffect, useState } from 'react';
import clsx from 'clsx';
import { fetchWithSessionToken } from '@/app/6_shared/api/fetchWithSessionToken';
import { OrderCard, OrderType, fetchOrders } from '@/app/5_entities/orders';
import { LoadingDots } from '@/app/6_shared/ui/LoadingDots/LoadingDots';


export function Orders(): JSX.Element {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [isPending, setIsPending] = useState(false);

    const getOrders = async () => {
        setIsPending(true);
        const orders = await fetchWithSessionToken((token) => fetchOrders(token));
        setOrders(orders)
        setIsPending(false);
    }

    useEffect(() => {
        getOrders();
    }, []);

    if (isPending) {
        return (
            <div className="flex justify-center text-[22px] py-10">
                <LoadingDots />
            </div>
        );
    }

    if(!orders.length) {
        return (
            <div>
                Список пуст
            </div>
        );
    }

    return (
        <ul className=''>
            {orders.map(order => {
                return (
                    <li key={order.databaseId} className='[&:not(:first-child)]:mt-4'>
                        <OrderCard order={order} />
                    </li>
                );
            })}
        </ul>
    );
}