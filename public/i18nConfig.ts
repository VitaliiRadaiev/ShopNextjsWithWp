const i18nConfig = {
    locales: ['en', 'ru'],
    defaultLocale: 'ru'
};

export type Locale = (typeof i18nConfig)["locales"][number];

export default i18nConfig