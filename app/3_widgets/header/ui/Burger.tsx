"use client"

import React, { JSX } from 'react';
import clsx from 'clsx';

interface BurgerProps {
    isActive: boolean;
    onClick: () => void;
}

export function Burger({ isActive, onClick }: BurgerProps): JSX.Element {
    return (
        <button className=' h-9 w-10 cursor-pointer relative' onClick={onClick}>
            <span
                className={clsx(
                    'block w-8 h-1 bg-white absolute left-1/2 top-1/2 transition -translate-x-1/2 translate-y-[calc(-50%-10px)]',
                    {
                        'opacity-0': isActive
                    }
                )}></span>
            <span
                className={clsx(
                    'block w-8 h-1 bg-white absolute left-1/2 top-1/2 transition -translate-x-1/2 -translate-y-1/2',
                    {
                        'rotate-[45deg]': isActive
                    }
                )}></span>
            <span
                className={clsx(
                    'block w-8 h-1 bg-white absolute left-1/2 top-1/2 transition -translate-x-1/2 -translate-y-1/2',
                    {
                        'rotate-[-45deg]': isActive
                    }
                )}></span>
            <span
                className={clsx(
                    'block w-8 h-1 bg-white absolute left-1/2 top-1/2 transition -translate-x-1/2 translate-y-[calc(-50%+10px)]',
                    {
                        'opacity-0': isActive
                    }
                )}></span>
        </button>
    );
}