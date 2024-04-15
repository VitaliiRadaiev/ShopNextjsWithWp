import { AddToBasket } from '@/app/4_features/basket';
import { GridListProducts, fetchRelatedProductsByProductSlug } from '@/app/5_entities/products';
import { ProductCard } from '@/app/5_entities/products/ui/ProductCard';
import { H2 } from '@/app/6_shared/ui/Titles';
import clsx from 'clsx';

interface RelatedProductsProps {
    productSlug: string;
}

export async function RelatedProducts({ productSlug }: RelatedProductsProps) {
    const relatedProducts = await fetchRelatedProductsByProductSlug(productSlug);
    if (!relatedProducts) return;

    return (
        <section className="mt-9 lg:mt-14">
            <div className="container">
                <H2>Похожие товары</H2>
                <div className='mt-5'>
                    <GridListProducts
                        items={relatedProducts}
                        renderItem={(product) => {

                            return (
                                <ProductCard
                                    product={product}
                                    addToCartSlot={<AddToBasket stockStatus={product.stockStatus} productId={product.databaseId} />}
                                // addToWishListSlot={<ToggleWishlistProduct inWishlist={inWishlist} productId={product.id}/>}
                                />
                            );
                        }}
                    />
                </div>
            </div>
        </section>
    );
}