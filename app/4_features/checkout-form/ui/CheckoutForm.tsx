"use client";

import React, { JSX, createContext, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Input } from '@/app/6_shared/ui/FormFields/Input';
import { InputMask } from '@/app/6_shared/ui/FormFields/InputMask';
import { H3, H4 } from '@/app/6_shared/ui/Titles';
import { SubmitButton } from '@/app/6_shared/ui/Buttons/SubmitButton';
import { Radio } from '@/app/6_shared/ui/FormFields/Radio';
import { CollapseBox } from '@/app/6_shared/ui/CollapseBox';
import { z } from 'zod';
import { createOrderAction } from '../lib/actions';
import { ChooseSettlement } from './ChooseSettlement';
import { ChooseWarehouse } from './ChooseWarehouse';
import { ChooseSettlementStreet } from './ChooseSettlementStreet';
import { UserType } from '@/app/5_entities/users';
import { BasketContext } from '@/app/5_entities/basket';
import { usePathname, useRouter } from 'next/navigation';
import { ButtonLink } from '@/app/6_shared/ui/Buttons/ButtonLink';
import { SpriteElements } from './SpriteElements';
import { PaymentIntentResult, Stripe, StripeElements, StripeError } from '@stripe/stripe-js';
import { StripeContext } from '../lib/SpriteContext';
import { fetchWithSessionToken } from '@/app/6_shared/api/fetchWithSessionToken';



type InitialState = {
    errors: {
        firstName?: string[];
        lastName?: string[];
        phone?: string[];
        email?: string[];
        settlement?: string[];
        warehouse?: string[];
        settlementStreet?: string[]
        building?: string[]
    }
}

const RegisterFormSchema = z.object({
    firstName: z.coerce.string().min(2, {
        message: 'Имя должно быть не меньше 2 символов'
    }),
    lastName: z.coerce.string().min(2, {
        message: 'Фамилия должна быть не меньше 2 символов'
    }),
    phone: z.coerce.string().min(14, {
        message: 'Номер слишком короткий'
    }),
    email: z.coerce.string({
        required_error: 'Введите ваш E-Mail'
    }).email('Неверный E-Mail'),
    settlement: z.coerce.string().min(4, {
        message: 'Проверьте название населенного пункта, оно слишком короткое.'
    }),
    warehouse: z.string({
        invalid_type_error: 'Выберете отделение Новой Почты'
    }).optional(),
    settlementStreet: z.string({
        invalid_type_error: 'Укажите адрес доставки'
    }).optional(),
    building: z.string({
        invalid_type_error: 'Укажите номер дома'
    }).optional()
});

interface CheckoutFormProps {
    me?: UserType;
}

export function CheckoutForm({ me }: CheckoutFormProps) {
    const { state, setState: setBasketState } = useContext(BasketContext);
    const basket = state.cart;
    const [formState, setFormState] = useState<InitialState>({ errors: {} });
    const [settlement, setSettlement] = useState<string | null>(null);
    const [radiosCheckedState, setRadiosCheckedState] = useState({
        pickup: false,
        courier: false
    });
    const router = useRouter();
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [showPaymentElement, setShowPaymentElement] = useState(false);
    const [isPaymentElementWasShow, setIsPaymentElementWasShow] = useState(false);
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const [elements, setElements] = useState<StripeElements | null>(null);
    const [message, setMessage] = useState<null | string>(null);


    if (!basket) return null;

    const submitHandler = async (formData: FormData) => {
        const rawFormData = Object.fromEntries(formData.entries());

        let validateData: Record<string, any> = {
            firstName: rawFormData.firstName,
            lastName: rawFormData.lastName,
            phone: rawFormData.phone.toString().replace(/[\s|_]/ig, ""),
            email: rawFormData.email,
            settlement: rawFormData.settlement,
        }

        if (rawFormData.delivery === 'delivery-pickup') {
            validateData = {
                ...validateData,
                warehouse: String(rawFormData.warehouse).trim().length ? rawFormData.warehouse : null
            }
        } else {
            validateData = {
                ...validateData,
                settlementStreet: String(rawFormData.settlementStreet).trim().length ? rawFormData.settlementStreet : null,
                building: String(rawFormData.building).trim().length ? rawFormData.building : null
            }
        }

        const validatedFields = RegisterFormSchema.safeParse(validateData);

        if (!validatedFields.success) {
            setFormState({
                errors: validatedFields.error.flatten().fieldErrors
            })
            return;
        }

        const res = await fetchWithSessionToken((token) => createOrderAction(token, {
            address: `
                <p>${validatedFields.data.settlement}</p>
                ${validatedFields.data.warehouse ? `<p>${validatedFields.data.warehouse}</p>` : ''}
                ${validatedFields.data.settlementStreet
                    ? `<p>
                    ${validatedFields.data.settlementStreet
                    + " " + validatedFields.data.building
                    + " " + rawFormData.apartment
                    }
                    </p>`
                    : ''
                }
            `,
            paymentMethod: showPaymentElement ? 'cheque' : 'cod',
            firstName: validatedFields.data.firstName,
            lastName: validatedFields.data.lastName,
            email: validatedFields.data.email,
            phone: validatedFields.data.phone,
        }))

        if (res.result !== 'success') {
            setErrorSubmit(true);
            return;
        }

        if (showPaymentElement && stripe && elements) {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: window.location.origin + "/orderConfirmation",
                },
                
                //redirect: 'if_required'
            });
            console.log('confirmPayment', error);
            
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(String(error.message));
            } else {
                setMessage("An unexpected error occurred.");
            }

            return;
        }

        if (res.result === 'success') {
            setBasketState({});
            router.replace('/orderConfirmation');
        } 

        window.scrollTo({ top: 0, behavior: "smooth" });
    }


    if (errorSubmit) {
        return (
            <>
                <H3>Что-то пошло нетак, попробуйте позже ещё раз.</H3>

                <div className='mt-4'>
                    <ButtonLink href='/categories' onClick={() => setTimeout(() => { setErrorSubmit(false) }, 2000)}>Вернуться к покупкам</ButtonLink>
                </div>
            </>
        )
    }

    return (
        <StripeContext.Provider value={{
            stripe,
            setStripe,
            elements,
            setElements,
            message,
            setMessage
        }}>
            <form action={submitHandler} className="flex flex-col gap-8">
                <div className="flex flex-col gap-5">
                    <label className='block'>
                        <span className='block text-dark leading-normal -tracking-wide mb-1'>
                            Имя
                            <span className='text-rose-500'>*</span>
                        </span>
                        <Input
                            type='text'
                            className={clsx(
                                '',
                                {
                                    'border-rose-500': formState.errors?.firstName
                                }
                            )}
                            name='firstName'
                            required
                            defaultValue={me?.firstName || ''}
                        />
                        {formState.errors?.firstName && <div className='text-rose-500 text-[12px]'>{...formState.errors?.firstName}</div>}
                    </label>
                    <label className='block'>
                        <span className='block text-dark leading-normal -tracking-wide mb-1'>
                            Фамилия
                            <span className='text-rose-500'>*</span>
                        </span>
                        <Input
                            type='text'
                            className={clsx(
                                '',
                                {
                                    'border-rose-500': formState.errors?.lastName
                                }
                            )}
                            name='lastName'
                            required
                            defaultValue={me?.lastName || ''}
                        />
                        {formState.errors?.lastName && <div className='text-rose-500 text-[12px]'>{...formState.errors?.lastName}</div>}
                    </label>
                    <label className='block'>
                        <span className='block text-dark leading-normal -tracking-wide mb-1'>
                            Телефон
                            <span className='text-rose-500'>*</span>
                        </span>
                        <InputMask
                            mask="380(99) 999 99 99"
                            type='text'
                            className={clsx(
                                '',
                                {
                                    'border-rose-500': formState.errors?.phone
                                }
                            )}
                            name='phone'
                            required
                            defaultValue={me?.phone || ''}
                        />
                        {formState.errors?.phone && <div className='text-rose-500 text-[12px]'>{...formState.errors?.phone}</div>}
                    </label>
                    <label className='block'>
                        <span className='block text-dark leading-normal -tracking-wide mb-1'>
                            E-mail
                            <span className='text-rose-500'>*</span>
                        </span>
                        <Input
                            type='email'
                            className={clsx(
                                {
                                    'border-rose-500': formState.errors?.email
                                }
                            )}
                            name='email'
                            required
                            defaultValue={me?.email || ''}
                        />
                        {formState.errors?.email && <div className='text-rose-500 text-[12px]'>{...formState.errors?.email}</div>}
                    </label>
                </div>
                <div>
                    <H4>
                        Доставка Новой Почты
                    </H4>
                    <div className="flex flex-col gap-5 mt-4">
                        <ChooseSettlement error={formState.errors?.settlement} setSettlement={setSettlement} />
                        <div className={clsx(
                            "border border-slate-300 rounded p-3",
                            {
                                "border-slate-600": radiosCheckedState.pickup,
                                "opacity-50 pointer-events-none": !settlement
                            }
                        )}>
                            <Radio
                                name='delivery'
                                onChange={(e) => setRadiosCheckedState({ courier: false, pickup: e.target.checked })}
                                checked={radiosCheckedState.pickup}
                                value='delivery-pickup'
                                required
                            >
                                Самовывоз из Новой Почты
                            </Radio>
                            <CollapseBox className="mt-3" isCollapsed={radiosCheckedState.pickup}>
                                <ChooseWarehouse error={formState.errors?.warehouse} settlementRef={settlement as string} />
                            </CollapseBox>
                        </div>
                        <div className={clsx(
                            "border border-slate-300 rounded p-3",
                            {
                                "border-slate-600": radiosCheckedState.courier,
                                "opacity-50 pointer-events-none": !settlement
                            }
                        )}>
                            <Radio
                                name='delivery'
                                onChange={(e) => setRadiosCheckedState({ pickup: false, courier: e.target.checked })}
                                checked={radiosCheckedState.courier}
                                value='delivery-courier'
                                required
                            >
                                Курьер Новой Почты
                            </Radio>
                            <CollapseBox className="mt-3" isCollapsed={radiosCheckedState.courier}>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className='col-span-2'>
                                        <ChooseSettlementStreet error={formState.errors?.settlementStreet} settlementRef={settlement as string} />
                                    </div>
                                    <div className='col-span-1'>
                                        <label className='block'>
                                            <span className='block text-dark leading-normal -tracking-wide mb-1'>
                                                Дом
                                                <span className='text-rose-500'>*</span>
                                            </span>
                                            <Input
                                                type='text'
                                                placeholder=''
                                                name='building'
                                                className={clsx(
                                                    {
                                                        'border-rose-500': formState.errors?.building
                                                    }
                                                )}
                                            />
                                        </label>
                                        {formState.errors?.building && <div className='text-rose-500 text-[12px]'>{...formState.errors?.building}</div>}
                                    </div>
                                    <div className='col-span-1'>
                                        <label className='block'>
                                            <span className='block text-dark leading-normal -tracking-wide mb-1'>
                                                Квартира
                                            </span>
                                            <Input
                                                type='text'
                                                placeholder=''
                                                name='apartment'
                                            />
                                        </label>
                                    </div>
                                </div>
                            </CollapseBox>
                        </div>
                    </div>
                </div>
                <div>
                    <H4>
                        Способ оплаты
                    </H4>
                    <div className="flex flex-col gap-5 mt-4">
                        <Radio
                            name='paymentMethod'
                            value='cod'
                            required
                            defaultChecked
                            onChange={() => setShowPaymentElement(false)}
                        >
                            Оплата при получении товара
                        </Radio>
                        <div>
                            <Radio
                                name='paymentMethod'
                                value='stripe'
                                required
                                onChange={() => {
                                    setIsPaymentElementWasShow(true);
                                    setShowPaymentElement(true);
                                }}
                            >
                                Оплатить сейчас
                            </Radio>
                            <CollapseBox className='mt-3' isCollapsed={showPaymentElement}>
                                <SpriteElements isFirstShow={isPaymentElementWasShow} />
                            </CollapseBox>
                        </div>
                    </div>
                </div>
                <SubmitButton className='h-16 !text-[20px] text-center w-full'>
                    Оформить Заказ
                </SubmitButton>
            </form>
        </StripeContext.Provider>
    );
}