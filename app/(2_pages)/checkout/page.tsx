import { Checkout, CheckoutSkeleton } from '@/app/3_widgets/checkout';
import { H2 } from '@/app/6_shared/ui/Titles';
import { Suspense } from 'react';

export default function checkoutPage() {
    return (
        <main>
            <div className="py-9 lg:py-20">
                <div className="container">
                    <H2>
                        ОФОРМЛЕНИЕ ЗАКАЗА
                    </H2>
                </div>
                <Suspense fallback={<CheckoutSkeleton />}>
                    <Checkout />
                </Suspense>
            </div>
        </main>
    );
}