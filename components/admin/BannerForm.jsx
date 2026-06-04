'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { Button } from '@/components/ui/Button'
import { createBanner, updateBanner } from '@/services/api'
import { toast } from 'sonner'

export default function BannerForm({ banner, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: banner?.title || '',
    subtitle: banner?.subtitle || '',
    ctaText: banner?.ctaText || '',
    ctaLink: banner?.ctaLink || '',
    status: banner?.status ?? true,
    image: null,
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'image' && val) {
          data.append('image', val)
        } else {
          data.append(key, String(val))
        }
      })

      if (banner?._id) {
        await updateBanner(banner._id, data)
        toast.success('Banner updated')
      } else {
        await createBanner(data)
        toast.success('Banner created')
      }
      onSuccess()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save banner')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <Input name="title" value={formData.title} onChange={handleChange} required placeholder="Banner title" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
        <Input name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Optional subtitle" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image *</label>
        <input type="file" accept="image/*" required={!banner?.image} onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.files[0] }))} className="w-full border rounded-lg p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
        <Input name="ctaText" value={formData.ctaText} onChange={handleChange} placeholder="Shop Now" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
        <Input name="ctaLink" value={formData.ctaLink} onChange={handleChange} placeholder="/products" />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={formData.status} onCheckedChange={(val) => setFormData((prev) => ({ ...prev, status: val }))} />
        <span className="text-sm text-gray-700">Active</span>
      </div>
      <Button type="submit" loading={loading}>{banner?._id ? 'Update' : 'Create'}</Button>
    </form>
  )
}