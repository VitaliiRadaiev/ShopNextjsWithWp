import clsx from 'clsx';
import * as HeroIcons from '@heroicons/react/20/solid'
import { FeatureSection } from '@/app/5_entities/pages';
import DynamicHeroIcon from '@/app/6_shared/ui/DynamicHeroIcon';
import { ImageRemote } from '@/app/6_shared/ui/Images';


export function FeatureWithProductScreenshot({ data }: { data: FeatureSection }) {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">{data.subtitle}</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.title}</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                {data.text}
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {data.list.map((feature, index) => {
                                    return (
                                        <div key={index} className="relative pl-9">
                                            <dt className="inline font-semibold text-gray-900">
                                                <DynamicHeroIcon className='absolute left-1 top-1 h-5 w-5 text-indigo-600' icon={feature.heroicon_name}/>
                                            </dt>
                                            <dd className="inline">{feature.text}</dd>
                                        </div>
                                    );
                                }
                                )}
                            </dl>
                        </div>
                    </div>
                    <ImageRemote 
                        src={data.image}
                        width={2432}
                        height={1442}
                        className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                    />
                </div>
            </div>
        </div>
    );
}