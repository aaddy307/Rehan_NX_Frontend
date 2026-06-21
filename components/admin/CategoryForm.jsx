'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { Button } from '@/components/ui/Button'
import { createCategory, updateCategory } from '@/services/api'
import { toast } from 'sonner'
import { generateSlug } from '@/lib/utils'

export default function CategoryForm({ category, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    status: category?.status ?? true,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'name') {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value) }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        name: formData.name,
        slug: formData.slug,
        status: formData.status,
      }

      if (category?._id) {
        await updateCategory(category._id, data)
        toast.success('Category updated')
      } else {
        await createCategory(data)
        toast.success('Category created')
      }
      onSuccess()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Category name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
        <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="auto-generated" />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={formData.status} onCheckedChange={(val) => setFormData((prev) => ({ ...prev, status: val }))} />
        <span className="text-sm text-gray-700">Active</span>
      </div>
      <Button type="submit" loading={loading}>{category?._id ? 'Update' : 'Create'}</Button>
    </form>
  )
}