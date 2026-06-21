'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { submitInquiry } from '@/services/api'
import { toast } from 'sonner'

export default function InquiryForm({ productName }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    message: productName ? `I'm interested in ${productName}` : '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = { ...formData, product: productName }
      await submitInquiry(payload)
      toast.success('Inquiry submitted successfully!')
      setFormData({ name: '', phone: '', city: '', message: productName ? `I'm interested in ${productName}` : '' })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit inquiry')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
        <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="10 digit phone number" pattern="[0-9]{10}" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
        <Input name="city" value={formData.city} onChange={handleChange} placeholder="Your city" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <Textarea name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder="Your message..." />
      </div>
      <Button type="submit" loading={loading} className="w-full">Submit Inquiry</Button>
    </form>
  )
}