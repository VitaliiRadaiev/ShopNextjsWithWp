import React, { ButtonHTMLAttributes, JSX, PropsWithChildren } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export function Button({ children, className, ...props }: ButtonProps): JSX.Element {
    return (
        <button
            className={clsx(
                'inline-flex min-h-8 md:min-h-10 text-[14px] md:text-[16px]',
                'font-semibold px-5 py-1 text-white bg-third rounded hover:bg-third-light',
                'transition uppercase items-center justify-center text-center active:scale-95',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

