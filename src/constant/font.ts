import { Manrope, Space_Mono } from 'next/font/google'

export const manrope = Manrope({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-manrope',
})
export const space_mono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-spacemono',
})
