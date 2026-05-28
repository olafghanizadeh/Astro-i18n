import { es } from './locales/es';
import { en } from './locales/en';

export const DEFAULT_LANG = 'en';

export const langs =
{
    es,
    en
};

export type Lang = keyof typeof langs;

export function getTranslations(lang: Lang)
{
    return langs[lang];
}