'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import { Send } from 'lucide-react'

export default function InquiryForm() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    product: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Thank you! Your inquiry has been submitted. We will contact you soon.')
        setFormData({ name: '', phone: '', city: '', product: '', message: '' })
      } else {
        toast.error(data.message || 'Failed to submit inquiry')
      }
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-semibold text-lg mb-6">Send us a message</h2>
      
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="10 digit mobile number"
              pattern="[0-9]{10}"
              maxLength={10}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Your city"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Interest</label>
            <Input
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="e.g. iPhone 15 Pro"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Tell us about your requirements..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
        </div>

        <Button type="submit" loading={loading} className="w-full">
          <Send className="w-4 h-4 mr-2" />
          Send Inquiry
        </Button>
      </div>
    </form>
  )
}