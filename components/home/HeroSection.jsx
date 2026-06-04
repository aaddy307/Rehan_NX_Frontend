'use client'

import Link from 'next/link'
import { MessageCircle, ArrowRight, Shield, CreditCard, Truck, Headphones } from 'lucide-react'
import { WHATSAPP_BASE } from '@/utils/constants'
import { useSettingsStore } from '@/store/settingsStore'

const features = [
  { icon: Shield, label: '100% Genuine', desc: 'Authentic Products' },
  { icon: CreditCard, label: 'Easy EMI', desc: 'Flexible Payments' },
  { icon: Truck, label: 'Fast Delivery', desc: 'Across India' },
  { icon: Headphones, label: '24/7 Support', desc: 'Always Available' },
]

export default function HeroSection() {
  const { settings } = useSettingsStore()
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'
  const whatsappLink = `${WHATSAPP_BASE}${whatsappNumber}?text=${encodeURIComponent('Hi, I want to know about your latest phone offers!')}`

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6 border border-accent/20">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium">New Arrivals Available</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-white">Your Dream</span>
              <br />
              <span className="bg-gradient-to-r from-accent via-yellow-400 to-accent bg-clip-text text-transparent">
                Phone Awaits
              </span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
              India's trusted mobile store. Explore latest smartphones, best deals, and easy EMI options. 
              <span className="text-accent font-medium"> Shop with confidence.</span>
            </p>

            {/* Price Tag */}
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 mb-8">
              <span className="text-gray-400 text-sm">Starting from</span>
              <span className="text-2xl font-bold text-white">₹8,999</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link href="/products" className="group inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-1">
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500/10 text-green-400 border border-green-500/30 px-8 py-4 rounded-xl hover:bg-green-500/20 transition-all duration-300 font-semibold hover:-translate-y-1">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">{feature.label}</p>
                  <p className="text-gray-500 text-xs">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Phone Image */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-500 rounded-full blur-3xl opacity-30 scale-75" />
              
              {/* Phone Image */}
              <div className="relative w-80 h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl border border-gray-700">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-black rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl" />
                  
                  {/* Screen Content */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-accent to-yellow-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">R</span>
                      </div>
                      <p className="text-white font-bold text-xl">Rehan NX</p>
                      <p className="text-gray-400 text-sm">Mobiles</p>
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full" />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-white px-4 py-2 rounded-xl font-bold shadow-lg animate-bounce">
                NEW!
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-lg">
                <span className="text-sm text-gray-500">Hot Deal</span>
                <p className="font-bold">₹2,000 OFF</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-white">500+</p>
            <p className="text-gray-400 text-sm">Products</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-white">50+</p>
            <p className="text-gray-400 text-sm">Brands</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-white">10K+</p>
            <p className="text-gray-400 text-sm">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-white">4.8★</p>
            <p className="text-gray-400 text-sm">Rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}