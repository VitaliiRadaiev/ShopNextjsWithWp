"use client";

import React, { JSX, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { SubmitButton } from '@/app/6_shared/ui/Buttons/SubmitButton';
import { Stars } from '@/app/6_shared/ui/Stars';
import { z } from 'zod';
import { createCommentAction } from '../lib/actions';
import { Input } from '@/app/6_shared/ui/FormFields/Input';
import { fetchWithSessionToken } from '@/app/6_shared/api/fetchWithSessionToken';
import { createPortal } from 'react-dom';
import { Popup } from '@/app/6_shared/ui/Popup';
import { H2, H3 } from '@/app/6_shared/ui/Titles';

type InitialState = {
    errors: {
        name?: string[];
        text?: string[];
    }
}

const FormSchema = z.object({
    name: z.coerce.string().min(2, {
        message: 'Имя слишком короткое'
    }),
    text: z.coerce.string().min(5, {
        message: 'Отзыв слишком короткий'
    }),
});

interface LeaveCommentFormProps {
    productDataBaseId: number;
}

export function LeaveCommentForm({ productDataBaseId }: LeaveCommentFormProps): JSX.Element {
    const [state, setState] = useState<InitialState>({ errors: {} });
    const [nameValue, setNameValue] = useState('');
    const [textValue, setTextValue] = useState('');
    const [popup, popupShow] = useState(false);
    const [popupContent, setPopupContent] = useState<ReactNode | null>(null);

    const successMessage = () => {
        return (
            <>
                <H3 className='pe-8'>Спасибо за ваш отзыв.</H3>
                <p className='text-[20px]'>Отзыв принят и отправлен на модерацию, скоро он будет на сайте.</p>
            </>
        );
    }
    const errorMessage = (text: string) => {
        return (
            <>
                <H3 className='pe-8'>Что-то пошло не так.</H3>
                <p className='text-[20px]'>{text}</p>
            </>
        );
    }

    const onSubmit = async (formData: FormData) => {
        const rawFormData = Object.fromEntries(formData.entries());
        const validatedFields = FormSchema.safeParse({
            text: rawFormData.text.toString().trim(),
            name: rawFormData.name.toString().trim(),
        });

        if (!validatedFields.success) {
            setState({
                errors: validatedFields.error.flatten().fieldErrors
            })
            return;
        }
        setTextValue('');
        setNameValue('');
        const result = await fetchWithSessionToken((token) => createCommentAction(token, {
            rating: Number(rawFormData.stars),
            text: validatedFields.data.text,
            author: validatedFields.data.name,
            productDatabaseId: productDataBaseId
        }))

        if (result.isTargetError) {
            setPopupContent(errorMessage(result.errorMessage as string));
            popupShow(true);
        } else {
            setPopupContent(successMessage());
            popupShow(true);
        }
    }

    return (
        <>
            <form action={onSubmit} className=''>
                <div className='text-[26px]'>
                    <Stars
                        clickable={true}
                        startValue={0}
                    />
                </div>
                <Input
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    type='text'
                    className={clsx(
                        'mt-4',
                        {
                            'border-rose-500': state.errors?.name
                        }
                    )}
                    placeholder='Ваше имя'
                    name='name'
                    required
                />
                {state.errors?.name && <div className='text-rose-500 text-[12px]'>{...state.errors?.name}</div>}
                <textarea
                    placeholder='Ваш отзыв...'
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    name="text"
                    className={clsx(
                        'flex items-center h-20 py-2 px-3 rounded border border-[#c9c9c9] bg-[#f1f1f1] w-full',
                        'focus:border-[#9f9e9e] focus:ring-transparent',
                        '-tracking-wide text-[20px] text-[#666666] mt-4',
                    )}
                    required
                >
                </textarea>
                {state.errors?.text && <div className='text-rose-500 text-[12px]'>{...state.errors?.text}</div>}
                <div className="mt-4">
                    <SubmitButton >
                        Оставить отзыв
                    </SubmitButton>
                </div>
            </form>
            <Popup
                toggleShow={popup}
                onClose={() => popupShow(false)}
            >

                {popupContent}
            </Popup>
        </>
    );
}