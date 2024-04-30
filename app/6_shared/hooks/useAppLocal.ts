import i18nConfig, { type Locale } from '@/public/i18nConfig';
import { useCurrentLocale } from 'next-i18n-router/client';

export function useAppLocal() {
    const currentLocal = useCurrentLocale(i18nConfig);

    return currentLocal;
}