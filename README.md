# Astro i18n

An internationalization setup for Astro using a lightweight, typed i18n module for organizing translations.

The project keeps the UI intentionally simple so the translation structure stays easy to inspect, extend, and reuse.

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
- Default language redirect from `/`.
- Static routes generated from available translations.
- Simple interpolation helper for values like `{name}`.
- Type-safe interpolation: TypeScript warns at the call site in `.astro` files if placeholders differ between locales.

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
    description: Interpolation;
  };
}
```

Then create one file per locale inside `src/i18n/locales/`, for example `src/i18n/locales/en.ts`.

```ts
import type { Translations } from '../schema';
import { interpolate } from '../utils';

export const en = {
  site: {
    brand: 'Braco',
    tagline: 'Do more',
  },
  hero: {
    title: 'Welcome',
    description: interpolate('Hello {name}!'),
  },
} satisfies Translations;
```

> **Tip:** If the placeholders inside `interpolate(...)` are not consistent across all locale files, TypeScript will flag every `.astro` file that uses that translation with a missing or extra parameter. This keeps all locales in sync automatically.
>
> ```ts
> // en.ts — contains {foo} and {bar}
> othervar: interpolate(‘Test {foo} and {bar}’)
>
> // es.ts — contains {foo}, {bar}, and {asd}
> othervar: interpolate(‘Test {foo} and {bar} {asd}’)
> ```
> ```astro
> // in /index.astro
> ---
> const text = t.hero.othervar({ foo: 'a', bar: 'b' })
> ---
>
> // or inside html
> <p>{hero.othervar({ foo: 'a', bar: 'b' })}</p>
>
> ❌ Error [Property 'asd' is missing in type...]
> TypeScript expects {foo, bar, asd} because es.ts requires it
> ```

Register the locale in `src/i18n/config.ts`. And define your defalut lang

```ts
import { en } from './locales/en';
import { es } from './locales/es';

export const translations = {
  en,
  es,
  // ...add here
} as const;

...

export const defaultLang: Lang = 'en';
```

Import the public i18n entrypoint inside an Astro page or component.

```astro
---
import { getTranslations, type Lang } from '../i18n';

const { hero } = getTranslations(lang as Lang);
---

<h1>{hero.title}</h1>
<p>{hero.description({ name: 'Astro' })}</p>
```

For localized Astro pages, define a dynamic route segment `[lang]` (e.g. `src/pages/[lang]/index.astro`). This will generate one static static page per locale.

```ts
import { translations } from '../../i18n';

export function getStaticPaths() {
  return Object.keys(translations).map((lang) => ({ params: { lang } }));
}
```
