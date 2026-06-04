'use client'

import { useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'
import { WHATSAPP_BASE } from '@/utils/constants'

export default function ContactPage() {
  const { settings, fetchSettings } = useSettingsStore()

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}`

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Contact Us</h1>
          <p className="text-gray-500 mb-8">Get in touch with us for any queries or assistance</p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-semibold text-lg mb-6">Store Information</h2>
                <div className="space-y-6">
                  {settings?.storeName && (
                    <div>
                      <h3 className="font-medium text-primary mb-2">{settings.storeName}</h3>
                    </div>
                  )}
                  {settings?.address && (
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Address</p>
                        <p className="text-gray-600">{settings.address}</p>
                      </div>
                    </div>
                  )}
                  {settings?.phone1 && (
                    <div className="flex gap-3">
                      <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Phone</p>
                        <a href={`tel:${settings.phone1}`} className="text-gray-600 hover:text-accent">{settings.phone1}</a>
                        {settings.phone2 && <p className="text-gray-600 hover:text-accent">{settings.phone2}</p>}
                      </div>
                    </div>
                  )}
                  {settings?.whatsapp && (
                    <div className="flex gap-3">
                      <MessageCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700 mb-1">WhatsApp</p>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-accent">{settings.whatsapp}</a>
                      </div>
                    </div>
                  )}
                  {settings?.email && (
                    <div className="flex gap-3">
                      <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Email</p>
                        <a href={`mailto:${settings.email}`} className="text-gray-600 hover:text-accent">{settings.email}</a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-8">
                  {settings?.facebook && (
                    <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors">
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </a>
                  )}
                  {settings?.instagram && (
                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition-colors">
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm min-h-[400px]">
              {settings?.mapUrl ? (
                <iframe src={settings.mapUrl} width="100%" height="100%" style={{ border: 0, minHeight: '400px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Store Location" />
              ) : (
                <div className="w-full h-full min-h-[400px] bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-400">Map location not configured</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}