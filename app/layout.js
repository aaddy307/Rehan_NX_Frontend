import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" toastOptions={{ style: { background: '#1a1a2e', color: '#fff' } }} />
      </body>
    </html>
  )
}