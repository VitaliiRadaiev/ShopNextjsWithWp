import { shimmer } from '@/app/6_shared/utils/shimmer';
import clsx from 'clsx';

export function BasketProductCardSkeleton() {
    return (
        <div
            className={clsx(
                `${shimmer} relative overflow-hidden`,
                'grid grid-cols-[60px_1fr] gap-3 py-4 px-2 relative',
                'md:grid-cols-[200px_1fr_auto_minmax(160px,_auto)] md:py-8 md:ps-5 md:pr-10 md:gap-5'
            )}
        >
            <div className="absolute z-5 top-4 right-2">
                <div className='h-5 w-5 rounded bg-gray-100'></div>
            </div>
            <div className="row-span-3 md:row-auto" >
                <div className="h-28 md:h-[200px] rounded bg-gray-100"></div>
            </div>
            <div className="flex flex-col gap-4">
                <div className='h-5 rounded w-4/5 bg-gray-100'></div>
                <div className='h-5 rounded w-4/6 bg-gray-100'></div>
                <div className='h-5 rounded w-3/4 bg-gray-100'></div>
            </div>
            <div className="">
                <div className="flex gap-2">
                    <div className="h-9 w-9 rounded bg-gray-100"></div>
                    <div className="h-9 w-9 rounded bg-gray-100"></div>
                    <div className="h-9 w-9 rounded bg-gray-100"></div>
                </div>
            </div>
            <div className="md:flex flex-col items-end">
                <div className="h-[28px] w-[80px] md:h-[32px] md:w-[100px] rounded bg-gray-100"></div>
                <div className="h-[18px] w-[30px] md:h-[24px] md:w-[50px] rounded bg-gray-100 mt-2"></div>
            </div>
        </div>
    );
}