"use client";

import React, { JSX, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import getStripe from '@/app/6_shared/utils/get-stripe';
import { fetchCart } from '@/app/5_entities/basket';
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from '@stripe/stripe-js';
import { LoadingDots } from '@/app/6_shared/ui/LoadingDots/LoadingDots';
import { getSessionToken } from '@/app/6_shared/api/getSessionToken';
import { CardElement, useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import { StripeContext } from '../lib/SpriteContext';
import { fetchWithSessionToken } from '@/app/6_shared/api/fetchWithSessionToken';

const stripePromise = getStripe();

interface SpriteElementsProps {
    isFirstShow: boolean;
}

export function SpriteElements({ isFirstShow }: SpriteElementsProps): JSX.Element {
    const [clientSecret, setClientSecret] = useState("");
    const [isPending, setIsPending] = useState(false);

    const createPaymentIntent = async () => {
        // Create PaymentIntent as soon as the page loads
        setIsPending(true);
        const basket = await fetchWithSessionToken((token) => fetchCart(token));
        const sessionToken = await getSessionToken();
        const res = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: extractNumberFromString(basket.total),
                sessionToken
            }),
        })
        const data = await res.json();
        setClientSecret(data);
        setIsPending(false);
    }

    useEffect(() => {
        if (isFirstShow) {
            createPaymentIntent();
        }
    }, [isFirstShow]);

    const options: StripeElementsOptions = {
        clientSecret
    };

    return (
        <div className=''>
            {isPending && <div className='text-[16px] text-secondary'><LoadingDots /></div>}
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <StripePaymentElement />
                </Elements>
            )}
        </div>
    );
}

function StripePaymentElement() {
    const stripe = useStripe();
    const elements = useElements();
    const { message, setMessage, setStripe, setElements } = useContext(StripeContext);

    const [isLoading, setIsLoading] = useState(false);

    // const { error } = await stripe.confirmPayment({
    //     elements,
    //     confirmParams: {
    //         // Make sure to change this to your payment completion page
    //         return_url: "http://localhost:3000/checkout",
    //     },
    //     //redirect: 'if_required'
    // });

    useEffect(() => {
        if (!stripe) {
            return;
        }

        if (elements) {
            setElements && setElements(elements);
            setStripe && setStripe(stripe);

            // setConfirmPayment && setConfirmPayment(async () => {
            //     return stripe.confirmPayment({
            //         elements,
            //         confirmParams: {
            //             // Make sure to change this to your payment completion page
            //             return_url: "http://localhost:3000/checkout",
            //         },
            //         //redirect: 'if_required'
            //     })
            // })
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage && setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage && setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage && setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage && setMessage("Something went wrong.");
                    break;
            }
        });

    }, [stripe]);

    return (
        <>
            <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
            {message && <div id="payment-message">{message}</div>}
        </>
    );
}


function extractNumberFromString(inputString?: string) {
    if (!inputString) return 0;

    const digitsOnly = inputString.replace(/[^\d]/g, '');

    const numberValue = parseInt(digitsOnly, 10);

    return numberValue;
}