import { IBM_Plex_Sans, Roboto } from 'next/font/google';

export const ibm_plex_sans = IBM_Plex_Sans({
    subsets: ['cyrillic'],
    weight: ['300', '400', '600', '700'],
    display: 'swap',
    variable: '--ibm_plex_sans',
    style: ['italic', 'normal']
});

export const roboto = Roboto({
    subsets: ['cyrillic', 'latin'],
    weight: ['400', '700'],
    display: 'swap',
    variable: '--roboto',
    style: ['italic', 'normal']
})