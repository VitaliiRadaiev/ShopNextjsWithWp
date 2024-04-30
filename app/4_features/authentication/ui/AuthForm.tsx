"use client";

import React, { JSX, useContext, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { SubmitButton } from '@/app/6_shared/ui/Buttons/SubmitButton';
import { Input } from '@/app/6_shared/ui/FormFields/Input';
import { InputPassword } from '@/app/6_shared/ui/FormFields/InputPassword';
import { loginAction } from '../lib/actions';
import { useAppLocal } from '@/app/6_shared/hooks/useAppLocal';
import { CustomerContext } from '@/app/5_entities/users';
import { BasketContext } from '@/app/5_entities/basket';


interface AuthFormProps {

}

type InitialState = {
    errors: {
        username?: string[];
        password?: string[];
    }
}

const LoginFormSchema = z.object({
    username: z.coerce.string().min(2, {
        message: 'Пользовательское имя должно быть не меньше 2 символов'
    }),
    password: z.coerce.string().min(1, {
        message: 'Введите ваш пароль'
    })
}).required();

export function AuthForm({ }: AuthFormProps): JSX.Element {
    const [state, setState] = useState<InitialState>({ errors: {} });
    const [loginError, setLoginError] = useState(false);
    const router = useRouter();
    const local = useAppLocal();
    const { setState: setCustomer } = useContext(CustomerContext);
    const { setState: setBasketState } = useContext(BasketContext);


    const submitHandler = async (formData: FormData) => {
        const rawFormData = Object.fromEntries(formData.entries());
        const validatedFields = LoginFormSchema.safeParse({
            username: rawFormData.username,
            password: rawFormData.password
        });

        if (!validatedFields.success) {
            setState({
                errors: validatedFields.error.flatten().fieldErrors
            })
            return;
        }
        const result = await loginAction(validatedFields.data);
 
        if(result.errors) {
            result.errors.forEach(error => {
                setState({ errors: {} });
                if(error.message === 'invalid_username') {
                    setState(prev => {
                        return {
                            errors: {
                                ...prev.errors,
                                username: ['Неверное пользовательское имя']
                            }
                        }
                    })
                } 
                
                if(error.message === 'incorrect_password') {
                    setState(prev => {
                        return {
                            errors: {
                                ...prev.errors,
                                password: ['Неверный пароль']
                            }
                        }
                    })
                }
            })

            return;
        }

        if(result.customer) {
            localStorage.setItem(process.env.NEXT_PUBLIC_SESSION_TOKEN_LS_KEY!, result.customer.sessionToken);
            sessionStorage.setItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_SS_KEY!, result.customer.jwtAuthToken);
            localStorage.setItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN_LS_KEY!, result.customer.jwtRefreshToken);
            setCustomer({ customer: result.customer });
            setBasketState({});
        }

        router.push(`/${local}/cabinet`);
    }

    return (
        <form
            action={submitHandler}
            className='mt-4'
        >
            <div className='outline-dashed outline-1 outline-slate-300 py-8 px-4 mt-8 md:max-w-[800px] md:p-9'>
                <div className='prose text-[12px] md:text-[16px]'>
                    <p>Авторизируйтесь чтобы использовать весь функционал магазина.</p>
                    <p>Ещё не зарегистрированы? <Link href="/registration">Зарегистрироваться.</Link></p>
                </div>

                <div className='flex flex-col gap-5 mt-6'>
                    <label className='block'>
                        <span className='block text-dark leading-normal -tracking-wide mb-1'>
                            Пользовательское имя
                            <span className='text-rose-500'>*</span>
                        </span>
                        <Input
                            type='text'
                            className={clsx(
                                'md:max-w-[485px]',
                                {
                                    'border-rose-500': loginError || state.errors?.username
                                }
                            )}
                            defaultValue={'Lena'}
                            name='username'
                        />
                        {state.errors?.username && <div className='text-rose-500 text-[12px]'>{...state.errors?.username}</div>}
                    </label>
                    <label className='block'>
                        <span className='block text-dark leading-normal -tracking-wide mb-1'>
                            Пароль
                            <span className='text-rose-500'>*</span>
                        </span>
                        <div className='md:max-w-[485px]'>
                            <InputPassword
                                className={clsx(
                                    {
                                        'border-rose-500': loginError || state.errors?.password
                                    }
                                )}
                                name='password'
                                defaultValue={'233dE#sdf'}
                            />
                        </div>
                        {state.errors?.password && <div className='text-rose-500 text-[12px]'>{...state.errors?.password}</div>}
                    </label>
                    <SubmitButton className='h-11 text-[16px] md:max-w-[485px] md:self-start'>
                        Войти
                    </SubmitButton>
                    {loginError &&
                        <div className='text-rose-500 text-[14px]'>
                            Неверный пароль или пользователя с таким именем не существует.
                        </div>
                    }
                </div>
            </div>
        </form>
    );
}