"use client";

import React, { InputHTMLAttributes, JSX, useState } from 'react';
import clsx from 'clsx';

import IconEyeOff from '@/public/icons/eye-off.svg';
import IconEye from '@/public/icons/eye.svg';
import { Input } from './Input';

export function InputPassword({ className, ...props }: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
    const [type, setType] = useState<'password' | 'text'>('password');

    return (
        <div className={clsx("relative")}>
            <Input
                type={type}
                className={className}
                {...props}
            />
            <div
                className='absolute z-2 h-5 max-h-[80%] top-1/2 right-3 -translate-y-1/2 cursor-pointer'
                onClick={() => setType(type => type === 'password' ? 'text' : 'password')}
            >
                {type === 'password' ? <IconEyeOff className="h-full w-auto" /> : <IconEye className="h-full w-auto" />}
            </div>
        </div>
    );
}