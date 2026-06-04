import ProductForm from '@/components/admin/ProductForm'

export default function CreateProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Create Product</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <ProductForm />
      </div>
    </div>
  )
}