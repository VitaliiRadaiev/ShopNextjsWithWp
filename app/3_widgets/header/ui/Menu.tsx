"use client"

import React, { JSX, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { CategoryType } from '@/app/5_entities/categories';
import Link from 'next/link';
import IconKey from '@/public/icons/key.svg';
import { SocialList } from '@/app/6_shared/ui/SocialList';


interface MenuProps {
    isOpen: boolean;
    categories: CategoryType[];
}

export function Menu({ isOpen, categories }: MenuProps): JSX.Element {
    const menuRef = useRef<HTMLDivElement>(null)

    const setMenuHeight = () => {
        if (menuRef.current) {
            menuRef.current.style.height = document.documentElement.clientHeight + 'px';
        }
    }

    useEffect(() => {
        window.addEventListener('resize', setMenuHeight);
        return () => window.removeEventListener('resize', setMenuHeight);
    }, [])

    return (
        <div
            ref={menuRef}
            className={clsx(
                'fixed z-20 top-0 left-full h-dvh bg-white pt-[88px] w-full transition-transform',
                {
                    "-translate-x-full": isOpen
                }
            )}
        >
            <div className='overflow-y-auto h-full flex flex-col gap-4 pb-4'>
                <ul>
                    <li>
                        <Link
                            href="/cabinet"
                            className='min-h-14 p-4 flex items-center gap-3 text-lg border-b border-slate-300'
                        >
                            <IconKey className=' h-6 w-auto text-secondary' />
                            Войти в мой кабинет
                        </Link>
                    </li>
                    {categories.map(category =>
                        <li key={category.slug}>
                            <Link
                                href={"/catalog/" + category.slug}
                                className={clsx(
                                    'min-h-14 p-4 flex items-center gap-3 text-lg border-b border-slate-300',
                                    {
                                        'bg-slate-50': false
                                    }
                                )}
                            >
                                {category.name}
                            </Link>
                        </li>
                    )}
                </ul>
                <div className='px-4 flex flex-col gap-5'>
                    <Link
                        href="tel:380932290322"
                        className='text-[20px]'
                    >
                        +380 (93) 22-903-22
                    </Link>

                    <address className='no-italic'>
                        ул. Большая Васильковская 5 Arena Class, 3 этаж, Luxgroups, Київ, 01032
                    </address>

                    <Link href="#" className=' text-secondary underline'>perfect@example.com</Link>

                    <SocialList />
                </div>
            </div>
        </div>
    );
}