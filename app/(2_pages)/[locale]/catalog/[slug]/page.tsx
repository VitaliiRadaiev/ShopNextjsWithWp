import { Catalog, CatalogSkeleton } from '@/app/3_widgets/catalog';
import { CatalogLoadingOverlay } from '@/app/5_entities/catalog';
import clsx from 'clsx';
import { Suspense } from 'react';

export default function catalogPage(
    { params, searchParams }:
        {
            params: { slug: string, locale: string },
            searchParams: Record<string, string>
        }
) {
    const slug = params.slug;

    return (
        <main className=''>
            <CatalogLoadingOverlay />
            <div className="mt-9 lg:mt-20">
                <Suspense fallback={<CatalogSkeleton />}>
                    <Catalog catalogSlug={slug} searchParams={searchParams}/>
                </Suspense>
            </div>
            <div className="mt-9 lg:mt-20"></div>
        </main>
    );
}