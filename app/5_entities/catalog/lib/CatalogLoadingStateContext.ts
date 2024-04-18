'use client';

import { createContext } from "react";

interface Context {
    state: boolean, 
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const CatalogLoadingStateContext = createContext<Context>({} as Context);
