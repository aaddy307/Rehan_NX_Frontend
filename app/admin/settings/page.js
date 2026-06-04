'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { getSettings, updateSettings } from '@/services/api'
import { toast } from 'sonner'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    storeName: '',
    address: '',
    phone1: '',
    phone2: '',
    whatsapp: '',
    email: '',
    mapUrl: '',
    facebook: '',
    instagram: '',
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings()
        setFormData(response.data.settings || {})
      } catch (error) {
        toast.error('Failed to load settings')
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await updateSettings(formData)
      toast.success('Settings updated successfully')
    } catch (error) {
      toast.error('Failed to update settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <LoadingSkeleton type="card" rows={3} />
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Store Settings</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <Input name="storeName" value={formData.storeName} onChange={handleChange} placeholder="Rehan NX Mobiles" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="contact@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone 1</label>
              <Input name="phone1" value={formData.phone1} onChange={handleChange} placeholder="+91 9876543210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone 2</label>
              <Input name="phone2" value={formData.phone2} onChange={handleChange} placeholder="+91 9876543211" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <Input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+91 9876543210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <Input name="facebook" value={formData.facebook} onChange={handleChange} placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <Input name="instagram" value={formData.instagram} onChange={handleChange} placeholder="https://instagram.com/..." />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="Full store address" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed URL</label>
            <Input name="mapUrl" value={formData.mapUrl} onChange={handleChange} placeholder="https://www.google.com/maps/embed?..." />
          </div>
          <Button type="submit" loading={saving} className="w-full md:w-auto">Save Settings</Button>
        </form>
      </div>
    </div>
  )
}