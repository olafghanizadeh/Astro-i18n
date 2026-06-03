import { es } from './locales/es';
import { en } from './locales/en';

// Translations for each supported language
export const translations = {
  es,
  en,
  // ...add more languages here as needed
} as const;


// Supported language codes
export type Lang = keyof typeof translations;

// Fallback language
export const defaultLang: Lang = 'en';
