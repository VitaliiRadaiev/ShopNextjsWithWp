import { FeatureWithProductScreenshot, Hero, PagesNav, Stats } from '@/app/3_widgets/sections';
import { FeatureSection, HeroSection, PagesApi, StatsSection } from '@/app/5_entities/pages';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';


export default async function page({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const page = await PagesApi.getPage(slug);

    if(!page) {
        notFound();
    }

    return (
        <main className=''>
            <PagesNav slug={slug}/>
            {page.acf.pages_content.map((content, index) => {
                return(
                    <Fragment key={index}>
                        {(content.acf_fc_layout === 'hero') && <Hero data={content as HeroSection}/>}
                        {(content.acf_fc_layout === 'feature') && <FeatureWithProductScreenshot data={content as FeatureSection}/>}
                        {(content.acf_fc_layout === 'stats') && <Stats data={content as StatsSection}/>}
                    </Fragment>
                )
            })}
        </main>
    );
}