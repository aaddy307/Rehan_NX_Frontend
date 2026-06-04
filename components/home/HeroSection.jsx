'use client'

import Link from 'next/link'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'

export default function HeroSection() {
  const { settings } = useSettingsStore()
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#1a1a2e]">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#e94560]/15 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(233,69,96,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(233,69,96,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#e94560]/10 border border-[#e94560]/30 rounded-full px-5 py-2 mb-8">
          <span className="w-2 h-2 bg-[#e94560] rounded-full animate-pulse" />
          <span className="text-[#e94560] text-sm font-medium">New Arrivals Every Week</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Latest Smartphones<br />
          <span className="text-[#e94560]">at Best Prices</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-lg mb-10 flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e94560] rounded-full" /> EMI Available
          </span>
          <span className="text-gray-600">|</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e94560] rounded-full" /> Easy Finance
          </span>
          <span className="text-gray-600">|</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e94560] rounded-full" /> All Top Brands
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="group inline-flex items-center justify-center gap-2 bg-[#e94560] text-white px-10 py-4 rounded-xl font-semibold hover:bg-[#d63d55] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#e94560]/30">
            View Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 bg-green-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/30">
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-10">
          {[
            { label: '100% Genuine', num: '1K+' },
            { label: 'Happy Customers', num: '10K+' },
            { label: 'Products', num: '500+' },
            { label: 'Brands', num: '50+' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-[#e94560]">{item.num}</p>
              <p className="text-sm text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
    </section>
  )
}