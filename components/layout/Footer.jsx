'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'
import { useCategories } from '@/hooks/useCategories'
import { WHATSAPP_BASE } from '@/utils/constants'

export default function Footer() {
  const { settings } = useSettingsStore()
  const { categories } = useCategories()
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}`

  return (
    <footer className="bg-white text-onSurface border-t border-outline-variant/30">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primaryContainer rounded-full flex items-center justify-center">
                <span className="text-white font-extrabold text-2xl font-headline">R</span>
              </div>
              <div>
                <span className="font-extrabold text-xl font-headline text-onSurface">Rehan NX</span>
                <p className="text-primaryContainer text-xs font-extrabold tracking-widest uppercase">Mobiles</p>
              </div>
            </Link>
            <p className="text-mutedText mb-6 text-sm leading-relaxed font-sans">Your trusted destination for genuine smartphones and accessories in India. Best prices guaranteed!</p>
            <div className="flex gap-3">
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background text-primaryContainer rounded-full flex items-center justify-center hover:bg-primaryContainer hover:text-white transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background text-primaryContainer rounded-full flex items-center justify-center hover:bg-primaryContainer hover:text-white transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-extrabold text-lg font-headline mb-6 text-onSurface">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-mutedText hover:text-primary transition-colors inline-block hover:translate-x-1 font-headline font-bold text-sm">Home</Link></li>
              <li><Link href="/products" className="text-mutedText hover:text-primary transition-colors inline-block hover:translate-x-1 font-headline font-bold text-sm">Products</Link></li>
              <li><Link href="/contact" className="text-mutedText hover:text-primary transition-colors inline-block hover:translate-x-1 font-headline font-bold text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-extrabold text-lg font-headline mb-6 text-onSurface">Categories</h3>
            <ul className="space-y-3">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat._id}>
                  <Link href={`/products?category=${cat.slug}`} className="text-mutedText hover:text-primary transition-colors inline-block hover:translate-x-1 font-headline font-bold text-sm">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-extrabold text-lg font-headline mb-6 text-onSurface">Contact Us</h3>
            <ul className="space-y-4">
              {settings?.address && (
                <li className="flex gap-3 text-mutedText">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primaryContainer" />
                  <span className="text-sm font-sans">{settings.address}</span>
                </li>
              )}
              {settings?.phone1 && (
                <li>
                  <a href={`tel:${settings.phone1}`} className="flex gap-3 text-mutedText hover:text-primary">
                    <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-primaryContainer" />
                    <span className="text-sm font-sans">{settings.phone1}</span>
                  </a>
                </li>
              )}
              {settings?.whatsapp && (
                <li>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-mutedText hover:text-primary">
                    <MessageCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
                    <span className="text-sm font-sans">WhatsApp Chat</span>
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex gap-3 text-mutedText hover:text-primary">
                    <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-primaryContainer" />
                    <span className="text-sm font-sans">{settings.email}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center items-center gap-1 text-mutedText text-sm font-sans">
            <span>Made by ©</span>
            <a
              href="https://ahmed.nexcoreinstitute.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-300"
            >
              Ahmed khan
            </a>
            <span>. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}