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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="bg-white rounded-3xl shadow-soft border border-outline-variant/30 p-10 lg:p-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-onSurface font-headline tracking-tight mb-4">Buy Now, Pay Later</h2>
          <p className="text-mutedText max-w-2xl mx-auto font-sans text-sm">Get your favorite smartphone with easy EMI options. No hidden charges, transparent processing, instant approval.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primaryContainer/10 text-primaryContainer rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-headline font-bold text-onSurface text-lg mb-2">{feature.title}</h3>
              <p className="text-mutedText text-sm font-sans">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/products" className="inline-flex items-center gap-2 bg-primaryContainer text-white px-8 py-3.5 rounded-full font-headline font-bold text-xs uppercase tracking-wider hover:bg-primary transition-all duration-300 hover:scale-[1.02] shadow-md shadow-primaryContainer/15 hover:shadow-lg">
            Browse Phones with EMI
          </Link>
        </div>
      </div>
    </section>
  )
}