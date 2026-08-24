import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import Button from '../components/Button'
import ProductCard from '../components/ProductCard'
import Select, { type SelectOption } from '../components/Select'
import { useProducts } from '../hooks/useProducts'
import { useState } from 'react'
import { Link } from 'react-router'

function Products() {
  const { products, loading, error, refetch } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  if (products.length === 0) {
    return <EmptyState />
  }

  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  )
  const categoryOptions: SelectOption<string>[] = [
    { label: 'All categories', value: 'all' },
    ...categories.map((category) => ({ label: category, value: category })),
  ]
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory),
  )

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-teal-300">Catalog overview</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Products</h1>
          <p className="mt-2 text-sm text-slate-400">Manage your product catalog</p>
        </div>
        <Link to="/products/add" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">+ Add product</Link>
      </div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Product summary">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"><p className="text-sm text-slate-500">Total products</p><p className="mt-2 text-2xl font-bold text-white">{products.length}</p></div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"><p className="text-sm text-slate-500">Categories</p><p className="mt-2 text-2xl font-bold text-white">{categories.length}</p></div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"><p className="text-sm text-slate-500">Average price</p><p className="mt-2 text-2xl font-bold text-white">${(products.reduce((total, product) => total + product.price, 0) / products.length).toFixed(2)}</p></div>
      </section>
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/10" aria-label="Product filters">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end">
          <label className="grid gap-2 text-sm font-medium text-slate-300">Search products<input type="search" placeholder="Search by product title..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="min-h-11 rounded-lg border border-slate-700 bg-slate-950/70 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20" /></label>
          <Select label="Category" value={selectedCategory} options={categoryOptions} onChange={setSelectedCategory} />
          <Button type="button" variant="secondary" onClick={resetFilters}>Reset filters</Button>
        </div>
        <p className="mt-5 text-sm text-slate-500">Showing <span className="font-semibold text-slate-300">{filteredProducts.length}</span> of {products.length} products</p>
      </section>
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-label="Products">
        {filteredProducts.length > 0 ? filteredProducts.map((product) => <ProductCard key={product.id} product={product} />) : <div className="col-span-full rounded-xl border border-dashed border-slate-700 px-6 py-12 text-center"><p className="text-lg font-semibold text-slate-100">No products found</p><p className="mt-2 text-sm text-slate-500">Try changing your search or filters.</p><Button className="mt-5" type="button" variant="secondary" onClick={resetFilters}>Reset filters</Button></div>}
      </section>
    </div>
  )
}

export default Products
