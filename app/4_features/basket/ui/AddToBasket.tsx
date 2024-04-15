"use client";

import React, { JSX, useContext } from 'react';
import clsx from 'clsx';

import { SubmitButton } from '@/app/6_shared/ui/Buttons/SubmitButton';
import { addProductToBasketAction } from '../lib/actions';
import { StockStatusVariantsType } from '@/app/6_shared/types/types';
import { fetchWithSessionToken } from '@/app/6_shared/api/fetchWithSessionToken';
import { BasketContext } from '@/app/5_entities/basket';

interface AddToBasketProps {
    productId: number;
    stockStatus: StockStatusVariantsType;
}

export function AddToBasket({ productId, stockStatus }: AddToBasketProps): JSX.Element {
    const { state: basketState, setState: setBasketState } = useContext(BasketContext);

    const inBasket = basketState.cart 
        ? basketState.cart.contents.nodes.find(item => item.product.node.databaseId === productId)
        : false;
    const inStock = stockStatus === 'IN_STOCK';

    return (
        <form action={async () => {
            const cart = await fetchWithSessionToken((token) => addProductToBasketAction(token, productId));

            setBasketState(prev => ({
                ...prev,
                cart
            }));
        }}>
            <SubmitButton
                className={clsx({
                    'pointer-events-none opacity-70': !inStock || inBasket
                })}
            >
                {inBasket
                    ? 'В корзине'
                    : 'Заказать'
                }
                
            </SubmitButton>
        </form>
    );
}