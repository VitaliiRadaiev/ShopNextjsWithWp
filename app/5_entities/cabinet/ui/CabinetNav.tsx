'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon, UserIcon, ClipboardDocumentListIcon, StarIcon } from '@heroicons/react/24/solid';
import { Button } from '@/app/6_shared/ui/Buttons/Button';
import { usePathname } from 'next/navigation';


export function CabinetNav({ children }: PropsWithChildren) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsNavOpen(false)
    }, [pathname])

    return (
        <>
            <Button className='!text-[28px] lg:hidden' onClick={() => setIsNavOpen(true)}>
                <Bars3Icon className='h-[1em] w-auto' />
            </Button>
            <div
                className={clsx(
                    'fixed top-0 right-full w-full h-dvh bg-white z-30 transition-transform',
                    'px-4 pt-12 pb-4',
                    'lg:static lg:p-0 lg:w-auto lg:h-auto lg:z-auto',
                    {
                        'translate-x-full': isNavOpen
                    }
                )}
            >
                <button
                    onClick={() => setIsNavOpen(false)}
                    className='absolute top-3 right-3 text-[26px] p-1 lg:hidden'
                >
                    <XMarkIcon className='h-[1em] w-auto' />
                </button>
                <ul className='flex flex-col gap-2 text-[20px]'>
                    <li>
                        <Link
                            href="/cabinet"
                            className={clsx(
                                'flex items-center gap-2',
                                'transition-colors [&:not(.active)]:hover:text-secondary-light',
                                {
                                    'text-secondary active': pathname === '/cabinet'
                                }
                            )}
                        >
                            <UserIcon className='h-[1em] w-auto' />
                            Личная Информация
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/cabinet/orders"
                            className={clsx(
                                'flex items-center gap-2',
                                'transition-colors [&:not(.active)]:hover:text-secondary-light',
                                {
                                    'text-secondary active': pathname === '/cabinet/orders'
                                }
                            )}
                        >
                            <ClipboardDocumentListIcon className='h-[1em] w-auto' />
                            История
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/cabinet/wishlist"
                            className={clsx(
                                'flex items-center gap-2',
                                'transition-colors [&:not(.active)]:hover:text-secondary-light',
                                {
                                    'text-secondary active': pathname === '/cabinet/wishlist'
                                }
                            )}
                        >
                            <StarIcon className='h-[1em] w-auto' />
                            Список Желаний
                        </Link>
                    </li>
                </ul>
                <div className='mt-4'>
                    {children}
                </div>
            </div>
        </>
    );
}