import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: '2024-04-10',
});

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { amount, sessionToken } = data;
 
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: "USD",
            metadata: {
                sessionToken
            }
        });
        return NextResponse.json(paymentIntent.client_secret, { status: 200 });
    } catch (error: any) {
        return new NextResponse(error, {
            status: 400,
        });
    }
}