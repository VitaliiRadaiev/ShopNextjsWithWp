import { FeatureWithProductScreenshot, Hero, PagesNav, Stats } from '@/app/3_widgets/sections';
import { FeatureSection, HeroSection, PagesApi, StatsSection } from '@/app/5_entities/pages';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

export const revalidate = 600;

export async function generateStaticParams({
    params: { locale },
}: {
    params: { locale: string }
}) {
    const pages = await PagesApi.getPages({ local: locale });

    return pages.map((page) => ({
        slug: page.slug
    }))
}


export default async function page({ params }: { params: { slug: string, locale: string } }) {
    const slug = params.slug;
    const page = await PagesApi.getPage({ local: params.locale, slug });

    if (!page) {
        notFound();
    }

    return (
        <main className=''>
            <PagesNav slug={slug} locale={params.locale} />
            {page.acf.pages_content.map((content, index) => {
                return (
                    <Fragment key={index}>
                        {(content.acf_fc_layout === 'hero') && <Hero data={content as HeroSection} />}
                        {(content.acf_fc_layout === 'feature') && <FeatureWithProductScreenshot data={content as FeatureSection} />}
                        {(content.acf_fc_layout === 'stats') && <Stats data={content as StatsSection} />}
                    </Fragment>
                )
            })}
        </main>
    );
}