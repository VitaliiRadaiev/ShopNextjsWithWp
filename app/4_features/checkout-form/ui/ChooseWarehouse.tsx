"use client";

import React, { JSX, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { searchWarehousesAction } from '@/app/5_entities/nova-post';
import { WarehouseType } from '@/app/5_entities/nova-post/lib/types';
import { Input } from '@/app/6_shared/ui/FormFields/Input';
import { useDebouncedCallback } from 'use-debounce';
import { LoadingDots } from '@/app/6_shared/ui/LoadingDots/LoadingDots';

interface ChooseWarehouseProps {
    settlementRef: string;
    error?: string[];
}

export function ChooseWarehouse({ settlementRef, error }: ChooseWarehouseProps): JSX.Element {
    const [isSuggestsShow, setIsSuggestsShow] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [pending, setPending] = useState(false);
    const [warehouses, setWarehouses] = useState<WarehouseType[]>([]);
    const [total, setTotal] = useState<null | number>(null);
    const [selectElValue, setSelectElValue] = useState('Выберете подходящее отделение');

    const isCanLoadMoreWarehouses = total
        ? Math.ceil(total / 50) > page
        : false;


    const getWarehouses = useDebouncedCallback(async (properties: { SettlementRef: string, Limit: string, Page: string, FindByString: string }) => {
        setPending(true);
        const res = await searchWarehousesAction(properties);
        setWarehouses(res.data);
        setTotal(res.info.totalCount ? res.info.totalCount : null);
        setPage(1);
        setPending(false);
    }, 300)

    const appendWarehouses = async (Page: string) => {
        setPending(true);
        const res = await searchWarehousesAction({
            SettlementRef: settlementRef,
            Limit: "50",
            Page,
            FindByString: searchValue
        });
        setWarehouses(prev => [...prev, ...res.data]);
        setPending(false);
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        setSelectElValue('Выберете подходящее отделение');
        getWarehouses({
            SettlementRef: settlementRef,
            Limit: "50",
            Page: "1",
            FindByString: searchValue
        });
    }, [settlementRef, searchValue]);

    useEffect(() => {
        if (page === 1) return;
        appendWarehouses(String(page));
    }, [page])

    const setSuggestsListHide = (e: MouseEvent) => {
        if (wrapperRef && !wrapperRef.current?.contains(e.target as Node)) {
            const el = e.target as HTMLElement;
            if (el.closest('[data-load-more]')) return;
            setIsSuggestsShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', setSuggestsListHide, false);
        return () => document.removeEventListener('click', setSuggestsListHide, false);
    }, []);


    return (
        <div ref={wrapperRef} className='relative'>
            <input ref={inputRef} type="hidden" name='warehouse'/>
            <div
                className={clsx(
                    'flex items-center min-h-11 py-2 px-3 pe-8 rounded border border-[#c9c9c9] bg-[#f1f1f1] w-full',
                    'focus:border-[#9f9e9e] focus:ring-transparent relative',
                    '-tracking-wide text-[20px] text-[#666666] cursor-pointer',
                    {
                        'border-rose-500': error
                    }
                )}
                onClick={() => setIsSuggestsShow(prevState => !prevState)}
            >
                {selectElValue}
                <ChevronDownIcon
                    className='absolute top-1/2 right-2 -translate-y-1/2 h-[1em]'
                />
            </div>
            {error && <div className='text-rose-500 text-[12px]'>{...error}</div>}
            {isSuggestsShow &&
                <div className='absolute top-full left-0 w-full z-10 bg-white shadow-md p-1'>
                    <Input
                        type='text'
                        placeholder='Введите адрес или номер отделения'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {pending &&
                        <div className={clsx(
                            'px-3 text-[12px] text-secondary absolute top-full left-0 w-full bg-white shadow-md z-10',
                            'absolute top-11 left-0 w-full z-4'
                        )}>
                            <LoadingDots />
                        </div>
                    }
                    <ul className='overflow-y-auto max-h-[260px] relative mt-1'>
                        {!warehouses.length &&
                            <div className='text-rose-500 text-[12px]'>
                                В этом населенном пункте нету отделений Новой Почты, вы можете заказать курьера
                            </div>
                        }
                        {warehouses.map(warehouse => {
                            return (
                                <li key={warehouse.Ref}>
                                    <button
                                        type='button'
                                        className='px-3 py-2 transition hover:bg-slate-100 w-full text-start'
                                        onClick={() => {
                                            if (inputRef.current) {
                                                inputRef.current.value = warehouse.Description;
                                            }
                                            setIsSuggestsShow(false);
                                            setSelectElValue(warehouse.Description);
                                        }}
                                    >
                                        {warehouse.Description}
                                    </button>
                                </li>
                            );
                        })}
                        <li>
                            {isCanLoadMoreWarehouses &&
                                <button
                                    data-load-more
                                    type='button'
                                    className='px-3 py-2 transition hover:bg-slate-100 w-full text-start text-secondary'
                                    onClick={(e) => {
                                        setPage(prev => prev + 1);
                                    }}
                                >
                                    Посмотреть ещё
                                </button>
                            }
                        </li>
                    </ul>
                </div>
            }
        </div>
    );
}