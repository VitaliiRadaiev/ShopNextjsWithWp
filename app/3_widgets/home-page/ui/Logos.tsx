"use client";

import React, { JSX } from 'react';
import clsx from 'clsx';
import gridTexture from '@/public/images/grid.png';

import Logo1 from '@/public/logos/ticker-logo-1.svg';
import Logo2 from '@/public/logos/ticker-logo-2.svg';
import Logo3 from '@/public/logos/ticker-logo-3.svg';
import Logo4 from '@/public/logos/ticker-logo-4.svg';
import Logo5 from '@/public/logos/ticker-logo-5.svg';
import Logo6 from '@/public/logos/ticker-logo-6.svg';
import Logo7 from '@/public/logos/ticker-logo-7.svg';
import Logo8 from '@/public/logos/ticker-logo-8.svg';
import Logo9 from '@/public/logos/ticker-logo-9.svg';

const logos = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo8, Logo9];

export function Logos(): JSX.Element {

    return (
        <section
            style={{ backgroundImage: `url('${gridTexture.src}')` }}
            className={clsx(
                ''
            )}
        >
            <div className="container relative z-2 py-6 lg:py-10">
                <ul
                    className={clsx(
                        "flex flex-wrap gap-y-4 lg:gap-y-6 justify-evenly lg:gap-x-4"
                    )}
                >
                    {logos.map((logo, i) => {
                        const Logo = logo;
                        return (
                            <li
                                key={i}
                                className={clsx(
                                    "basis-[144px] p-4 flex items-center justify-center",
                                    "md:basis-[200px]"
                                )}
                            >
                                <Logo className="w-auto h-auto max-h-full max-w-full" />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    );
}