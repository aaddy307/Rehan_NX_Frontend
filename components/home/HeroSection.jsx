'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { WHATSAPP_BASE } from '@/utils/constants'
import { useSettingsStore } from '@/store/settingsStore'

export default function HeroSection() {
  const { settings } = useSettingsStore()
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}?text=${encodeURIComponent('Hi, I want to know about your latest phone offers!')}`

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-gray-900 text-white pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Latest Smartphones at
              <span className="text-accent block">Best Prices</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Explore our wide range of smartphones with exciting EMI options and the best deals in town. Your dream phone is just a click away!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-lg hover:bg-accent/90 transition-colors font-semibold">
                View Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative w-full h-96">
              <Image src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=800&fit=crop" alt="Smartphone" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}