'use client'

import { useEffect, useState } from 'react'
import DashboardCard from '@/components/admin/DashboardCard'
import { Package, Layers, MessageSquare, Star } from 'lucide-react'
import { getProducts } from '@/services/api'
import { getCategories } from '@/services/api'
import { getInquiries } from '@/services/api'

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, categories: 0, inquiries: 0, featured: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, categoriesRes, inquiriesRes] = await Promise.all([
          getProducts({ limit: 1 }),
          getCategories(),
          getInquiries({ limit: 1 }),
        ])
        setStats({
          products: productsRes.data.pagination?.total || 0,
          categories: categoriesRes.data.categories?.length || 0,
          inquiries: inquiriesRes.data.pagination?.total || 0,
          featured: productsRes.data.products.filter((p) => p.featured).length,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }
    fetchStats()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={Package} count={stats.products} label="Total Products" color="primary" />
        <DashboardCard icon={Star} count={stats.featured} label="Featured Products" color="accent" />
        <DashboardCard icon={Layers} count={stats.categories} label="Categories" color="blue" />
        <DashboardCard icon={MessageSquare} count={stats.inquiries} label="Inquiries" color="green" />
      </div>
    </div>
  )
}