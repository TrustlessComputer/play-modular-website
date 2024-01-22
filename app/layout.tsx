import '@/styles/style.scss'
import { CDN_URL_IMAGES } from '@/modules/constant'
import { Metadata } from 'next'
import Layout from '@/layouts'
import { manrope, space_mono } from '@/constant/font'

export const metadata: Metadata = {
  icons: {
    icon: [{ url: `${CDN_URL_IMAGES}/logo.svg` }],
    apple: [{ url: `${CDN_URL_IMAGES}/logo.svg` }],
  },
  themeColor: '#101010',
  title: 'New Bitcoin City',
  description: 'New Bitcoin City is a radically new way to explore Bitcoin.',
  openGraph: {
    images: [`${CDN_URL_IMAGES}/New%20Bitcoin%20City.jpg`],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      <head />
      <body className={`${manrope.variable} ${space_mono.variable}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
