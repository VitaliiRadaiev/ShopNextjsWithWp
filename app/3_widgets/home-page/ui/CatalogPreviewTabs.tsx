'use client';

import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import { ReactNode } from 'react';

import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface CatalogPreviewTabsProps {
    slotTitle: ReactNode;
    categoryId: string;
    slotCatalogPreviewNew: ReactNode;
    slotCatalogPreviewRecommended: ReactNode;
    slotCatalogPreviewPromotion: ReactNode;
}

export function CatalogPreviewTabs({
    slotTitle,
    categoryId,
    slotCatalogPreviewNew,
    slotCatalogPreviewRecommended,
    slotCatalogPreviewPromotion
}: CatalogPreviewTabsProps) {

    return (
        <section className="mt-9 lg:mt-14" >
            <div className="container">
                {slotTitle}

                <Tabs defaultValue={0}>
                    <TabsList className='mt-5 flex flex-wrap gap-6'>
                        <Tab
                            value={0}
                            slotProps={{
                                root: (ownerState) => {
                                    return {
                                        className: clsx(
                                            'text-[20px] leading-snug text-secondary -tracking-wide pb-1 transition-colors hover:text-slate-700 border-b-2 border-transparent',
                                            {
                                                "text-slate-700 !border-secondary": ownerState.selected
                                            }
                                        ),
                                    };
                                },
                            }}
                        >
                            Новинка
                        </Tab>
                        <Tab
                            value={1}
                            slotProps={{
                                root: (ownerState) => {
                                    return {
                                        className: clsx(
                                            'text-[20px] leading-snug text-secondary -tracking-wide pb-1 transition-colors hover:text-slate-700 border-b-2 border-transparent',
                                            {
                                                "text-slate-700 !border-secondary": ownerState.selected
                                            }
                                        ),
                                    };
                                },
                            }}
                        >
                            Рекомендуем
                        </Tab>
                        <Tab
                            value={2}
                            slotProps={{
                                root: (ownerState) => {
                                    return {
                                        className: clsx(
                                            'text-[20px] leading-snug text-secondary -tracking-wide pb-1 transition-colors hover:text-slate-700 border-b-2 border-transparent',
                                            {
                                                "text-slate-700 !border-secondary": ownerState.selected
                                            }
                                        ),
                                    };
                                },
                            }}
                        >
                            Акция
                        </Tab>
                    </TabsList>
                    <div className="mt-4">
                        <TabPanel value={0}>
                            <div>
                                {slotCatalogPreviewNew}
                            </div>
                        </TabPanel>
                        <TabPanel value={1}>
                            <div>
                                {slotCatalogPreviewRecommended}
                            </div>
                        </TabPanel>
                        <TabPanel value={2}>
                            <div>
                                {slotCatalogPreviewPromotion}
                            </div>
                        </TabPanel>
                    </div>
                </Tabs>

                <div className='mt-5 lg:mt-10'>
                    <Link
                        href={'/catalog/' + categoryId}
                        className={clsx(
                            'flex items-center justify-center gap-2 bg-white h-12 rounded border border-slate-300',
                            'transition-shadow hover:shadow-[0_0_15px] hover:shadow-slate-300'
                        )}
                    >
                        <PlusIcon className='h-[1em] w-auto' />
                        Показать ещё
                    </Link>
                </div>
            </div>
        </section>
    );
}
