"use client";

import React, { JSX, useState } from 'react';
import clsx from 'clsx';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface StarsProps {
    clickable: boolean;
    startValue: number;
}

export function Stars({ clickable, startValue }: StarsProps): JSX.Element {
    const [selectedValue, setSelectedValue] = useState(startValue);
    const values = numberToArray(selectedValue);

    return (
        <div
            className={clsx(
                'flex gap-[0.2em]',
                {
                    'pointer-events-none': !clickable
                }
            )}
        >
            <input type="hidden" name='stars' defaultValue={selectedValue} />
            {Array.from(Array(5).keys()).map((i) => {
                const value = Math.round(100 * values[i]);

                return (
                    <div
                        key={i}
                        className='relative cursor-pointer transition-colors text-secondary hover:text-secondary-light [&_.star-solid]:hover:!w-full'
                        onClick={() => setSelectedValue(i + 1)}
                    >
                        <StarOutlineIcon className='h-[1em] w-auto' />
                        <div className='star-solid overflow-hidden w-full h-full absolute z-3 top-0 left-0' style={{ width: `${value}%` }}>
                            <StarSolidIcon className='h-[1em] w-auto' />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function numberToArray(num: number) {
    const integerPart = Math.floor(num);
    const decimalPart = num - integerPart;

    const result = [];

    for (let i = 0; i < integerPart; i++) {
        result.push(1);
    }

    if (decimalPart !== 0) {
        result.push(decimalPart);
    }

    const remainingZeros = 5 - result.length;

    for (let i = 0; i < remainingZeros; i++) {
        result.push(0);
    }

    return result;
}