'use client';

import { PaymentIntentResult, Stripe, StripeElements, StripeError } from "@stripe/stripe-js";
import { createContext } from "react";

interface Context {
    stripe: Stripe | null,
    setStripe?: React.Dispatch<React.SetStateAction<Stripe | null>>
    elements: StripeElements | null,
    setElements?: React.Dispatch<React.SetStateAction<StripeElements | null>>,
    message: null | string,
    setMessage?: React.Dispatch<React.SetStateAction<string | null>>
}

export const StripeContext = createContext<Context>({
    stripe: null,
    elements: null,
    message: null,
});
