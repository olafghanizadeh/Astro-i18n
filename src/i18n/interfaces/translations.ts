// This file defines the structure of the translation data for the site.

// Each section of the site (e.g., site-wide, hero section, etc.) has its own interface.
interface SiteTranslation
{
    brand: string;
    tagline: string;
}

interface HeroTranslation
{
    title: string;
    subtitle: string;
    description: (params?: any) => string;
    othervar: (params?: any) => string;
}

/*
 * Add more translation interfaces as needed for other parts of the site,
 * then include them in the main Translation interface.
 */


// Main translation interface, includes all the different sections of the site
export interface Translation
{
    site: SiteTranslation;
    hero: HeroTranslation;
}