'use client'

import Link from 'next/link'
import { Calculator, CreditCard, TrendingUp } from 'lucide-react'

const features = [
  { icon: Calculator, title: 'Easy EMI Options', description: 'Flexible monthly installments starting from ₹999' },
  { icon: CreditCard, title: 'Zero Down Payment', description: 'Select devices with zero upfront cost' },
  { icon: TrendingUp, title: 'Best Exchange Value', description: 'Get the best deals on your old device' },
]

export default function FinanceSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Buy Now, Pay Later</h2>
          <p className="text-white/80 max-w-2xl mx-auto">Get your favorite smartphone with easy EMI options. No hidden charges, transparent processing, instant approval.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products" className="inline-flex items-center gap-2 bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Browse Phones with EMI
          </Link>
        </div>
      </div>
    </section>
  )
}