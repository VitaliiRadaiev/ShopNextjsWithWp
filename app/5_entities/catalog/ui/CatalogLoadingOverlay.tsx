"use client";

import React, { JSX, useContext } from 'react';
import clsx from 'clsx';
import { CatalogLoadingStateContext } from '../lib/CatalogLoadingStateContext';
import { LoadingDots } from '@/app/6_shared/ui/LoadingDots/LoadingDots';


export function CatalogLoadingOverlay(): JSX.Element | null {
    const { state: isLoading } = useContext(CatalogLoadingStateContext);

    if(isLoading) {
        return (
            <div className='fixed z-10 top-0 left-0 h-full w-full bg-slate-600/45 flex items-center justify-center text-[22px] text-white'>
                <LoadingDots />
            </div>
        );
    } else {
        return null;
    }
}