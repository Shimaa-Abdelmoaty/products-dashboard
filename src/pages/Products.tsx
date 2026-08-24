import { useProducts } from '../hooks/useProducts'

function Products() {
  const { products } = useProducts()

  return (
    <main>
      <h1>Products</h1>
      <p>{products.length} products loaded</p>
    </main>
  )
}

export default Products
