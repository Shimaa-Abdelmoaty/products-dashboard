import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import ErrorMessage from '../components/ErrorMessage'
import Button from '../components/Button'
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
    return <Loading label="Loading product..." />
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
    <div className="space-y-6">
      <Link to="/products" className="text-sm font-medium text-teal-300 transition hover:text-teal-200">← Back to products</Link>
      <div>
        <p className="text-sm font-medium text-teal-300">Product details</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">{product.title}</h1>
      </div>
      <section className="grid overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 lg:grid-cols-[minmax(280px,0.85fr)_1.15fr]" aria-label="Product information">
        <div className="flex min-h-[340px] items-center justify-center bg-white p-10"><img src={product.image} alt={product.title} width="300" height="300" className="max-h-72 w-full object-contain" /></div>
        <div className="flex flex-col p-6 sm:p-8">
          <span className="w-fit rounded-full bg-teal-400/10 px-2.5 py-1 text-xs font-semibold capitalize text-teal-300">{product.category}</span>
          {product.rating && <p className="mt-5 text-sm text-amber-300">★ {product.rating.rate} <span className="text-slate-500">({product.rating.count} reviews)</span></p>}
          <p className="mt-5 text-3xl font-bold text-white">${product.price.toFixed(2)}</p>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400">{product.description}</p>
          {deleteError && <p role="alert" className="mt-6 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">{deleteError}</p>}
          <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
            <Link to={`/products/${product.id}/edit`} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">Edit product</Link>
            <Button type="button" variant="danger" onClick={() => void handleDelete()} loading={isDeleting}>Delete product</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails
