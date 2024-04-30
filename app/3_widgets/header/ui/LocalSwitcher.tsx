"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import i18nConfig, { type Locale } from '@/public/i18nConfig';
import clsx from "clsx";
import { useCurrentLocale } from 'next-i18n-router/client';

export function LocaleSwitcher() {
    const currentLocal = useCurrentLocale(i18nConfig);
    const pathName = usePathname();
    const redirectedPathName = (locale: Locale) => {
        if (!pathName) return "/";
        const segments = pathName.split("/");
        const isLocalSlug = i18nConfig.locales.includes(segments[1]);
        isLocalSlug ? segments[1] = locale : segments.splice(1,0,locale);
        return segments.join("/");
    };

    return (
        <div>
            <ul className="text-slate-300 flex gap-1 uppercase">
                {i18nConfig.locales.map((locale) => {
                    return (
                        <li key={locale}>
                            <Link
                                href={redirectedPathName(locale)}
                                className={clsx({
                                    'text-secondary-light': currentLocal === locale
                                })}
                            >{locale}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}