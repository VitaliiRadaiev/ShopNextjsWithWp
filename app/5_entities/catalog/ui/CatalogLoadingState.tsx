"use client";

import React, { JSX, PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';
import { CatalogLoadingStateContext } from '../lib/CatalogLoadingStateContext';
import { useSearchParams } from 'next/navigation';


export function CatalogLoadingState({ children }: PropsWithChildren): JSX.Element {
    const [state, setState] = useState<boolean>(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        setState(false);
    },[searchParams]);


    return (
        <CatalogLoadingStateContext.Provider value={{ state, setState }}>
            {children}
        </CatalogLoadingStateContext.Provider>
    );
}