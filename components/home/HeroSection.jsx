'use client'

import Link from 'next/link'
import { useSettingsStore } from '@/store/settingsStore'

export default function HeroSection() {
  const { settings } = useSettingsStore()
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '919876543210'

  return (
    <>
      <section className="relative bg-white overflow-hidden md:h-screen flex items-center pt-24 md:pt-0" id="home">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-0 flex flex-col md:flex-row items-center relative z-10 w-full">
          {/* Left Column (Text & CTAs) */}
          <div className="md:w-3/5 text-center md:text-left relative z-10 pr-0 md:pr-8">
            <h1 className="font-headline font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 tracking-tight text-onSurface">
              Latest <span className="text-onBackground">Smartphones</span><br />
              <span className="text-primaryContainer">at Best Prices</span>
            </h1>
            <p className="font-sans text-mutedText text-base lg:text-lg mb-10 max-w-xl leading-relaxed">
              Experience the cutting edge of mobile technology. From flagship powerhouses to budget-friendly essentials, we bring the world's best brands to your pocket.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link href="/products" className="px-10 py-4 bg-primaryContainer text-white rounded-full font-headline font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-primaryContainer/35 transition-all hover:-translate-y-0.5 active:scale-95">
                Shop Now
              </Link>
              <Link href="#brands" className="px-10 py-4 border-2 border-outline text-onSurface rounded-full font-headline font-bold text-sm uppercase tracking-wider hover:bg-background transition-all hover:-translate-y-0.5 active:scale-95">
                View Brands
              </Link>
            </div>
          </div>

          {/* Right Column (Pedestal Phone Image) */}
          <div className="md:w-2/5 mt-12 md:mt-0 relative z-10 w-full">
            <div className="relative w-full aspect-square max-w-md mx-auto border-8 border-white rounded-3xl shadow-xl overflow-hidden">
              <img 
                className="w-full h-full object-cover scale-100" 
                alt="Premium smartphone showcase on pedestal" 
                src="/HeroBannerPhone.jpg"
              />
            </div>
          </div>
        </div>

        {/* Diagonal Red Background Block - Direct Child of Section */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-2/5 bg-primaryContainer geometric-shape z-0"></div>
      </section>

      {/* Bottom Stats Strip - Rendered outside the Hero section to avoid clipping */}
      <div className="bg-primaryContainer text-white py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-around items-center gap-8 text-center">
          <div className="flex flex-col">
            <span className="font-headline font-extrabold text-4xl sm:text-5xl leading-none">10K+</span>
            <span className="font-headline font-bold text-[10px] uppercase tracking-wider opacity-90 mt-2 block">Happy Customers</span>
          </div>
          <div className="w-px h-12 bg-white opacity-20 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="font-headline font-extrabold text-4xl sm:text-5xl leading-none">500+</span>
            <span className="font-headline font-bold text-[10px] uppercase tracking-wider opacity-90 mt-2 block">Products</span>
          </div>
          <div className="w-px h-12 bg-white opacity-20 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="font-headline font-extrabold text-4xl sm:text-5xl leading-none">50+</span>
            <span className="font-headline font-bold text-[10px] uppercase tracking-wider opacity-90 mt-2 block">Brands</span>
          </div>
        </div>
      </div>
    </>
  )
}