import { es } from './locales/es';
import { en } from './locales/en';

// Translations for each supported language
export const translations = {
  es,
  en,
  // ...add more languages here as needed
} as const;


// Type of the supported languages
export type Lang = keyof typeof translations;

// Default language to use when no specific language is detected
export const defaultLang: Lang = 'en';
