'use client';

import { ChangeQuantity, RemoveFromBasket } from '@/app/4_features/basket';
import { BasketContext, BasketProductCard } from '@/app/5_entities/basket';
import { Button } from '@/app/6_shared/ui/Buttons/Button';
import { ButtonLink } from '@/app/6_shared/ui/Buttons/ButtonLink';
import { H2 } from '@/app/6_shared/ui/Titles';
import { formatCurrencyString } from '@/app/6_shared/utils/formatCurrencyString';
import clsx from 'clsx';
import { useContext } from 'react';

export function Basket() {
    const { state: basketState, setState: setBasketState } = useContext(BasketContext);
    const basket = basketState.cart;

    if (!basket || !basket.contents.itemCount) {
        return (
            <section
                className={clsx(
                    ""
                )}
            >
                <div className="container">
                    <H2>
                        Корзина
                    </H2>
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
        <section
            className={clsx(
                ""
            )}
        >
            <div className="container">
                <H2>
                    Корзина
                </H2>
                <div
                    className={clsx(
                        "mt-6 flex flex-col gap-4 md:flex-row md:justify-between pb-4 border-b border-primary"
                    )}
                >
                    <div
                        className={clsx(
                            "flex items-center gap-4 text-[38px] leading-none font-bold text-[#5e616b]"
                        )}
                    >
                        <span className='text-primary-light text-[22px]  font-normal' >
                            Итого:
                        </span>
                        {formatCurrencyString(basket.total)}
                    </div>

                    <ButtonLink
                        href='/checkout'
                        className={clsx(
                            "h-12 w-full px-8 text-[20px] justify-center md:w-auto"
                        )}
                    >
                        Оформить заказ
                    </ButtonLink>
                </div>
                <ul
                    className={clsx(
                        "mt-4",
                    )}
                >
                    {basket.contents.nodes.map(orderItem =>
                        <li
                            key={orderItem.product.node.id}
                            className={clsx(
                                'outline-1 outline-dashed outline-slate-300 bg-white',
                            )}
                        >
                            <BasketProductCard
                                orderItem={orderItem}
                                removeFromBasketSlot={<RemoveFromBasket cartItemKey={orderItem.key} />}
                                quantitySlot={<ChangeQuantity cartItemKey={orderItem.key} value={orderItem.quantity} />}
                            />
                        </li>
                    )}
                </ul>
            </div>

        </section>
    );
}