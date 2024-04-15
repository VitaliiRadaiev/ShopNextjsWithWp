"use client";

import React, { ButtonHTMLAttributes, HtmlHTMLAttributes, JSX, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function SubmitButton( { children, className, ...props }: PropsWithChildren<SubmitButtonProps> ): JSX.Element {
    const { pending } = useFormStatus();
    return (
        <button
            className={clsx(
                {
                    'pointer-events-none opacity-30': pending
                },
                className
            )}
            {...props}
        >{children}</button>
    );
}

