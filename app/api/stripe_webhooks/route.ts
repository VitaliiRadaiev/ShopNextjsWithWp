// import { NextResponse, NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//     console.log('Webhook req', req.body);
//     return NextResponse.json({}, { status: 200 });
// }


import { NextApiRequest } from "next";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { buffer } from "stream/consumers";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: '2024-04-10',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const body = JSON.parse(rawBody);
        const signature = headers().get("stripe-signature") as string;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
        } catch (err) {
            return new Response(`Webhook Error: ${err}`, {
                status: 400,
            });
        }

        switch (event.type) {
            case 'payment_intent.created': {
                const paymentIntent = event.data.object;
                console.log(`Create event type ${event.type}.`);
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached(paymentMethod);
                console.log('webhook metadata', event.data.object.metadata);
                break;
            }
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);
                break;
            case 'payment_method.attached':
                const paymentMethod = event.data.object;
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached(paymentMethod);
                break;
            default:
                // Unexpected event type
                console.log(`Unhandled event type ${event.type}.`);
        }

        return NextResponse.json({ result: event, ok: true });
    } catch (error) {

        console.error('==> Sprite Webhook Error ', error);
        return NextResponse.json(
            {
                message: "something went wrong",
                ok: false,
            },
            { status: 500 }
        );
    }
}