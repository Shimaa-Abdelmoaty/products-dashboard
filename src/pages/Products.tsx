import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import { useState } from 'react'

function Products() {
  const { products, loading, error, refetch } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  if (products.length === 0) {
    return <EmptyState />
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
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
      <p>{filteredProducts.length} products shown</p>
      <section>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products match your search.</p>
        )}
      </section>
    </main>
  )
}

export default Products
