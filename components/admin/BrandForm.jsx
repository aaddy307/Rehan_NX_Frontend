'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { Button } from '@/components/ui/Button'
import { createBrand, updateBrand } from '@/services/api'
import { toast } from 'sonner'
import { generateSlug } from '@/lib/utils'

export default function BrandForm({ brand, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: brand?.name || '',
    status: brand?.status ?? true,
    logo: null,
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('status', String(formData.status))
      if (formData.logo) {
        data.append('logo', formData.logo)
      }

      if (brand?._id) {
        await updateBrand(brand._id, data)
        toast.success('Brand updated')
      } else {
        await createBrand(data)
        toast.success('Brand created')
      }
      onSuccess()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save brand')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Brand name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
        <input type="file" accept="image/*" onChange={(e) => setFormData((prev) => ({ ...prev, logo: e.target.files[0] }))} className="w-full border rounded-lg p-2" />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={formData.status} onCheckedChange={(val) => setFormData((prev) => ({ ...prev, status: val }))} />
        <span className="text-sm text-gray-700">Active</span>
      </div>
      <Button type="submit" loading={loading}>{brand?._id ? 'Update' : 'Create'}</Button>
    </form>
  )
}