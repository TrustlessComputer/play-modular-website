import '@/styles/style.scss'
import {Metadata} from 'next'
import Layout from '@/layouts'
import {manrope, space_mono} from '@/constant/font'
import StoreProvider from "@/providers/store";

export const metadata: Metadata = {
  icons: {
    icon: [{url: `/icons/favicon.ico`}],
    apple: [{url: `/icons/favicon.ico`}],
  },
  manifest: '/icons/site.webmanifest',
  themeColor: '#101010',
  title: 'Modular',
  description: 'Playing with Lego at BVM network.',
  openGraph: {
    images: [`/imgs/metadata.jpg`],
  },
}

export default function RootLayout({children}) {
  return (
    <html lang='en' className='antialiased'>
      <body className={`${manrope.variable} ${space_mono.variable}`}>
      <StoreProvider>
        <Layout>
          {children}
        </Layout>
      </StoreProvider>
      </body>
    </html>
  )
}
