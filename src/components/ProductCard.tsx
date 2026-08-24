import { Link } from 'react-router'
import type { Product } from '../types/product'

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} width="180" height="180" />
        <h2>{product.title}</h2>
      </Link>
      <p>{product.category}</p>
      <p>${product.price.toFixed(2)}</p>
      {product.rating && (
        <p>
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </p>
      )}
    </article>
  )
}

export default ProductCard