import { FetchProductsQueriesType, GridListProducts } from '@/app/5_entities/products';
import clsx from 'clsx';
import { ProductCard } from '@/app/5_entities/products/ui/ProductCard';
import { AddToBasket } from '@/app/4_features/basket';
import { useEffect, useState } from 'react';
import { Spinner } from '@/app/6_shared/ui/Spinner';
import { getProductsAction } from '../lib/actions';
import { ProductCardFromRestType, ProductCardType } from '@/app/6_shared/types/types';
import { ProductCardRest } from '@/app/5_entities/products/ui/ProductCardRest';



interface ProductsProps {
    products: ProductCardFromRestType[]
}

export function Products({ products }: ProductsProps) {

    if (!products.length) {
        return (
            <div>Товары не найдены</div>
        )
    }

    return (
        <>
            <ul
                className='flex flex-wrap relative z-1'
            >
                {products.map(product =>
                    <li
                        key={product.id}
                        className={clsx(
                            'w-1/2 md:w-1/3',
                            'outline-1 outline-dashed outline-slate-300',
                            'only-mobile:last:odd:w-full',
                            'hover:outline hover:outline-slate-300 bg-white hover:z-[999]',
                            'transition-shadow hover:shadow-[0_0px_10px_rgba(0,0,0,0.25)]',
                        )}
                    >
                        <ProductCardRest 
                            product={product}
                            addToCartSlot={<AddToBasket stockStatus={product.stock_status === 'instock' ? 'IN_STOCK' : 'OUT_OF_STOCK'} productId={product.id} />}
                        />
                    </li>
                )}
            </ul>
        </>
    );
}