import { CategoryType, fetchCategories } from '@/app/5_entities/categories';
import { CatalogPreviewTabs } from './CatalogPreviewTabs';
import { CatalogPreview, CatalogPreviewSkeleton } from './CatalogPreview';
import { Suspense } from 'react';
import { H2 } from '@/app/6_shared/ui/Titles';


export async function Catalogs() {
    const categories = await fetchCategories();

    return (
        <>
            {categories.map(category =>
                <CatalogPreviewTabs
                    key={category.slug}
                    slotTitle={
                        <H2>
                            Каталог: <span className='text-[0.6em] lg:text-[1em]'>{category.name}</span>
                        </H2>
                    }
                    categoryId={category.slug}
                    slotCatalogPreviewNew={
                        <Suspense fallback={<CatalogPreviewSkeleton />}>
                            <CatalogPreview requestData={{
                                categorySlug: category.slug,
                                tag: 'novelty'
                            }} />
                        </Suspense>
                    }
                    slotCatalogPreviewRecommended={
                        <Suspense fallback={<CatalogPreviewSkeleton />}>
                            <CatalogPreview requestData={{
                                categorySlug: category.slug,
                                tag: 'recommended'
                            }} />
                        </Suspense>
                    }
                    slotCatalogPreviewPromotion={
                        <Suspense fallback={<CatalogPreviewSkeleton />}>
                            <CatalogPreview requestData={{
                                categorySlug: category.slug,
                                tag: 'promotion'
                            }} />
                        </Suspense>
                    }
                />
            )}
        </>
    );
}