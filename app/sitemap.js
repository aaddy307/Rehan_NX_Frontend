export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rehannxmobiles.com'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/api/v1'
    
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${apiUrl}/products?limit=100`),
      fetch(`${apiUrl}/categories`),
    ])

    if (!productsRes.ok || !categoriesRes.ok) {
      console.error('Sitemap API error:', productsRes.status, categoriesRes.status)
      return staticPages
    }

    const productsData = await productsRes.json()
    const categoriesData = await categoriesRes.json()

    const productPages = (productsData.products || []).map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    const categoryPages = (categoriesData.categories || []).map((cat) => ({
      url: `${baseUrl}/products?category=${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

    return [...staticPages, ...productPages, ...categoryPages]
  } catch (error) {
    console.error('Sitemap error:', error)
    return staticPages
  }
}