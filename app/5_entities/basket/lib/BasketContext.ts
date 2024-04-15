'use client';

import { createContext } from "react";
import { CartType } from "./types";

interface Context {
    state: { cart?: CartType }, 
    setState: React.Dispatch<React.SetStateAction<{ cart?: CartType }>>
}

export const BasketContext = createContext<Context>({} as Context);
