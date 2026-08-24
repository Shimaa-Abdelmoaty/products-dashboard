import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { getProduct } from '../services/productApi'
import type { Product } from '../types/product'

function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [requestId, setRequestId] = useState(0)

  useEffect(() => {
    let isActive = true
    const productId = id ? Number(id) : NaN

    async function loadProduct() {
      if (!Number.isInteger(productId) || productId <= 0) {
        setProduct(null)
        setError('Invalid product ID.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const fetchedProduct = await getProduct(productId)

        if (isActive) {
          setProduct(fetchedProduct)
        }
      } catch (fetchError: unknown) {
        if (isActive) {
          setProduct(null)
          setError('Product could not be found or loaded.')
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void loadProduct()

    return () => {
      isActive = false
    }
  }, [id, requestId])

  if (loading) {
    return <Loading />
  }

  if (error || !product) {
    return (
      <ErrorMessage
        message={error ?? 'Product could not be found.'}
        onRetry={() => setRequestId((currentRequestId) => currentRequestId + 1)}
      />
    )
  }

  return (
    <main>
      <Link to="/products">Back to products</Link>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width="300" height="300" />
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>
      {product.rating && (
        <p>
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </p>
      )}
    </main>
  )
}

export default ProductDetails
