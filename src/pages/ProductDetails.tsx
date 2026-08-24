import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { deleteProduct, getProduct } from '../services/productApi'
import type { Product } from '../types/product'

function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [requestId, setRequestId] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

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

  async function handleDelete() {
    if (!product || isDeleting || !Number.isInteger(product.id)) {
      return
    }

    const confirmed = window.confirm(
      `Delete "${product.title}"? This action cannot be undone.`,
    )

    if (!confirmed) {
      return
    }

    setIsDeleting(true)
    setDeleteError(null)

    try {
      await deleteProduct(product.id)
      navigate('/products', { replace: true })
    } catch (deletionError: unknown) {
      setDeleteError(
        deletionError instanceof Error
          ? deletionError.message
          : 'Unable to delete the product.',
      )
      setIsDeleting(false)
    }
  }

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
      {deleteError && <p role="alert">{deleteError}</p>}
      <button
        type="button"
        onClick={() => void handleDelete()}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting product...' : 'Delete product'}
      </button>
    </main>
  )
}

export default ProductDetails
