import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

function Products() {
  const { products, loading, error, refetch } = useProducts()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  if (products.length === 0) {
    return <EmptyState />
  }

  return (
    <main>
      <h1>Products</h1>
      <p>{products.length} products loaded</p>
      <section>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  )
}

export default Products
