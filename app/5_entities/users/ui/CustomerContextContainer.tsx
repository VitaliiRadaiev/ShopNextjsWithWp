"use client";

import React, { JSX, PropsWithChildren, useState } from 'react';
import { CustomerContext } from '../lib/CustomerContext';
import { CustomerType } from '../lib/types';


export function CustomerContextContainer( { children }: PropsWithChildren ): JSX.Element {
    const [state, setState] = useState<{ customer?: CustomerType }>({});
    return (
        <CustomerContext.Provider value={{ state, setState }}>
            {children}
        </CustomerContext.Provider>
    );
}