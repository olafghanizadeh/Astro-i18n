import { es } from './locales/es';
import { en } from './locales/en';

// Translations for each supported language
export const languages = {
  es,
  en,
  // ...add more languages here as needed
} as const;


// Supported language codes
export type Lang = keyof typeof languages;

// Fallback language
export const defaultLang: Lang = 'en';
