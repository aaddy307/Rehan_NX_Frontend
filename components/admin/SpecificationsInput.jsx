'use client'

import { Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function SpecificationsInput({ value = [], onChange }) {
  const handleAdd = () => {
    onChange([...value, { key: '', value: '' }])
  }

  const handleChange = (index, field, val) => {
    onChange(value.map((spec, i) => (i === index ? { ...spec, [field]: val } : spec)))
  }

  const handleRemove = (index) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      {value.map((spec, index) => (
        <div key={index} className="flex gap-2">
          <Input placeholder="Key" value={spec.key} onChange={(e) => handleChange(index, 'key', e.target.value)} className="flex-1" />
          <Input placeholder="Value" value={spec.value} onChange={(e) => handleChange(index, 'value', e.target.value)} className="flex-1" />
          <button type="button" onClick={() => handleRemove(index)} className="p-2 text-red-500 hover:bg-red-50 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
        <Plus className="w-4 h-4 mr-1" />
        Add Specification
      </Button>
    </div>
  )
}