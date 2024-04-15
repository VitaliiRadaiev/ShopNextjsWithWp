'use client'

import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import InputMaskBase from 'react-input-mask';

interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string;
}

export function InputMask({ className, mask, ...props }: InputMaskProps ) {
    return (
        <InputMaskBase
            mask={mask}
            className={clsx(
                'flex items-center h-11 py-2 px-3 rounded border border-[#c9c9c9] bg-[#f1f1f1] w-full',
                'focus:border-[#9f9e9e] focus:ring-transparent',
                '-tracking-wide text-[20px] text-[#666666]',
                className
            )}
            {...props}
        />
    )
}