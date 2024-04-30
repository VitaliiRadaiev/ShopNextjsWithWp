'use client';

import { createContext } from "react";
import { CustomerType } from "./types";

interface Context {
    state: { customer?: CustomerType }, 
    setState: React.Dispatch<React.SetStateAction<{ customer?: CustomerType }>>
}

export const CustomerContext = createContext<Context>({} as Context);
