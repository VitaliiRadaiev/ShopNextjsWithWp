import { GridListProducts, ProductTagVariantsType, fetchProductsByTagsAndCategory } from '@/app/5_entities/products';
import clsx from 'clsx';

import { ProductCard, ProductCardSkeleton } from '@/app/5_entities/products/ui/ProductCard';
import { AddToBasket } from '@/app/4_features/basket';


type getProductsDataType = {
    categorySlug: string;
    tag: ProductTagVariantsType;
}

interface CatalogPreviewProps {
    requestData: getProductsDataType;
}

export async function CatalogPreview({ requestData }: CatalogPreviewProps) {
    const products = await fetchProductsByTagsAndCategory(requestData.categorySlug, requestData.tag);

    return (
        <GridListProducts
            items={products}
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
    );
}

export function CatalogPreviewSkeleton() {
    return (
        <ul className='flex flex-wrap'>
            <li
                className={clsx(
                    'w-1/2 md:w-1/3 lg:w-1/5',
                    'outline-1 outline-dashed outline-slate-300',
                    'only-mobile:last:odd:w-full',
                )}
            >
                <ProductCardSkeleton />
            </li>
            <li
                className={clsx(
                    'w-1/2 md:w-1/3 lg:w-1/5',
                    'outline-1 outline-dashed outline-slate-300',
                    'only-mobile:last:odd:w-full',
                )}
            >
                <ProductCardSkeleton />
            </li>
            <li
                className={clsx(
                    'w-1/2 md:w-1/3 lg:w-1/5',
                    'outline-1 outline-dashed outline-slate-300',
                    'only-mobile:last:odd:w-full',
                )}
            >
                <ProductCardSkeleton />
            </li>
            <li
                className={clsx(
                    'w-1/2 md:w-1/3 lg:w-1/5',
                    'outline-1 outline-dashed outline-slate-300',
                    'only-mobile:last:odd:w-full',
                )}
            >
                <ProductCardSkeleton />
            </li>
            <li
                className={clsx(
                    'w-1/2 md:w-1/3 lg:w-1/5',
                    'outline-1 outline-dashed outline-slate-300',
                    'only-mobile:last:odd:w-full',
                )}
            >
                <ProductCardSkeleton />
            </li>
        </ul>
    );
}