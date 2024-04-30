import { BasketSkeleton, Basket } from "@/app/3_widgets/basket";
import { Suspense } from "react";

export default function basketPage() {
    return (
        <main>
            <div className="py-9 lg:py-20">
                <Suspense fallback={<BasketSkeleton />}>
                    <Basket />
                </Suspense>
            </div>
        </main>
    );
}