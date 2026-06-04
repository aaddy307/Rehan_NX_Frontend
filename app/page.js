'use client'

import { useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoriesSection from '@/components/home/CategoriesSection'
import FinanceSection from '@/components/home/FinanceSection'
import BrandsSection from '@/components/home/BrandsSection'
import ContactSection from '@/components/home/ContactSection'
import { useSettingsStore } from '@/store/settingsStore'

export default function HomePage() {
  const { fetchSettings } = useSettingsStore()

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <FinanceSection />
      <BrandsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}