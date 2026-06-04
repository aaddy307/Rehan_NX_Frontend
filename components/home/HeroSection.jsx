'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'

const phones = [
  { name: 'iPhone 15 Pro', color: 'from-gray-300 to-gray-500' },
  { name: 'Samsung S24', color: 'from-purple-600 to-blue-600' },
  { name: 'OnePlus 12', color: 'from-red-500 to-orange-500' },
  { name: 'Pixel 8', color: 'from-blue-400 to-teal-400' },
]

const features = [
  { label: 'Genuine', color: 'text-green-400' },
  { label: 'Fast Delivery', color: 'text-blue-400' },
  { label: 'Easy EMI', color: 'text-yellow-400' },
]

export default function HeroSection() {
  const { settings } = useSettingsStore()
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-accent/30 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-l from-purple-600/30 to-transparent rounded-full blur-[120px]" />
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-accent rounded-full animate-ping" />
        <div className="absolute top-40 right-1/3 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Content - Full Width */}
        <div className="text-center mb-12">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-300">Trusted by 10,000+ Customers</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">Get Your</span>
            <br />
            <span className="bg-gradient-to-r from-accent via-yellow-300 to-accent bg-clip-text text-transparent">
              Dream Phone
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Premium smartphones at unbeatable prices. Cashback, EMI options, and free delivery on all orders.
          </p>

          {/* Features Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {features.map((f, i) => (
              <span key={i} className={`text-sm font-medium ${f.color} bg-white/5 px-4 py-1.5 rounded-full border border-white/10`}>
                ✓ {f.label}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="group inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg shadow-white/10">
              Browse Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300">
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Phone Showcase - Unique Design */}
        <div className="relative mt-16">
          <div className="flex justify-center items-end gap-6 sm:gap-10 overflow-hidden">
            {phones.map((phone, i) => (
              <div key={i} className={`relative transition-all duration-500 hover:-translate-y-4 ${i === 0 ? 'scale-110 z-10' : 'opacity-70 hover:opacity-100'}`} style={{ animationDelay: `${i * 0.2}s` }}>
                {/* Phone Card */}
                <div className={`w-36 sm:w-48 h-64 sm:h-72 bg-gradient-to-b ${phone.color} rounded-3xl p-2 shadow-2xl relative`}>
                  {/* Screen */}
                  <div className="w-full h-full bg-black/20 rounded-[2rem] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-2xl" />
                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/50 font-bold text-4xl">📱</span>
                    </div>
                    {/* Home Bar */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
                  </div>
                </div>
                {/* Price Tag */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 whitespace-nowrap">
                  <span className="text-white font-bold text-sm">From ₹9,999</span>
                </div>
              </div>
            ))}
          </div>

          {/* Glow Effect Below */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-accent/30 to-transparent blur-3xl" />
        </div>

        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: '10K+', label: 'Happy Customers' },
            { value: '500+', label: 'Products' },
            { value: '50+', label: 'Brands' },
            { value: '24/7', label: 'Support' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}