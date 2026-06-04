'use client'

import { useEffect, useState } from 'react'
import DashboardCard from '@/components/admin/DashboardCard'
import { Package, Layers, MessageSquare, Star } from 'lucide-react'
import { getProducts, getCategories } from '@/services/api'
import { useAuthStore } from '@/store/authStore'

export default function DashboardPage() {
  const { isAuthenticated } = useAuthStore()
  const [stats, setStats] = useState({ products: 0, categories: 0, inquiries: 0, featured: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchStats = async () => {
      try {
        setLoading(true)
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts({ limit: 100 }),
          getCategories(),
        ])
        setStats({
          products: productsRes.data.pagination?.total || 0,
          categories: categoriesRes.data.categories?.length || 0,
          inquiries: 0,
          featured: productsRes.data.products.filter((p) => p.featured).length,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [isAuthenticated])

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Dashboard</h1>
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 h-24 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard icon={Package} count={stats.products} label="Total Products" color="primary" />
          <DashboardCard icon={Star} count={stats.featured} label="Featured Products" color="accent" />
          <DashboardCard icon={Layers} count={stats.categories} label="Categories" color="blue" />
          <DashboardCard icon={MessageSquare} count={stats.inquiries} label="Inquiries" color="green" />
        </div>
      )}
    </div>
  )
}