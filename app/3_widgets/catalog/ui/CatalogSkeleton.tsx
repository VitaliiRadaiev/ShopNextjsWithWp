import { GridListProductsSkeleton } from '@/app/5_entities/products';
import { shimmer } from '@/app/6_shared/utils/shimmer';

export function CatalogSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden container`}>
            <div className='bg-gray-100 rounded h-11 w-[240px] lg:h-[54px] lg:w-[340px]'></div>
            <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10 mt-4">
                <div>
                    <div className='bg-gray-100 rounded h-8 mb-4 lg:h-[1000px]'></div>
                </div>
                <div>
                    <div className='flex flex-wrap items-center md:justify-end gap-2'>
                        <div className='bg-gray-100 rounded h-6 w-[125px]'></div>
                        <div className='bg-gray-100 rounded h-10 w-[222px]'></div>
                    </div>
                    <div className='mt-4'>
                        <GridListProductsSkeleton
                            columnsClassNames='basis-1/2 md:basis-1/3'
                            countOfItems={15}
                        />
                    </div>
                    <div className="mt-4">
                        <div className="flex gap-2">
                            <div className='bg-gray-100 rounded size-10'></div>
                            <div className='bg-gray-100 rounded size-10'></div>
                            <div className='bg-gray-100 rounded size-10'></div>
                            <div className='bg-gray-100 rounded size-10'></div>
                            <div className='bg-gray-100 rounded size-10'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}