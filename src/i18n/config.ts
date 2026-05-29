import { es } from './locales/es';
import { en } from './locales/en';

// Object containing the translations for each supported language
export const languages = {
  es,
  en,
  // ...add more languages here as needed
} as const;


// Type of the keys of the languages object, which are the supported language codes
export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';
