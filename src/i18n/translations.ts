// translations.ts
export interface SiteTranslation
{
    brand: string;
    tagline: string;
}

export interface HeroTranslation
{
    title: string;
    subtitle: string;
}

export interface Translation
{
    site: SiteTranslation;
    hero: HeroTranslation;
}