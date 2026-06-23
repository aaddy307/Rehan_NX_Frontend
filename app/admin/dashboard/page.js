'use client'

import { useEffect, useState } from 'react'
import DashboardCard from '@/components/admin/DashboardCard'
import { Package, Layers, MessageSquare, Star, TrendingUp, BarChart2, PieChart } from 'lucide-react'
import { getProducts, getCategories, getInquiries } from '@/services/api'
import { useAuthStore } from '@/store/authStore'

export default function DashboardPage() {
  const { isAuthenticated } = useAuthStore()
  const [stats, setStats] = useState({ products: 0, categories: 0, inquiries: 0, featured: 0 })
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeCategoryTab, setActiveCategoryTab] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchStats = async () => {
      try {
        setLoading(true)
        const [productsRes, categoriesRes, inquiriesRes, featuredRes] = await Promise.all([
          getProducts({ limit: 100, all: true }),
          getCategories({ all: true }),
          getInquiries({ limit: 1 }),
          getProducts({ featured: 'true', limit: 1 }),
        ])

        const fetchedProducts = productsRes.data.products || []
        const fetchedCategories = categoriesRes.data.categories || []

        setProducts(fetchedProducts)
        setCategories(fetchedCategories)

        setStats({
          products: productsRes.data.pagination?.total || fetchedProducts.length || 0,
          categories: categoriesRes.data.categories?.length || fetchedCategories.length || 0,
          inquiries: inquiriesRes.data.pagination?.total || 0,
          featured: featuredRes.data.pagination?.total || 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
        // Fallback without inquiries
        try {
          const [productsRes, categoriesRes, featuredRes] = await Promise.all([
            getProducts({ limit: 100, all: true }),
            getCategories({ all: true }),
            getProducts({ featured: 'true', limit: 1 }),
          ])
          const fetchedProducts = productsRes.data.products || []
          const fetchedCategories = categoriesRes.data.categories || []

          setProducts(fetchedProducts)
          setCategories(fetchedCategories)

          setStats({
            products: productsRes.data.pagination?.total || fetchedProducts.length || 0,
            categories: categoriesRes.data.categories?.length || fetchedCategories.length || 0,
            inquiries: 0,
            featured: featuredRes.data.pagination?.total || 0,
          })
        } catch (err) {
          console.error('Fallback stats error:', err)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [isAuthenticated])

  // Calculate Category breakdown
  const categoryBreakdown = {}
  products.forEach((p) => {
    const catName = typeof p.category === 'object' ? p.category?.name : 'Uncategorized'
    categoryBreakdown[catName] = (categoryBreakdown[catName] || 0) + 1
  })

  const categoryData = Object.keys(categoryBreakdown).map((name, index) => {
    const count = categoryBreakdown[name]
    const colors = [
      '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1',
      '#8B5CF6', '#EC4899', '#14B8A6', '#F43F5E', '#06B6D4'
    ]
    return {
      name,
      count,
      percentage: stats.products ? Math.round((count / stats.products) * 100) : 0,
      color: colors[index % colors.length]
    }
  }).sort((a, b) => b.count - a.count)

  // Calculate Brand breakdown
  const brandBreakdown = {}
  products.forEach((p) => {
    const brandName = typeof p.brand === 'object' ? p.brand?.name : (p.brand || 'No Brand')
    brandBreakdown[brandName] = (brandBreakdown[brandName] || 0) + 1
  })

  const brandData = Object.keys(brandBreakdown).map((name) => {
    const count = brandBreakdown[name]
    return {
      name,
      count,
      percentage: stats.products ? Math.round((count / stats.products) * 100) : 0,
    }
  }).sort((a, b) => b.count - a.count).slice(0, 5) // top 5 brands

  // SVG Donut Chart calculation helpers
  let cumulativePercent = 0
  const donutSegments = categoryData.map((d) => {
    const startPercent = cumulativePercent
    cumulativePercent += d.percentage
    return {
      ...d,
      startPercent,
    }
  })

  return (
    <div className="space-y-8">
      {/* Title block */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome to your admin control center. Here is your overview.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 h-28 animate-pulse shadow-sm border border-gray-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <DashboardCard icon={Package} count={stats.products} label="Total Products" color="primary" />
          </div>
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <DashboardCard icon={Star} count={stats.featured} label="Featured Products" color="accent" />
          </div>
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <DashboardCard icon={Layers} count={stats.categories} label="Categories" color="blue" />
          </div>
          <div className="transition-all duration-300 hover:scale-[1.02]">
            <DashboardCard icon={MessageSquare} count={stats.inquiries} label="Inquiries" color="green" />
          </div>
        </div>
      )}

      {/* Analytics Charts Section */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Category Distribution Donut Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-gray-800">Products by Category</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 flex-1">
              {/* SVG Donut Chart */}
              <div className="relative w-44 h-44 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E5E7EB" strokeWidth="12" />
                  {donutSegments.map((segment, index) => {
                    const radius = 40
                    const circumference = 2 * Math.PI * radius
                    const strokeDasharray = `${(segment.percentage / 100) * circumference} ${circumference}`
                    const strokeDashoffset = circumference - ((segment.startPercent / 100) * circumference)
                    
                    return (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke={segment.color}
                        strokeWidth={activeCategoryTab === index ? "16" : "12"}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setActiveCategoryTab(index)}
                        onMouseLeave={() => setActiveCategoryTab(null)}
                      />
                    )
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  {activeCategoryTab !== null ? (
                    <>
                      <span className="text-2xl font-bold" style={{ color: donutSegments[activeCategoryTab].color }}>
                        {donutSegments[activeCategoryTab].count}
                      </span>
                      <span className="text-xs text-gray-400 truncate max-w-[80px]">
                        {donutSegments[activeCategoryTab].name}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-extrabold text-gray-800">{stats.products}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">Total</span>
                    </>
                  )}
                </div>
              </div>

              {/* Legends */}
              <div className="flex-1 w-full space-y-2 max-h-56 overflow-y-auto pr-1">
                {categoryData.map((data, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${
                      activeCategoryTab === index ? 'bg-gray-50' : 'hover:bg-gray-50/50'
                    }`}
                    onMouseEnter={() => setActiveCategoryTab(index)}
                    onMouseLeave={() => setActiveCategoryTab(null)}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: data.color }} />
                      <span className="text-sm font-medium text-gray-700 truncate">{data.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-gray-500">{data.count} items</span>
                      <span className="text-xs font-bold text-gray-900 w-8 text-right">{data.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Brand Distribution Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-500" />
                <h2 className="text-lg font-bold text-gray-800">Top Brands</h2>
              </div>
              <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Top 5
              </span>
            </div>

            <div className="space-y-5 flex-1 flex flex-col justify-center">
              {brandData.map((brand, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">{brand.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{brand.count} products</span>
                      <span className="font-bold text-gray-900">{brand.percentage}%</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${brand.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}