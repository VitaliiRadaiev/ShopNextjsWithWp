import { shimmer } from '@/app/6_shared/utils/shimmer';
import clsx from 'clsx';

export function ProductSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden container`}>
            <div
                className={clsx(
                    'text-[25px] bg-gray-100 rounded h-[1em]',
                    'max-w-[980px] lg:text-[39px]'
                )}
            >
            </div>
            <div className='mt-6 lg:flex lg:gap-20 lg:mt-14'>
                <div className='shrink-0 grow-0 lg:basis-[500px] min-w-0'>
                    <div className='bg-gray-100 rounded h-[330px] lg:h-[452px]'></div>
                </div>
                <div className='mt-6 lg:mt-0 flex flex-col gap-5 shrink grow lg:gap-8'>
                    <div className='flex flex-col gap-1'>
                        <div className='bg-gray-100 rounded text-[20px] h-[1em] w-full'></div>
                        <div className='bg-gray-100 rounded text-[20px] h-[1em] w-3/4'></div>
                        <div className='bg-gray-100 rounded text-[20px] h-[1em] w-full'></div>
                    </div>
                    <div className='bg-gray-100 rounded text-[20px] h-[1em] w-[140px]'></div>
                    <div className='flex flex-col gap-1 text-[32px]'>
                        <div className='bg-gray-100 rounded text-[0.6em] h-[1em] w-[100px]'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-[120px]'></div>
                    </div>
                    <div className='bg-gray-100 rounded h-10 w-full'></div>
                    <hr />
                    <div className='flex flex-col gap-1 text-[12px] lg:text-[15px]'>
                        <div className='bg-gray-100 rounded h-[1em] w-full'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/4'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/5'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-full'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/4'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/5'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-full'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/4'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/5'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-full'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/4'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/5'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-full'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/4'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/5'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-full'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/4'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/5'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-full'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/4'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/5'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-full'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/4'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/5'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-full'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/4'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/5'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-full'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/4'></div>
                        <div className='bg-gray-100 rounded h-[1em] w-3/5'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}