import type { Translation } from '../types/translations';
import { interpolate } from '../utils';

export const es =
{
    site:
    {
        brand: 'Braco',
        tagline: 'Haz más'
    },

    hero:
    {
        title: 'Bienvenido',
        subtitle: 'Construye rápido',
        description: interpolate('¡Hola {name}! Bienvenido a nuestro sitio web.'),
        othervar: interpolate('Prueba {foo} y {bar}')
    }
} satisfies Translation;