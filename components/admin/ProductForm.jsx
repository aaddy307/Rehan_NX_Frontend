'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import SpecificationsInput from './SpecificationsInput'
import { useCategories } from '@/hooks/useCategories'
import { createProduct, updateProduct, getProductById, getBrands } from '@/services/api'
import { toast } from 'sonner'
import { generateSlug } from '@/lib/utils'
import { X, Upload } from 'lucide-react'

const MAX_FILE_SIZE = 20 * 1024 * 1024

export default function ProductForm({ productId }) {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const { categories } = useCategories()
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(!!productId)
  const [existingImages, setExistingImages] = useState([])
  const [newFiles, setNewFiles] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    brand: '',
    category: '',
    price: '',
    shortDescription: '',
    description: '',
    specifications: [],
    featured: false,
    status: true,
  })

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands()
        setBrands(response.data.brands.filter(b => b.status))
      } catch (error) {
        console.error('Error fetching brands:', error)
      }
    }
    fetchBrands()
  }, [])

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await getProductById(productId)
          const product = response.data.product
          setFormData({
            name: product.name,
            slug: product.slug,
            brand: typeof product.brand === 'object' ? product.brand._id : product.brand,
            category: typeof product.category === 'object' ? product.category._id : product.category,
            price: product.price.toString(),
            shortDescription: product.shortDescription || '',
            description: product.description || '',
            specifications: product.specifications || [],
            featured: product.featured,
            status: product.status,
          })
          setExistingImages((product.images || []).filter(img => img && img.url))
        } catch (error) {
          toast.error('Failed to load product')
        } finally {
          setInitialLoading(false)
        }
      }
      fetchProduct()
    }
  }, [productId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'name') {
      setFormData((prev) => ({ ...prev, slug: generateSlug(value) }))
    }
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      setNewFiles(null)
      return
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_FILE_SIZE) {
        toast.error(`"${files[i].name}" exceeds 20MB limit`)
        e.target.value = ''
        setNewFiles(null)
        return
      }
    }
    setNewFiles(files)
  }

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'specifications') {
          data.append(key, JSON.stringify(val))
        } else {
          data.append(key, String(val))
        }
      })

      if (newFiles) {
        for (let i = 0; i < newFiles.length; i++) {
          data.append('images', newFiles[i])
        }
      }

      data.append('existingImages', JSON.stringify(existingImages.filter(img => img && img.publicId).map(img => img.publicId)))

      if (productId) {
        await updateProduct(productId, data)
        toast.success('Product updated successfully')
      } else {
        await createProduct(data)
        toast.success('Product created successfully')
      }
      router.push('/admin/products')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return <div className="animate-pulse space-y-4"><div className="h-10 bg-gray-200 rounded" /><div className="h-10 bg-gray-200 rounded" /></div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Product name" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
          <Select name="brand" value={formData.brand} onChange={handleChange} required>
            <option value="">Select Brand</option>
            {brands.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <Select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
          <Input name="price" type="number" value={formData.price} onChange={handleChange} required placeholder="0" min="0" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
        <Textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows={2} placeholder="Brief description for product cards" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
        <Textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Detailed product description" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
        <div className="flex items-center gap-4 mb-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            <span className="text-sm">{existingImages.length > 0 || newFiles ? 'Add more images' : 'Select images'}</span>
            <input ref={fileInputRef} type="file" name="images" multiple accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleFileChange} className="hidden" />
          </label>
          <span className="text-xs text-gray-400">JPEG, PNG, WebP, AVIF up to 20MB each</span>
        </div>

        {existingImages.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Existing images:</p>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((img, i) => (
                <div key={img.publicId || i} className="relative group">
                  <Image src={img.url} alt="" width={80} height={80} className="w-20 h-20 object-cover rounded-lg border" />
                  <button type="button" onClick={() => removeExistingImage(i)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {newFiles && newFiles.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">New images to upload ({newFiles.length}):</p>
            <div className="flex flex-wrap gap-3">
              {Array.from(newFiles).map((file, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg border overflow-hidden bg-gray-100">
                  <Image src={URL.createObjectURL(file)} alt="" width={80} height={80} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
        <SpecificationsInput value={formData.specifications} onChange={(val) => setFormData((prev) => ({ ...prev, specifications: val }))} />
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Switch checked={formData.featured} onCheckedChange={(val) => setFormData((prev) => ({ ...prev, featured: val }))} />
          <span className="text-sm text-gray-700">Featured Product</span>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={formData.status} onCheckedChange={(val) => setFormData((prev) => ({ ...prev, status: val }))} />
          <span className="text-sm text-gray-700">Active</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" loading={loading}>{productId ? 'Update Product' : 'Create Product'}</Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/products')}>Cancel</Button>
      </div>
    </form>
  )
}