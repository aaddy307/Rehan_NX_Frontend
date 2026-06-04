'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import AdminSidebar from '@/components/layout/AdminSidebar'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth()
      setChecked(true)
    }
    initAuth()
  }, [checkAuth])

  useEffect(() => {
    if (checked && !isLoading) {
      if (!isAuthenticated && pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    }
  }, [checked, isLoading, isAuthenticated, pathname, router])

  if (pathname === '/admin/login') {
    return children
  }

  if (isLoading || !checked) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSkeleton type="card" rows={1} />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="lg:ml-64 p-4 lg:p-8 pt-16 lg:pt-8">
        {children}
      </div>
    </div>
  )
}