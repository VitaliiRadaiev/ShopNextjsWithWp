import { PagesApi } from '@/app/5_entities/pages';
import clsx from 'clsx';
import Link from 'next/link';

export async function PagesNav({ slug }: { slug: string }) {
    const pages = await PagesApi.getPages();
    
    return (
        <div className="container">
            <header className="relative z-10">
                <nav className="flex items-center justify-center p-6 lg:px-8" aria-label="Global">
                    <div className="flex gap-x-6 gap-y-2 lg:gap-x-12 flex-wrap justify-center">
                        {pages.map(page => {

                            return (
                                <Link
                                    key={page.id}
                                    href={'/' + page.slug}
                                    className={clsx(
                                        'text-sm font-semibold leading-6 text-gray-900',
                                        {
                                            'text-red-600': page.slug === slug
                                        }
                                    )}
                                >
                                    {page.title.rendered}
                                </Link>
                            );

                        })}
                    </div>
                </nav>
            </header>
        </div>
    );
}