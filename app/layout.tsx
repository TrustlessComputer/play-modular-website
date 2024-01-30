import '@/styles/style.scss'
import { Metadata, Viewport } from 'next'
import Layout from '@/layouts'
import { manrope, space_mono } from '@/constant/font'
import StoreProvider from '@/providers/store'
import Web3Auth from '@/hocs/Web3Auth'

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN_URL}`),
  icons: {
    icon: [{ url: `/icons/favicon.ico` }],
    apple: [{ url: `/icons/favicon.ico` }],
  },
  manifest: '/icons/site.webmanifest',
  title: 'Modular',
  description: 'Playing with Lego at BVM network.',
  openGraph: {
    images: [`/imgs/metadata.jpg`],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#101010',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      <body className={`${manrope.variable} ${space_mono.variable}`}>
        <StoreProvider>
          <Layout>
            <Web3Auth>{children}</Web3Auth>
          </Layout>
        </StoreProvider>
      </body>
    </html>
  )
}
