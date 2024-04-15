"use client";

import React, { JSX, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { Input } from '@/app/6_shared/ui/FormFields/Input';

interface SuggestsListWithSearchProps<T>{
    items: T[],
    renderItem: (item: T) => ReactNode;
    onChange: (value: string) => void;
    className?: string;
}

export function SuggestsListWithSearch<T extends { Ref: string }>({ 
    items, 
    renderItem, 
    className, 
    onChange 
}: SuggestsListWithSearchProps<T>): JSX.Element {
    const [value, setValue] = useState('');
    
    return (
        <div className={clsx(className)}>
            <Input
                type='text'
                placeholder='Введите адрес или номер отделения'
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
            />
            <ul className='overflow-y-auto max-h-[260px]'>
                {items.map(item => {
                    return (
                        <li key={item.Ref}>
                            {renderItem(item)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}