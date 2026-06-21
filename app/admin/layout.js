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
  const [authChecked, setAuthChecked] = useState(false)
  const [initialCheckDone, setInitialCheckDone] = useState(false)

  useEffect(() => {
    const initAuth = async () => {
      setAuthChecked(false)
      await checkAuth()
      setAuthChecked(true)
      setInitialCheckDone(true)
    }
    initAuth()
  }, [checkAuth])

  useEffect(() => {
    if (initialCheckDone && authChecked) {
      if (!isAuthenticated && pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    }
  }, [initialCheckDone, authChecked, isAuthenticated, pathname, router])

  if (pathname === '/admin/login') {
    if (initialCheckDone && isAuthenticated) {
      router.push('/admin/dashboard')
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <LoadingSkeleton type="card" rows={1} />
        </div>
      )
    }
    return children
  }

  if (!initialCheckDone || !authChecked) {
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