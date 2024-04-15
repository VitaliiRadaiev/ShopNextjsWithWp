import { ProductCardSkeleton } from '@/app/5_entities/products/ui/ProductCard';
import { shimmer } from '@/app/6_shared/utils/shimmer';
import clsx from 'clsx';

export function RelatedProductsSkeleton() {
    return (
        <section className="mt-9 lg:mt-14">
            <div className={`${shimmer} relative overflow-hidden container`}>
                <div
                    className={clsx(
                        'text-[25px] bg-gray-100 rounded h-[1em]',
                        'max-w-[380px] lg:text-[39px]'
                    )}
                ></div>
                <div className='mt-5'>
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
                </div>
            </div>
        </section>
    );
}