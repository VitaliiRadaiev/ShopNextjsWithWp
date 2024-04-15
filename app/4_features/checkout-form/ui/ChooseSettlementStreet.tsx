"use client";

import React, { ChangeEvent, JSX, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { searchSettlementStreetsAction } from '@/app/5_entities/nova-post';
import { useQueryAction } from '@/app/6_shared/hooks/hooks';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/app/6_shared/ui/FormFields/Input';
import { LoadingDots } from '@/app/6_shared/ui/LoadingDots/LoadingDots';

interface ChooseSettlementStreetProps {
    settlementRef: string;
    error?: string[];
}

export function ChooseSettlementStreet({ settlementRef, error }: ChooseSettlementStreetProps): JSX.Element {
    const [streetName, setStreetName] = useState('');
    const [isSuggestsShow, setIsSuggestsShow] = useState(false);
    const [isSettlementSelected, setIsSettlementSelected] = useState(false);
    const callback = useCallback(async () => {
        return searchSettlementStreetsAction({
            StreetName: streetName,
            SettlementRef: settlementRef,
            Limit: '150',
            Page: '1'
        });
    }, [streetName, settlementRef]);
    const { data: settlements, isLoading } = useQueryAction(callback);
    const isSettlements = settlements && !!settlements.data[0]?.Addresses.length && true || false;
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const onChangeHandler = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        setStreetName(e.target.value);
    }, 300);

    const setSuggestsListHide = (e: MouseEvent) => {
        if (wrapperRef && !wrapperRef.current?.contains(e.target as Node)) {
            setIsSuggestsShow(false);

            if (!isSettlementSelected && inputRef.current) inputRef.current.value = '';
        }
    };

    useEffect(() => {
        document.addEventListener('click', setSuggestsListHide, false);
        return () => document.removeEventListener('click', setSuggestsListHide, false);
    }, [isSettlementSelected]);

    return (
        <div ref={wrapperRef} className="relative">
            <label className='block'>
                <span className='block text-dark leading-normal -tracking-wide mb-1'>
                Улица
                    <span className='text-rose-500'>*</span>
                </span>
                <Input
                    ref={inputRef}
                    type='text'
                    className={clsx(
                        {
                            'border-rose-500': error
                        }
                    )}
                    defaultValue={''}
                    name='settlementStreet'
                    onFocus={() => setIsSuggestsShow(true)}
                    onChange={onChangeHandler}
                    placeholder='Введите адресс'
                    
                />
            </label>
            {error && <div className='text-rose-500 text-[12px]'>{...error}</div>}
            {isSuggestsShow &&
                <>
                    {(streetName.length > 0) && isLoading &&
                        <div className='px-3 text-[12px] text-secondary absolute top-full left-0 w-full bg-white shadow-md z-10'>
                            <LoadingDots />
                        </div>
                    }
                    <ul className={clsx(
                        'absolute top-full left-0 w-full bg-white shadow-md z-10',
                        'overflow-y-auto max-h-[260px]'
                    )}>
                        {settlements && isSettlements && settlements.data[0].Addresses.map(settlement => {
                            return (
                                <li key={settlement.SettlementStreetRef}>
                                    <button
                                        type='button'
                                        className='px-3 py-2 transition hover:bg-slate-100 w-full text-start'
                                        onClick={() => {
                                            if (inputRef.current) {
                                                inputRef.current.value = settlement.Present;
                                            }
                                            setIsSettlementSelected(true);
                                            setIsSuggestsShow(false);
                                        }}
                                    >
                                        {settlement.Present}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </>
            }
        </div>
    );
}