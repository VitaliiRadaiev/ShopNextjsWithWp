import { HeroSection } from '@/app/5_entities/pages';
import clsx from 'clsx';

export function Hero({ data }: { data: HeroSection }) {
    return (
        <div className="container">
            <div className="bg-white">
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-2xl py-24">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{data.title}</h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600" dangerouslySetInnerHTML={{ __html: data.text }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}