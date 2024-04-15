import { Catalog, CatalogSkeleton } from '@/app/3_widgets/catalog';
import clsx from 'clsx';
import { Suspense } from 'react';

export default function catalogPage(
    { params, searchParams }:
        {
            params: { slug: string },
            searchParams: Record<string, string>
        }
) {
    const slug = params.slug;

    return (
        <main className=''>
            <div className="mt-9 lg:mt-20">
                <Suspense fallback={<CatalogSkeleton />}>
                    <Catalog catalogSlug={slug} searchParams={searchParams}/>
                </Suspense>
            </div>
            <div className="mt-9 lg:mt-20"></div>
        </main>
    );
}