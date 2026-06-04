'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Heart } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'
import { useCategories } from '@/hooks/useCategories'
import { WHATSAPP_BASE } from '@/utils/constants'

export default function Footer() {
  const { settings } = useSettingsStore()
  const { categories } = useCategories()
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '923001234567'
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}`

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-yellow-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">R</span>
              </div>
              <div>
                <span className="font-bold text-xl">Rehan NX</span>
                <p className="text-gray-400 text-sm">Mobiles</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">Your trusted destination for genuine smartphones and accessories. Best prices guaranteed!</p>
            <div className="flex gap-3">
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:-translate-y-1">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-accent transition-colors inline-block hover:translate-x-1">Home</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-accent transition-colors inline-block hover:translate-x-1">Products</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-accent transition-colors inline-block hover:translate-x-1">Contact Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-accent transition-colors inline-block hover:translate-x-1">About Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat._id}>
                  <Link href={`/products?category=${cat.slug}`} className="text-gray-400 hover:text-accent transition-colors inline-block hover:translate-x-1">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              {settings?.address && (
                <li className="flex gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                  <span className="text-sm">{settings.address}</span>
                </li>
              )}
              {settings?.phone1 && (
                <li>
                  <a href={`tel:${settings.phone1}`} className="flex gap-3 text-gray-400 hover:text-accent">
                    <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                    <span className="text-sm">{settings.phone1}</span>
                  </a>
                </li>
              )}
              {settings?.whatsapp && (
                <li>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-gray-400 hover:text-green-400">
                    <MessageCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
                    <span className="text-sm">WhatsApp Chat</span>
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex gap-3 text-gray-400 hover:text-accent">
                    <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                    <span className="text-sm">{settings.email}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Rehan NX Mobiles. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by <span className="text-accent font-medium">Ahmed Khan</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}