'use client'

import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'
import { WHATSAPP_BASE } from '@/utils/constants'

export default function ContactSection() {
  const { settings } = useSettingsStore()
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}`

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-onSurface font-headline text-center mb-10 tracking-tight">Get in Touch</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-outline-variant/30">
              <h3 className="font-headline font-bold text-lg mb-6 text-onSurface">Contact Information</h3>
              <div className="space-y-5">
                {settings?.address && (
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-primaryContainer mt-0.5 flex-shrink-0" />
                    <span className="text-mutedText text-sm font-sans">{settings.address}</span>
                  </div>
                )}
                {settings?.phone1 && (
                  <a href={`tel:${settings.phone1}`} className="flex gap-3 text-mutedText hover:text-primary transition-colors">
                    <Phone className="w-5 h-5 text-primaryContainer mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-sans">{settings.phone1}</span>
                  </a>
                )}
                {settings?.whatsapp && (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-mutedText hover:text-primary transition-colors">
                    <MessageCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-sans">WhatsApp: {settings.whatsapp}</span>
                  </a>
                )}
                {settings?.email && (
                  <a href={`mailto:${settings.email}`} className="flex gap-3 text-mutedText hover:text-primary transition-colors">
                    <Mail className="w-5 h-5 text-primaryContainer mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-sans">{settings.email}</span>
                  </a>
                )}
              </div>
              <div className="flex gap-3 mt-8">
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
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-soft border border-outline-variant/30 min-h-[300px]">
            {settings?.mapUrl ? (
              <iframe src={settings.mapUrl} width="100%" height="100%" style={{ border: 0, minHeight: '300px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Store Location" />
            ) : (
              <div className="w-full h-full min-h-[300px] bg-background flex items-center justify-center">
                <p className="text-mutedText font-headline font-bold text-sm uppercase tracking-wider">Map location not set</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}