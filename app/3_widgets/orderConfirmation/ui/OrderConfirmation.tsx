"use client";

import React, { JSX, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { H2 } from '@/app/6_shared/ui/Titles';
import { OrderCard, OrderType, fetchLastOrder } from '@/app/5_entities/orders';
import { fetchWithSessionToken } from '@/app/6_shared/api/fetchWithSessionToken';
import { LoadingDots } from '@/app/6_shared/ui/LoadingDots/LoadingDots';
import { ButtonLink } from '@/app/6_shared/ui/Buttons/ButtonLink';
import { CustomerContext, fetchMe } from '@/app/5_entities/users';
import { getAuthToken } from '@/app/6_shared/api/getAuthToken';
import { getSessionToken } from '@/app/6_shared/api/getSessionToken';

interface OrderConfirmationProps {

}

export function OrderConfirmation({ }: OrderConfirmationProps): JSX.Element {
    const [order, setOrder] = useState<OrderType | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);
    const { setState: setCustomerState } = useContext(CustomerContext);

    const getLastOrder = async () => {
        setIsFetching(true);
        const data = await fetchWithSessionToken((token) => fetchLastOrder(token));
        setOrder(data);
        setIsFetching(false);
        setIsFetchCompleted(true);
    }

    const updateCustomerState = async () => {
        const authToken = await getAuthToken();
        const sessionToken = await getSessionToken();

        if(authToken && sessionToken) {

            const data = await fetchMe(sessionToken, authToken);

            if(data.data) {
                setCustomerState({ customer: data.data });
            }
        }
    }

    useEffect(() => {
        getLastOrder();
        updateCustomerState();
    }, []);

    if (isFetchCompleted && !order) {
        return (
            <div className="py-9 lg:py-20">
                <div className="container">
                    <H2>У вас пока нет заказов.</H2>
                    <div className='mt-4 flex flex-wrap gap-4'>
                        <ButtonLink href='/categories'>Перейти к покупкам</ButtonLink>
                    </div>
                </div>
            </div>
        );
    }

    if (isFetching || !order) {
        return (
            <div className="flex justify-center text-[22px] py-10">
                <LoadingDots />
            </div>
        );
    }

    return (
        <div className="py-9 lg:py-20">
            <div className="container">
                <H2>заказ принят, спасибо!</H2>

                <div className="mt-4">
                    <OrderCard order={order} isFullContentShow={true} />
                </div>
                <div className='mt-4 flex flex-wrap gap-4'>
                    <ButtonLink href='/categories'>Вернуться к покупкам</ButtonLink>
                </div>
            </div>
        </div>
    );
}