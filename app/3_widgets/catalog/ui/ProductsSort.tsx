"use client";

import React, { ChangeEvent, JSX, useContext, useState } from 'react';
import clsx from 'clsx';
import { SortByType } from '@/app/5_entities/products';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CatalogLoadingStateContext } from '@/app/5_entities/catalog';

interface ProductsSortProps {

}

export function ProductsSort({ }: ProductsSortProps): JSX.Element {
    const searchParams = useSearchParams() || '';
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const { setState: setIsLoading } = useContext(CatalogLoadingStateContext);

    const defaultValue: SortByType = params.get('sortBy') as SortByType || 'rank';

    const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        params.set('page', '1');
        params.set('sortBy', e.target.value);
        replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
        setIsLoading(true);
    }

    return (
        <div className='flex flex-wrap items-center md:justify-end gap-2'>
            <h5 className='font-bold'>Сортировать: </h5>
            <select defaultValue={defaultValue} className="" onChange={handleFilter}>
                <option value="rank">по рейтингу</option>
                <option value="expensive">от дорогих к дешевым</option>
                <option value="cheap">от дешевых к дорогим</option>
            </select>
        </div>
    );
}