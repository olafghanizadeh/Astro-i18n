// This file defines the structure of the translation data for the site.
import type { Interpolation } from './utils';

interface AboutTranslation
{
    title: string;
    description: string;
}

/*
 * Add more translation interfaces as needed for other parts of the site,
 * then include them in the main Translations interface.
 */


// Main translation interface
// includes all the sections of the site
export interface Translations
{
    site:
    {
        brand: string;
        tagline: string;
    };

    hero:
    {
        title: string;
        subtitle: string;
        description: Interpolation;
        othervar: Interpolation;
    };

    about: AboutTranslation;
}
