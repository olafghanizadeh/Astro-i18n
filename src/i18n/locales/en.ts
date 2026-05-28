import type { Translation } from '../interfaces/translations';
import { interpolate } from '../utils';

export const en =
{
    site:
    {
        brand: 'Braco',
        tagline: 'Do more'
    },

    hero:
    {
        title: 'Welcome',
        subtitle: 'Build fast',
        description: interpolate('Hello {name}! Welcome to our website.'),
        othervar: interpolate('Test {foo} and {bar}')
    }
} satisfies Translation;