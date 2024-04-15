"use client"

import React, { JSX, useState } from 'react';
import clsx from 'clsx';
import { useDebouncedCallback } from 'use-debounce';
import { ListSearchSuggestions } from './ListSearchSuggestions';

export function Search(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = useDebouncedCallback((term: string) => {
        setSearchQuery(term);
    }, 300);

    return (

        <div className='relative w-full'>
            <input
                type="text"
                autoFocus
                placeholder='Search...'
                className={`h-10 w-full  flex bg-white items-center text-primary border-0 outline-none px-4`}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
            <ListSearchSuggestions searchQuery={searchQuery} />
        </div>
    );
}
