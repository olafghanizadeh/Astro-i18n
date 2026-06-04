# Astro i18n

A lightweight, typed i18n starter for Astro.

Use it as a reference implementation or copy the `src/i18n` module directly into your own project and extend it as needed.

The UI is intentionally minimal so the focus stays on the translation structure, routing, and type-safe interpolation.

It also includes helper functions for loading translations and interpolating values.

## Structure

```txt
src/i18n/
  index.ts      # Public module exports
  config.ts     # Available languages and default language
  schema.ts     # Translation contract
  utils.ts      # Translation helpers
  locales/      # Locale dictionaries
```

## Features

- Typed locale dictionaries with `satisfies`.
- Central language registry.
- Type-safe interpolation: TypeScript reports missing or extra placeholders when translations differ between locales.
- Default language redirect from `/`.
- Static routes generated from available translations.
- Simple interpolation helper for values like `{name}`.

## Usage

Start by defining the shape of your translations in `src/i18n/schema.ts`.

```ts
export interface Translations {
  site: {
    brand: string;
    tagline: string;
  };
  hero: {
    title: string;
    description: Interpolation;   // type for interpolated strings
  };
}
```

Then create one file per locale inside `src/i18n/locales/`, for example `src/i18n/locales/en.ts`.

```ts
import type { Translations } from '../schema';
import { interpolate } from '../utils';

export const en = {
  site: {
    brand: 'Jhon',
    tagline: 'Do more',
  },
  hero: {
    title: 'Welcome',
    description: interpolate('Hello {name}!'),
  },
} satisfies Translations;
```

> [!TIP]
> If the placeholders inside `interpolate(...)` are not consistent across all locale files, TypeScript will flag every `.astro` file that uses that translation with a missing or extra parameter. This keeps all locales in sync automatically.
>
> ```ts
> // en.ts
> someVariable: interpolate('Test {foo} and {bar}')
>
> // es.ts (unexpected placeholder: {asd})
> someVariable: interpolate('Test {foo} and {bar}. {asd}')
> ```
> ```astro
> ---
> const text = hero.someVariable({ foo: 'a', bar: 'b' });
> ---
> ```
>
> ```astro
> <p>{hero.someVariable({ foo: 'a', bar: 'b' })}</p>
>```
> ```txt
> ❌ Property 'asd' is missing in type ...
> ```
> TypeScript expects {foo, bar, asd} because es.ts requires it


Register the locale in `src/i18n/config.ts`. And define your default language.

```ts
import { en } from './locales/en';
import { es } from './locales/es';

export const languages = {
  en,
  es,
  // ...add here
} as const;

...

export const defaultLang: Lang = 'en';
```

Import the public i18n entrypoint inside an Astro page or component. `getTranslations(lang)` loads the translations for the current language.

```astro
---
import { getTranslations, getLangFromUrl, translations } from '../../i18n';

// Get the language from the URL params (e.g. /en)
const lang = getLangFromUrl(Astro.url);

const { hero } = getTranslations(lang);
---

<h1>{hero.title}</h1>
<p>{hero.description({ name: 'Astro' })}</p>
```

For localized Astro pages, define a dynamic route segment `[lang]` (e.g. `src/pages/[lang]/index.astro`). This will generate one static page per locale.

```ts
import { languages } from '../../i18n';

export function getStaticPaths() {
  return Object.keys(languages).map((lang) => ({ params: { lang } }));
}
```