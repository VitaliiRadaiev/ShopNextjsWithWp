import { shimmer } from '@/app/6_shared/utils/shimmer';
import clsx from 'clsx';

export function CheckoutSkeleton() {
    return (
        <section>
            <div
                className={clsx(
                    `${shimmer} relative overflow-hidden container`,
                )}
            >
                <div className="flex flex-col gap-5 lg:gap-8 md:flex-row-reverse mt-4">
                    <div className="md:shrink-0 md:grow-0 md:basis-[300px] lg:basis-[400px] relative">
                        <div className='sticky'>
                            <div className="bg-gray-100 rounded p-4 h-[300px]"></div>
                        </div>
                    </div>
                    <div className='md:shrink md:grow'>
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-5">
                                <div className='block'>
                                    <div className='bg-gray-100 rounded w-16 h-6 mb-1'></div>
                                    <div className='bg-gray-100 rounded h-11'></div>
                                </div>
                                <div className='block'>
                                    <div className='bg-gray-100 rounded w-16 h-6 mb-1'></div>
                                    <div className='bg-gray-100 rounded h-11'></div>
                                </div>
                                <div className='block'>
                                    <div className='bg-gray-100 rounded w-16 h-6 mb-1'></div>
                                    <div className='bg-gray-100 rounded h-11'></div>
                                </div>
                                <div className='block'>
                                    <div className='bg-gray-100 rounded w-16 h-6 mb-1'></div>
                                    <div className='bg-gray-100 rounded h-11'></div>
                                </div>
                            </div>
                            <div>
                                <div className='bg-gray-100 rounded h-8 w-1/3'></div>
                                <div className="flex flex-col gap-5 mt-4">
                                    <div className='block'>
                                        <div className='bg-gray-100 rounded w-16 h-6 mb-1'></div>
                                        <div className='bg-gray-100 rounded h-11'></div>
                                    </div>
                                    <div className='bg-gray-100 rounded h-11 flex items-center gap-3 p-3'>
                                        <div className="shrink-0 grow-0 w-6 h-6 bg-white rounded-full"></div>
                                        <div className="shrink-0 grow-0 w-2/3 h-6 bg-white rounded"></div>
                                    </div>
                                    <div className='bg-gray-100 rounded h-11 flex items-center gap-3 p-3'>
                                        <div className="shrink-0 grow-0 w-6 h-6 bg-white rounded-full"></div>
                                        <div className="shrink-0 grow-0 w-2/3 h-6 bg-white rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='bg-gray-100 rounded h-8 w-1/3'></div>
                                <div className="flex flex-col gap-5 mt-4">
                                    <div className='h-11 flex items-center gap-3'>
                                        <div className="shrink-0 grow-0 w-6 h-6 bg-gray-100 rounded-full"></div>
                                        <div className="shrink-0 grow-0 w-2/3 h-6 bg-gray-100 rounded"></div>
                                    </div>
                                    <div className='h-11 flex items-center gap-3'>
                                        <div className="shrink-0 grow-0 w-6 h-6 bg-gray-100 rounded-full"></div>
                                        <div className="shrink-0 grow-0 w-2/3 h-6 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-5 rounded w-full min-h-16 bg-gray-100'></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}