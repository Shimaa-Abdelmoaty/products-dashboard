import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import Button from '../components/Button'
import ProductCard from '../components/ProductCard'
import Select, { type SelectOption } from '../components/Select'
import { useProducts } from '../hooks/useProducts'
import { useState } from 'react'

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

  return (
    <main>
      <h1>Products</h1>
      <label>
        Search products
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </label>
      <Select
        label="Filter by category"
        value={selectedCategory}
        options={categoryOptions}
        onChange={setSelectedCategory}
      />
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          setSearchTerm('')
          setSelectedCategory('all')
        }}
      >
        Reset filters
      </Button>
      <p>{filteredProducts.length} products shown</p>
      <section>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products match the selected filters.</p>
        )}
      </section>
    </main>
  )
}

export default Products
