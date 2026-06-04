'use client'

import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'
import { WHATSAPP_BASE } from '@/utils/constants'

export default function ContactSection() {
  const { settings } = useSettingsStore()
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}`

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">Get in Touch</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
              <div className="space-y-4">
                {settings?.address && (
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-1" />
                    <span className="text-gray-600">{settings.address}</span>
                  </div>
                )}
                {settings?.phone1 && (
                  <a href={`tel:${settings.phone1}`} className="flex gap-3 hover:text-accent">
                    <Phone className="w-5 h-5 text-accent mt-1" />
                    <span className="text-gray-600">{settings.phone1}</span>
                  </a>
                )}
                {settings?.whatsapp && (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-accent">
                    <MessageCircle className="w-5 h-5 text-accent mt-1" />
                    <span className="text-gray-600">WhatsApp: {settings.whatsapp}</span>
                  </a>
                )}
                {settings?.email && (
                  <a href={`mailto:${settings.email}`} className="flex gap-3 hover:text-accent">
                    <Mail className="w-5 h-5 text-accent mt-1" />
                    <span className="text-gray-600">{settings.email}</span>
                  </a>
                )}
              </div>
              <div className="flex gap-3 mt-6">
                {settings?.facebook && (
                  <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {settings?.instagram && (
                  <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm min-h-[300px]">
            {settings?.mapUrl ? (
              <iframe src={settings.mapUrl} width="100%" height="100%" style={{ border: 0, minHeight: '300px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Store Location" />
            ) : (
              <div className="w-full h-full min-h-[300px] bg-gray-100 flex items-center justify-center">
                <p className="text-gray-400">Map location not set</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}