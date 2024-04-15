"use client";

import React, { JSX, PropsWithChildren, useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/app/6_shared/ui/Buttons/Button';
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/solid';

export function FilterBox({ children }: PropsWithChildren): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Button
                className='mb-4 lg:hidden w-full gap-2'
                onClick={() => {
                    document.documentElement.classList.add('overflow-hidden');
                    setIsOpen(true)
                }}
            >
                <AdjustmentsHorizontalIcon className='h-[1em] w-auto' />
                Фильтр
            </Button>
            <div
                className={clsx(
                    'fixed z-40 top-0 right-full h-dvh bg-white w-full transition-transform',
                    'pt-12 lg:pt-0 lg:static lg:h-auto flex flex-col justify-between',
                    {
                        "translate-x-full": isOpen
                    }
                )}
            >
                <button
                    className='absolute top-2 right-2 p-1 h-8 w-8 flex items-center justify-center lg:hidden'
                    onClick={() => {
                        document.documentElement.classList.remove('overflow-hidden');
                        setIsOpen(false)
                    }}
                >
                    <XMarkIcon className='h-full w-auto' />
                </button>
                <div className='h-full overflow-y-auto'>
                    {children}
                </div>
                <div className='px-4 py-3 lg:hidden'>
                    <Button
                        className='w-full'
                        onClick={() => {
                            document.documentElement.classList.remove('overflow-hidden');
                            setIsOpen(false)
                        }}
                    >Применить</Button>
                </div>
            </div>
        </>
    );
}