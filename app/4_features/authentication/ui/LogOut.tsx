"use client";

import React, { JSX, useContext } from 'react';
import clsx from 'clsx';
import { Button } from '@/app/6_shared/ui/Buttons/Button';
import { useRouter } from 'next/navigation';
import { CustomerContext } from '@/app/5_entities/users';
import { BasketContext } from '@/app/5_entities/basket';
import { useAppLocal } from '@/app/6_shared/hooks/useAppLocal';


export function LogOut(): JSX.Element {
    const { setState: setCustomerState } = useContext(CustomerContext);
    const { setState: setBasketState } = useContext(BasketContext);
    const router = useRouter();
    const local = useAppLocal();

    const logOut = async () => {
        localStorage.removeItem(process.env.NEXT_PUBLIC_SESSION_TOKEN_LS_KEY!);
        sessionStorage.removeItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_SS_KEY!);
        localStorage.removeItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN_LS_KEY!);
        setCustomerState({});
        setBasketState({});

        router.replace(`/${local}`)
    }

    return (
        <Button onClick={logOut}>
            Выйти
        </Button>
    );
}