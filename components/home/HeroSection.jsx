'use client'

import Link from 'next/link'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'

export default function HeroSection() {
  const { settings } = useSettingsStore()
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1a1a2e]">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#e94560]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(233,69,96,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(233,69,96,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#e94560]/10 border border-[#e94560]/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-[#e94560] rounded-full animate-pulse" />
              <span className="text-[#e94560] text-sm font-medium">New Arrivals Every Week</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Latest Smartphones<br />
              <span className="text-[#e94560]">at Best Prices</span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-400 text-lg mb-8 flex flex-wrap gap-3 justify-center lg:justify-start">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products" className="group inline-flex items-center justify-center gap-2 bg-[#e94560] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#d63d55] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#e94560]/30">
                View Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/30">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start">
              {[
                { label: '100% Genuine', num: '1K+' },
                { label: 'Happy Customers', num: '10K+' },
                { label: 'Products', num: '500+' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-[#e94560]">{item.num}</p>
                  <p className="text-sm text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Phone Mockup */}
          <div className="relative flex justify-center items-center">
            {/* Glow Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] bg-[#e94560]/30 rounded-full blur-[100px]" />
            </div>

            {/* Phone Container */}
            <div className="relative animate-float">
              {/* Glow Ring Behind Phone */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#e94560]/50 to-purple-500/50 rounded-full blur-[60px] scale-150 opacity-50" />
              
              {/* Phone Frame */}
              <div className="relative w-72 h-[580px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3.5rem] p-4 shadow-2xl border border-gray-700">
                {/* Side Buttons */}
                <div className="absolute -left-1 top-32 w-1 h-12 bg-gray-700 rounded-r" />
                <div className="absolute -left-1 top-48 w-1 h-8 bg-gray-700 rounded-r" />
                
                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[3rem] overflow-hidden relative shadow-inner">
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full" />
                  
                  {/* Screen Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    {/* Brand Logo */}
                    <div className="w-24 h-24 bg-gradient-to-br from-[#e94560] to-pink-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-[#e94560]/30">
                      <span className="text-white font-bold text-4xl">R</span>
                    </div>
                    <p className="text-white text-xl font-bold">Rehan NX</p>
                    <p className="text-gray-500 text-sm">Mobiles</p>
                    
                    {/* Price Tag */}
                    <div className="mt-8 bg-[#e94560]/20 border border-[#e94560]/40 rounded-full px-6 py-2">
                      <span className="text-white font-bold text-lg">Starting ₹8,999</span>
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-600 rounded-full" />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-xl animate-bounce">
                <span className="text-xs text-gray-500">Min Price</span>
                <p className="font-bold">₹8,999</p>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-[#e94560] text-white px-4 py-2 rounded-xl shadow-xl">
                <span className="text-xs text-white/70">Extra Off</span>
                <p className="font-bold">₹500</p>
              </div>

              {/* Ring Light Effect */}
              <div className="absolute -inset-4 border-2 border-[#e94560]/20 rounded-[4rem] animate-spin-slow" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  )
}