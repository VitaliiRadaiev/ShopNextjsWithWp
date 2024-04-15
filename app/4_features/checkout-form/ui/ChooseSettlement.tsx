import { searchSettlementsAction } from "@/app/5_entities/nova-post";
import { useQueryAction } from "@/app/6_shared/hooks/hooks";
import { Input } from "@/app/6_shared/ui/FormFields/Input";
import { LoadingDots } from "@/app/6_shared/ui/LoadingDots/LoadingDots";
import clsx from "clsx";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface ChooseSettlementProps {
    setSettlement: Dispatch<SetStateAction<string | null>>;
    error?: string[];
}

export function ChooseSettlement({ setSettlement, error }: ChooseSettlementProps) {
    const [cityName, setCityName] = useState('');
    const [isSuggestsShow, setIsSuggestsShow] = useState(false);
    const [isSettlementSelected, setIsSettlementSelected] = useState(false);
    const callback = useCallback(async () => {
        return searchSettlementsAction({
            CityName: cityName,
            Limit: '150',
            Page: '1'
        })
    }, [cityName]);
    const { data: settlements, isLoading } = useQueryAction(callback);
    const isSettlements = settlements && !!settlements.data[0]?.Addresses.length && true || false;
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const onChangeHandler = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCityName(e.target.value);
    }, 300);

    const setSuggestsListHide = (e: MouseEvent) => {
        if (wrapperRef && !wrapperRef.current?.contains(e.target as Node)) {
            setIsSuggestsShow(false);

            if (!isSettlementSelected && inputRef.current) inputRef.current.value = '';
        }
    };

    useEffect(() => {
        document.addEventListener('click', setSuggestsListHide, false);
        return () => document.removeEventListener('click', setSuggestsListHide, false);
    }, [isSettlementSelected]);

    return (
        <div ref={wrapperRef} className="relative">
            <label className='block'>
                <span className='block text-dark leading-normal -tracking-wide mb-1'>
                    Город
                    <span className='text-rose-500'>*</span>
                </span>
                <Input
                    ref={inputRef}
                    type='text'
                    className={clsx(
                        {
                            'border-rose-500': error
                        }
                    )}
                    defaultValue={''}
                    name='settlement'
                    onFocus={() => setIsSuggestsShow(true)}
                    onChange={onChangeHandler}
                    placeholder='Введите населенный пункт Украины'
                    required
                    autoComplete="off"
                />
                {(cityName.length > 0) && !isSettlements && !isLoading &&
                    <div className='text-rose-500 text-[12px]'>
                        Город не найден, проверьте написаине
                    </div>
                }
                {error && <div className='text-rose-500 text-[12px]'>{...error}</div>}
            </label>
            {isSuggestsShow &&
                <>
                    {(cityName.length > 0) && isLoading &&
                        <div className='px-3 text-[12px] text-secondary absolute top-full left-0 w-full bg-white shadow-md z-10'>
                            <LoadingDots />
                        </div>
                    }
                    <ul className={clsx(
                        'absolute top-full left-0 w-full bg-white shadow-md z-10',
                        'overflow-y-auto max-h-[260px]'
                    )}>
                        {settlements && isSettlements && settlements.data[0].Addresses.map(settlement => {
                            return (
                                <li key={settlement.Ref}>
                                    <button
                                        type='button'
                                        className='px-3 py-2 transition hover:bg-slate-100 w-full text-start'
                                        onClick={() => {
                                            if (inputRef.current) {
                                                inputRef.current.value = settlement.Present;
                                            }
                                            setIsSettlementSelected(true);
                                            setIsSuggestsShow(false);
                                            setSettlement(settlement.Ref);
                                        }}
                                    >
                                        {settlement.Present}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </>
            }
        </div>
    );
}

