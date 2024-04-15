import React, { AnchorHTMLAttributes, JSX } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export function ButtonLink({ children, className, href, ...props }: ButtonProps): JSX.Element {
    return (
        <Link
            href={href}
            className={clsx(
                'inline-flex min-h-8 md:min-h-10 text-[14px] md:text-[16px]',
                'font-semibold px-5 py-1 text-white bg-third rounded hover:bg-third-light',
                'transition uppercase items-center',
                className
            )}
            {...props}
        >
            {children}
        </Link>
    );
}

