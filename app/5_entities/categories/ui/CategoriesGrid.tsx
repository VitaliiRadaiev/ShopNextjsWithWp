import clsx from 'clsx';
import { CategoryType } from '..';
import Link from 'next/link';

import { ImageRemote } from '@/app/6_shared/ui/Images';

interface CategoriesGridProps {
    categories: CategoryType[]
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
    return (
        <div className='grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'>
            {categories.map((category, index) => {
                return (
                    <Link
                        key={category.slug}
                        href={'/catalog/' + category.slug}
                        className={clsx(
                            'flex relative h-36 rounded overflow-hidden text-white text-[24px] items-center justify-center',
                            '[&_img]:hover:scale-105'
                        )}
                    >
                        <div className='absolute inset-0 z-1 bg-black'>
                            <div className='opacity-75 h-full w-full'>
                                <ImageRemote 
                                    src={category.image?.sourceUrl}
                                    className='object-cover block !h-full !w-full transition-transform duration-500'
                                />
                            </div>
                        </div>
                        <div className='relative z-3'>
                            {category.name}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}