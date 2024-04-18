'use client';

import { AttributeType, CategoryType, TagType } from '@/app/5_entities/categories';
import { Checkbox } from '@/app/6_shared/ui/FormFields/Checkbox';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Slider } from '@mui/base/Slider';
import { Button } from '@/app/6_shared/ui/Buttons/Button';
import { CatalogLoadingStateContext } from '@/app/5_entities/catalog';


interface FilterProps {
    attributes: AttributeType[];
    priceRange: {
        lowestPrice: number;
        highestPrice: number;
    },
    tags: TagType[];
}

const boxStyles = 'px-4 py-3 border-b border-slate-300 last:border-none flex flex-col gap-2'

export function Filter({ attributes, priceRange, tags }: FilterProps) {
    const searchParams = useSearchParams() || '';
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const { setState: setIsLoading } = useContext(CatalogLoadingStateContext);

    const startValue = params.get('minPrice') || priceRange.lowestPrice;
    const endValue = params.get('maxPrice') || priceRange.highestPrice;
    const [priceValues, setPriceValues] = useState<number[]>([+startValue, +endValue]);

    return (
        <form className='lg:bg-[#e9e9e9] rounded'>
            <div className={clsx(boxStyles)}>
                <h3 className=' text-[18px] font-bold text-[#3d4d66]'>Фильтр по параметрам</h3>
            </div>
            <div className={clsx(boxStyles)}>
                <RangeSlider priceRange={priceRange} value={priceValues} setValue={setPriceValues} />
            </div>
            <div className={clsx(boxStyles)}>
                <Checkbox
                    defaultChecked={!!params.get('inStock')}
                    onChange={(e) => {
                        if (e.target.checked) {
                            params.set('inStock', '1');
                            params.set('page', '1');
                        } else {
                            params.delete('inStock');
                            params.set('page', '1');
                        }
                        setIsLoading(true);
                        replace(`${pathname}?${params.toString()}`, {
                            scroll: false
                        });
                    }}
                >
                    Есть в наличии
                </Checkbox>
            </div>

            <FilterTags tags={tags} />

            {attributes.map(attribute => {
                return (
                    <FilterGroup key={attribute.id} attribute={attribute} />
                );
            })}
            <div className={clsx(boxStyles)}>
                <Button
                    type='reset'
                    className='w-full'
                    onClick={() => {
                        setPriceValues([priceRange.lowestPrice, priceRange.highestPrice]);
                        setIsLoading(true);
                        replace(`${pathname}`, {
                            scroll: false
                        })
                    }}
                >
                    Сбросить
                </Button>
            </div>
        </form>
    );
}

interface FilterTagsProps {
    tags: TagType[];
}

function FilterTags({ tags }: FilterTagsProps) {
    const searchParams = useSearchParams() || '';
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const { setState: setIsLoading } = useContext(CatalogLoadingStateContext);


    
    const handleFilter = (toggle: boolean, id: string) => {
        let tags = Array.from(params.get('tags') ? JSON.parse(params.get('tags') as string) : []);

        if (toggle) {
            tags.push(id);
        } else {
            tags = tags.filter(tag => tag !== id);
        }

        params.set('page', '1');
        params.set('tags', JSON.stringify(tags));
        replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
        setIsLoading(true);
    }

    return (
        <div className={clsx(boxStyles)}>
            <h4 className='text-[16px] font-bold text-[#3d4d66]'>По тегам</h4>
            {tags.map(tag => {
                return (
                    <Checkbox
                        key={tag.databaseId}
                        defaultChecked={
                            params.get('tags')
                                ? Array.from(JSON.parse(params.get('tags') as string)).includes(String(tag.databaseId))
                                : false
                        }
                        onChange={(e) =>
                            handleFilter(
                                e.target.checked,
                                String(tag.databaseId)
                            )}
                    >
                        {tag.name}
                    </Checkbox>
                );
            })}
        </div>
    );
}

interface FilterGroupProps {
    attribute: AttributeType
}
interface Filter {
    taxonomy: string,
    terms: string[]
}
function FilterGroup({ attribute }: FilterGroupProps) {
    const searchParams = useSearchParams() || '';
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const { setState: setIsLoading } = useContext(CatalogLoadingStateContext);


    const filters = params.get('filters');
    const parsedFilters: Filter[] = Array.from(filters ? JSON.parse(filters) : []);

    const handleFilter = (checked: boolean, taxonomyName: string, id: string) => {
        let filters = new Set<Filter>(params.get('filters') ? Array.from(JSON.parse(params.get('filters') as string)) : []);

        if (checked) {
            const filterItem = Array.from(filters.values()).find(f => f.taxonomy === taxonomyName);
            if (filterItem) {
                filterItem.terms.push(id);
                filters.add(filterItem);
            } else {
                filters.add({ taxonomy: taxonomyName, terms: [id] })
            }
        } else {
            const filterItem = Array.from(filters.values()).find(f => f.taxonomy === taxonomyName);
            if (filterItem) {
                filterItem.terms = filterItem.terms.filter(t => t !== id);

                filterItem.terms.length ? filters.add(filterItem) : filters.delete(filterItem)
            }
        }

        params.set('page', '1');
        params.set('filters', JSON.stringify(Array.from(filters.keys())));
        replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
        setIsLoading(true);
    }

    return (
        <div key={attribute.id} className={clsx(boxStyles)}>
            <h4 className='text-[16px] font-bold text-[#3d4d66]'>{attribute.label}</h4>
            {attribute.terms.nodes.map((value) => {
                const isChecked = parsedFilters.find((item => item.taxonomy === attribute.name))
                    ?.terms.includes(String(value.databaseId));

                return (
                    <Checkbox
                        key={value.id}
                        defaultChecked={!!isChecked}
                        onChange={(e) =>
                            handleFilter(
                                e.target.checked,
                                attribute.name,
                                String(value.databaseId)
                            )}
                    >
                        {value.name}
                    </Checkbox>
                );
            })}

        </div>
    );
}

interface RangeSliderProps {
    priceRange: FilterProps['priceRange'];
    value: number[];
    setValue: Dispatch<SetStateAction<number[]>>
}

function RangeSlider({ priceRange, value, setValue }: RangeSliderProps) {
    const searchParams = useSearchParams() || '';
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const { setState: setIsLoading } = useContext(CatalogLoadingStateContext);


    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleFilter = () => {
        params.set('minPrice', String(value[0]));
        params.set('maxPrice', String(value[1]));
        params.set('page', '1');

        setIsLoading(true);

        replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
    }

    return (
        <div>
            <div className='grid grid-cols-[1fr_1fr_auto] gap-2 mb-4'>
                <input
                    type="text"
                    value={value[0]}
                    onChange={(e) => setValue(prev => {
                        const targetValue = e.target.value.replace(/[^0-9]/g, '');
                        const value = Number(targetValue) > prev[1] ? prev[1] : Number(targetValue);
                        return [value, prev[1]]
                    })}
                    className='h-8 w-full'
                />
                <input
                    type="text"
                    value={value[1]}
                    onChange={(e) => setValue(prev => {
                        const targetValue = e.target.value.replace(/[^0-9]/g, '');
                        const value = Number(targetValue) < prev[0] ? prev[0] : Number(targetValue);
                        return [prev[0], value]
                    })}
                    className='h-8 w-full'
                />
                <Button
                    className='!h-8 !min-h-8 !px-3'
                    onClick={handleFilter}
                    type='button'
                >Ok
                </Button>
            </div>
            <Slider
                value={value}
                onChange={handleChange}
                min={priceRange.lowestPrice}
                max={priceRange.highestPrice}
                className={clsx(
                    'my-4 h-[3px] text-secondary relative block w-full',
                    '[&_.base-Slider-rail]:absolute [&_.base-Slider-rail]:h-full [&_.base-Slider-rail]:w-full',
                    '[&_.base-Slider-rail]:bg-current [&_.base-Slider-rail]:opacity-30 [&_.base-Slider-rail]:block',
                    '[&_.base-Slider-track]:absolute [&_.base-Slider-track]:h-full [&_.base-Slider-track]:block',
                    '[&_.base-Slider-track]:bg-current',
                    '[&_.base-Slider-thumb]:absolute [&_.base-Slider-thumb]:w-5 [&_.base-Slider-thumb]:h-5',
                    '[&_.base-Slider-thumb]:rounded-full [&_.base-Slider-thumb]:bg-current',
                    '[&_.base-Slider-thumb]:top-1/2 [&_.base-Slider-thumb]:-translate-y-1/2 [&_.base-Slider-thumb]:-translate-x-1/2'
                )}
            />
        </div>
    );
}
