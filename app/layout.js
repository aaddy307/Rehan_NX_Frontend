import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const headline = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-headline' })

export const metadata = {
  title: {
    default: 'Rehan NX Mobiles | Best Mobile Phone Deals',
    template: '%s | Rehan NX Mobiles',
  },
  description: 'Your trusted mobile store with the latest smartphones, best prices, and easy EMI options. Shop Apple, Samsung, Vivo, Oppo, Xiaomi and more.',
  keywords: ['mobile phones', 'smartphones', 'electronics', 'EMI', 'best prices'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${headline.variable}`}>
      <body className={`${inter.className} bg-background text-onSurface`}>
        {children}
        <Toaster position="top-right" toastOptions={{ style: { background: '#ffffff', color: '#1a1c1d', border: '1px solid #e9bcb7' } }} />
      </body>
    </html>
  )
}