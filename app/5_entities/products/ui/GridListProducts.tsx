import clsx from 'clsx';
import { ProductCardSkeleton } from './ProductCard';
import { ProductCardType } from '@/app/6_shared/types/types';

interface GridListProductsProps {
    columnsClassNames?: string;
    items: ProductCardType[],
    renderItem: (item: ProductCardType) => JSX.Element
}

export function GridListProducts<T extends { id: string | number }>({ items, renderItem, columnsClassNames }: GridListProductsProps) {

    if (!items.length) {
        return (
            <div>Товары не найдены</div>
        )
    }
    return (
        <ul
            className='flex flex-wrap relative z-1'
        >
            {items.map(product =>
                <li
                    key={product.id}
                    className={clsx(
                        'w-1/2 md:w-1/3 lg:w-1/5',
                        'outline-1 outline-dashed outline-slate-300',
                        'only-mobile:last:odd:w-full',
                        'hover:outline hover:outline-slate-300 bg-white hover:z-[999]',
                        'transition-shadow hover:shadow-[0_0px_10px_rgba(0,0,0,0.25)]',
                        columnsClassNames
                    )}
                >
                    {renderItem(product)}
                </li>
            )}
        </ul>
    );
}

interface GridListProductsSkeletonProps {
    columnsClassNames?: string;
    countOfItems?: number;
}

export function GridListProductsSkeleton({ columnsClassNames, countOfItems = 5 }: GridListProductsSkeletonProps) {
    const items = Array.from({ length: countOfItems }, (_, index) => index + 1);
    return (
        <ul className='flex flex-wrap'>
            {items.map((_, index) =>
                <li key={index}
                    className={clsx(
                        'w-1/2 md:w-1/3 lg:w-1/5',
                        'outline-1 outline-dashed outline-slate-300',
                        'only-mobile:last:odd:w-full p-[1px]',
                        columnsClassNames
                    )}
                >
                    <ProductCardSkeleton />
                </li>
            )}
        </ul>
    );
}