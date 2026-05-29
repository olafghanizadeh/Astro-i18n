import type { Translations } from '../schema';
import { interpolate } from '../utils';

export const en =
{
    site:
    {
        brand: 'My Brand',
        tagline: 'Do more'
    },

    hero:
    {
        title: 'Welcome',
        subtitle: 'Build fast',
        description: interpolate('Hello {name}! Welcome to our website.'),
        othervar: interpolate('Test {foo} and {bar}'), 
    },

    about:
    {
        title: 'About',
        description: 'This page demonstrates a simple localized route powered by the same i18n module.'
    }
} satisfies Translations;
