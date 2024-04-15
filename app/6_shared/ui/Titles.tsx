import clsx from 'clsx';
import { HtmlHTMLAttributes, PropsWithChildren } from 'react';

interface TitleProps extends HtmlHTMLAttributes<HTMLElement> {
    
}

export function H2({ children, className }: PropsWithChildren<TitleProps>) {
    return (
        <h2
            className={clsx(
                className,
                "text-[32px] text-third font-bold leading-snug -tracking-wide uppercase lg:text-[39px]"
            )}
        >
            {children}
        </h2>
    );
}
export function H3({ children, className }: PropsWithChildren<TitleProps>) {
    return (
        <h3
            className={clsx(
                className,
                "text-[26px] text-third font-bold leading-snug -tracking-wide uppercase lg:text-[30px]"
            )}
        >
            {children}
        </h3>
    );
}
export function H4({ children, className }: PropsWithChildren<TitleProps>) {
    return (
        <h4
            className={clsx(
                className,
                "text-[20px] text-third font-bold leading-snug -tracking-wide uppercase lg:text-[24px]"
            )}
        >
            {children}
        </h4>
    );
}