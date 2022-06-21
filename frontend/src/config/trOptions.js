import config from './config'

export default {
    supportedLngs: ['en', 'ua', 'ru'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
        order: ['path', 'localStorage', 'htmlTag'],
        caches: ['localStorage'],
    },
    // react: { useSuspense: false },
    backend: {
        loadPath: `${config.cleanUrl}/assets/locales/{{lng}}/translation.json`,
    },
}

export const languages = [
    {
        code: 'en',
        name: 'English',
        country_flag: '🇬🇧',
    },
    {
        code: 'ua',
        name: 'Українська',
        country_flag: '🇺🇦',
    },
    // {
    //     code: 'ru',
    //     name: 'Русский',
    //     country_flag: '🇷🇺',
    // },
]
