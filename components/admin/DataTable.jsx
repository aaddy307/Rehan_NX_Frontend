'use client'

import { Edit, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'

export default function DataTable({ columns, data, onEdit, onDelete, onView }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            {columns.map((col) => (
              <th key={col.key} className="text-left py-3 px-4 font-medium text-gray-600">{col.label}</th>
            ))}
            <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row._id || index} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="py-3 px-4">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              <td className="py-3 px-4">
                <div className="flex justify-end gap-2">
                  {onView && (
                    <button onClick={() => onView(row)} className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  {onEdit && (
                    <button onClick={() => onEdit(row)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete(row)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}