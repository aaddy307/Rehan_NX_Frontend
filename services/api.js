import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api/v1',
  withCredentials: true,
})

export const login = (data) => api.post('/auth/login', data)
export const logout = () => api.post('/auth/logout')
export const getMe = () => api.get('/auth/me')

export const getProducts = (params) => api.get('/products', { params })
export const getProduct = (slug, params) => api.get(`/products/${slug}`, { params })
export const getProductById = (id, params) => api.get(`/products/id/${id}`, { params })
export const createProduct = (data) => api.post('/products', data)
export const updateProduct = (id, data) => api.put(`/products/${id}`, data)
export const deleteProduct = (id) => api.delete(`/products/${id}`)

export const getCategories = (params) => api.get('/categories', { params })
export const createCategory = (data) => api.post('/categories', data)
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)

export const submitInquiry = (data) => api.post('/inquiries', data)
export const getInquiries = (params) => api.get('/inquiries', { params })
export const deleteInquiry = (id) => api.delete(`/inquiries/${id}`)

export const getSettings = () => api.get('/settings')
export const updateSettings = (data) => api.put('/settings', data)

export const getBrands = (params) => api.get('/brands', { params })
export const createBrand = (data) => api.post('/brands', data)
export const updateBrand = (id, data) => api.put(`/brands/${id}`, data)
export const deleteBrand = (id) => api.delete(`/brands/${id}`)

export default api