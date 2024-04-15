"use client";

import React, { JSX, PropsWithChildren, useState } from 'react';
import { CartType } from '../lib/types';
import { BasketContext } from '../lib/BasketContext';


export function BasketContextContainer( { children }: PropsWithChildren ): JSX.Element {
    const [state, setState] = useState<{ cart?: CartType }>({});
    return (
        <BasketContext.Provider value={{ state, setState }}>
            {children}
        </BasketContext.Provider>
    );
}