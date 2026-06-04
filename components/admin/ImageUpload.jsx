'use client'

import { useState } from 'react'
import { ImagePlus, X } from 'lucide-react'

export default function ImageUpload({ onChange, multiple = false }) {
  const [previews, setPreviews] = useState([])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => [...prev, ...newPreviews])
    onChange(e.target.files)
  }

  const removePreview = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index)
    setPreviews(newPreviews)
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors">
          <ImagePlus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Click to upload images</p>
          <input type="file" accept="image/*" multiple={multiple} onChange={handleFileChange} className="hidden" />
        </div>
      </label>
      {previews.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {previews.map((preview, index) => (
            <div key={index} className="relative w-20 h-20">
              <img src={preview} alt="" className="w-full h-full object-cover rounded-lg" />
              <button type="button" onClick={() => removePreview(index)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}