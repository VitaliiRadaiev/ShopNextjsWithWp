'use client';

import { RemoveFromBasket } from '@/app/4_features/basket';
import { CheckoutForm } from '@/app/4_features/checkout-form';
import { BasketContext, BasketProductCardMini } from '@/app/5_entities/basket';
import { ButtonLink } from '@/app/6_shared/ui/Buttons/ButtonLink';
import { formatCurrencyString } from '@/app/6_shared/utils/formatCurrencyString';
import clsx from 'clsx';
import { useContext } from 'react';

export function Checkout() {
    const { state } = useContext(BasketContext);
    const basket = state.cart;
    const me = undefined;

    if (!basket || !basket.contents.itemCount) {
        return (
            <section>
                <div className="container">
                    <div
                        className={clsx(
                            "mt-6 text-[20px]"
                        )}
                    >
                        Корзина пустая.
                    </div>
                    <div className='mt-4'>
                        <ButtonLink href='/categories'>Вернуться к покупкам</ButtonLink>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="container">
                <div className="flex flex-col gap-5 lg:gap-8 md:flex-row-reverse mt-4">
                    <div className="md:shrink-0 md:grow-0 md:basis-[300px] lg:basis-[400px] relative">
                        <div className='sticky top-[150px]'>
                            <div className="bg-slate-100 rounded p-4">
                                <ul className='flex flex-col gap-2'>
                                    {basket.contents.nodes.map(orderItem => {
                                        return (
                                            <li className='p-2 bg-slate-50 rounded' key={orderItem.key}>
                                                <BasketProductCardMini
                                                    orderItem={orderItem}
                                                    removeFromBasketSlot={<RemoveFromBasket cartItemKey={orderItem.key} />}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                                <hr className='mt-4'/>
                                <div className='mt-4 flex items-center justify-between gap-4'>
                                    <span className='text-primary-light text-[16px]'>Стоимость доставки</span>
                                    <span className='font-bold text-[#5e616b] text-end'>По тарифам перевозчика</span>
                                </div>
                                <hr className='mt-4'/>
                                <div className='mt-4 flex items-center justify-between flex-wrap gap-4'>
                                    <span className='text-primary-light text-[22px]'>Итого:</span>
                                    <span className='text-[38px] leading-none font-bold text-[#5e616b]'>{formatCurrencyString(basket.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:shrink md:grow'>
                        <CheckoutForm me={me}/>
                    </div>
                </div>
            </div>
        </section>
    );
}