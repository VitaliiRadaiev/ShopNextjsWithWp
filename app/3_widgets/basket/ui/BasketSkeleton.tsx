import { H2 } from '@/app/6_shared/ui/Titles';
import clsx from 'clsx';
import { shimmer } from '@/app/6_shared/utils/shimmer';
import { BasketProductCardSkeleton } from '@/app/5_entities/basket';


export function BasketSkeleton() {
    return (
        <div className="container">
            <H2>
                Корзина
            </H2>
            <div
                className={clsx(
                    `${shimmer} relative overflow-hidden`,
                    "mt-6 flex flex-col gap-4 md:flex-row md:justify-between",
                    "pb-4 border-b border-primary"
                )}
            >
                <div className="flex items-center gap-4">
                    <div className='h-[22px] w-[66px] rounded bg-gray-100'></div>
                    <div className='h-[38px] w-[175px] rounded bg-gray-100'></div>
                </div>
                <div className='h-12 flex items-center justify-center rounded bg-gray-100 md:w-[210px]'>
                    <div className="h-6 w-3/5 rounded bg-white"></div>
                </div>
            </div>
            <ul className="mt-4" >
                <li className='outline-1 outline-dashed outline-slate-300 bg-white'>
                    <BasketProductCardSkeleton />
                </li>
                <li className='outline-1 outline-dashed outline-slate-300 bg-white'>
                    <BasketProductCardSkeleton />
                </li>
                <li className='outline-1 outline-dashed outline-slate-300 bg-white'>
                    <BasketProductCardSkeleton />
                </li>
            </ul>
        </div>
    );
}