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
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="font-bold text-lg">Rehan NX Mobiles</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Your trusted mobile store with best deals on smartphones and accessories.</p>
            <div className="flex gap-3">
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-accent transition-colors">Products</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat._id}>
                  <Link href={`/products?category=${cat.slug}`} className="text-gray-400 hover:text-accent transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              {settings?.address && (
                <li className="flex gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">{settings.address}</span>
                </li>
              )}
              {settings?.phone1 && (
                <li>
                  <a href={`tel:${settings.phone1}`} className="flex gap-2 text-gray-400 hover:text-accent">
                    <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-sm">{settings.phone1}</span>
                  </a>
                </li>
              )}
              {settings?.whatsapp && (
                <li>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex gap-2 text-gray-400 hover:text-accent">
                    <MessageCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex gap-2 text-gray-400 hover:text-accent">
                    <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-sm">{settings.email}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Rehan NX Mobiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}