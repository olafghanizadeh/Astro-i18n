import type { Lang } from './config';
import { translations, defaultLang } from './config';

// DX, type for interpolation parameters and functions
export type Interpolation = (params?: any) => string;

// Function to get the translations for a given language code
export function getTranslations(lang: Lang) {
    return translations[lang];
}

// Function to determine the language from the URL path (e.g., /en/ or /es/)
// use it in components no pages middleware, utilities
export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in translations) return lang as Lang;
    return defaultLang;
}

// Type to infer the parameters from a template string like "Hello {name}!"
type InferParams<T> = T extends `${string}{${infer P}}${infer R}`
  ? { [K in P | keyof InferParams<R>]: string | number }
  : {};

// Utility function to interpolate variables in translation strings
export function interpolate<T extends string>(template: T) {
    return (params?: InferParams<T>): string => {
        if (!params) return template;
        return template.replace(/{(\w+)}/g, (_, key) => {
            const p = params as Record<string, string | number | undefined>;
            return p[key] !== undefined ? String(p[key]) : _;
        });
    };
}
