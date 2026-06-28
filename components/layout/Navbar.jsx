'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'
import { WHATSAPP_BASE } from '@/utils/constants'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { settings } = useSettingsStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}`

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white border-b-2 border-primaryContainer py-3 shadow-sm' 
        : 'bg-white/95 backdrop-blur-md py-4 border-b border-outline-variant/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primaryContainer rounded-full flex items-center justify-center shadow-md shadow-primaryContainer/15 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-extrabold text-xl font-headline">R</span>
            </div>
            <div className="flex flex-col">
              <span className="text-onSurface font-extrabold text-lg lg:text-xl font-headline tracking-tight leading-none group-hover:text-primary transition-colors">Rehan NX</span>
              <span className="text-primaryContainer text-[10px] font-extrabold tracking-widest uppercase mt-0.5">Mobiles</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`relative py-2 font-bold font-headline text-sm transition-all duration-300 hover:text-primary ${
                    isActive ? 'text-primary' : 'text-onSurface/75'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </Link>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a 
              href={`tel:${settings?.phone1 || ''}`} 
              className="flex items-center gap-2 border-2 border-primaryContainer/85 text-primaryContainer font-headline text-xs font-extrabold uppercase px-6 py-2.5 rounded-full hover:bg-primaryContainer hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-headline text-xs font-extrabold uppercase px-6 py-2.5 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-green-500/10 hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden text-onSurface p-2 hover:bg-background rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-outline-variant/30 shadow-md">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className={`block font-headline font-bold text-base py-2 transition-colors ${
                    isActive ? 'text-primary' : 'text-onSurface/85 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-3">
              <a 
                href={`tel:${settings?.phone1 || ''}`} 
                className="flex items-center gap-2 border-2 border-primaryContainer/85 text-primaryContainer px-4 py-3 rounded-full justify-center transition-all hover:bg-primaryContainer/5"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-full justify-center transition-all hover:shadow-lg hover:shadow-green-500/15"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}