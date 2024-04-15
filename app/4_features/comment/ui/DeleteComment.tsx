"use client";

import React, { JSX, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { SubmitButton as SubmitButtonWithDots } from '@/app/6_shared/ui/Buttons/SubmitButton';
import { deleteCommentAction } from '../lib/actions';

interface DeleteCommentProps {
    commentId: string;
}

export function DeleteComment({ commentId }: DeleteCommentProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const wrapperRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        const onOutsideClickHandler = (e: MouseEvent) => {
            if(wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsMode(false)
            }
        }

        document.documentElement.addEventListener('click', onOutsideClickHandler);
        () => document.documentElement.removeEventListener('click', onOutsideClickHandler);
    }, [])

    return (
        <form ref={wrapperRef} action={deleteCommentAction.bind(null, commentId)} className='flex items-center relative'>
            {isMode &&
                <div className='absolute left-1/2 bottom-[calc(100%+10px)] bg-white shadow rounded p-2 w-[180px] -translate-x-1/2 z-10'>
                    <div className='text-[14px] text-center'>Вы уверены что хотите удалить свой отзыв?</div>
                    <SubmitButtonWithDots className='mt-2 w-full !text-white !no-underline !bg-red-700 hover:!bg-red-600'>Удалить</SubmitButtonWithDots>
                </div>

            }
            <button
                type='button'
                onClick={() => setIsMode(prev => !prev)}
            >Удалить</button>
        </form>
    );
}