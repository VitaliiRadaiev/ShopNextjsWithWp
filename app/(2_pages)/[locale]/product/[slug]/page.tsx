
import { Product } from "@/app/3_widgets/product";
import { ProductSkeleton } from "@/app/3_widgets/product/ui/ProductSkeleton";
import { RelatedProducts, RelatedProductsSkeleton } from "@/app/3_widgets/related-products";
import { Suspense } from "react";

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    //const product = await fetchProductBySlug(slug);
    //saveProductAsLastViewedAction(id);

    return (
        <main className="">
            <div className="mt-9 lg:mt-20">
                <Suspense fallback={<ProductSkeleton />}>
                    <Product productSlug={slug} />
                </Suspense>
            </div>
            <div className="mt-9 lg:mt-20">
                <Suspense fallback={<RelatedProductsSkeleton />}>
                    <RelatedProducts productSlug={slug}/>
                </Suspense>
            </div>
            <div className="mt-9 lg:mt-20"></div>
        </main>
    );
}
