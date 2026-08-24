import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

function Products() {
  const { products } = useProducts()

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
