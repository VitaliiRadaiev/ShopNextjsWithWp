'use client';

import { useFormStatus } from 'react-dom';
import { LoadingDots } from '@/app/6_shared/ui/LoadingDots/LoadingDots';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Button } from './Button';
import clsx from 'clsx';


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export function SubmitButton({ children, className, ...props }: PropsWithChildren<ButtonProps>): JSX.Element {
    const { pending } = useFormStatus();
    return (
        <Button
            className={clsx(
                'button relative',
                {
                    'cursor-not-allowed opacity-60 hover:opacity-60': pending
                },
                className
            )}
            onClick={(e) => {
                if (pending) e.preventDefault();
            }}
            {...props}
        >
            <span>{children}</span>
            {pending &&
                <div
                    className='text-[10px] flex items-center justify-center absolute z-3 inset-0'
                >
                    <LoadingDots />
                </div>}
        </Button>
    );
}