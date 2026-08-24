import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router'
import { updateProduct, getProduct } from '../services/productApi'
import type { CreateProductInput } from '../types/product'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { productSchema } from '../utils/productSchema'

function EditProduct() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [productId, setProductId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [requestId, setRequestId] = useState(0)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(productSchema),
  })

  useEffect(() => {
    let isActive = true
    const parsedId = id ? Number(id) : NaN

    async function loadProduct() {
      if (!Number.isInteger(parsedId) || parsedId <= 0) {
        setProductId(null)
        setLoadError('Invalid product ID.')
        setLoading(false)
        return
      }

      setLoading(true)
      setLoadError(null)

      try {
        const product = await getProduct(parsedId)

        if (isActive) {
          setProductId(product.id)
          reset({
            title: product.title,
            price: product.price,
            category: product.category,
            description: product.description,
            image: product.image,
          })
        }
      } catch (error: unknown) {
        if (isActive) {
          setProductId(null)
          setLoadError('Product could not be found or loaded.')
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
  }, [id, requestId, reset])

  async function onSubmit(product: CreateProductInput) {
    if (productId === null) {
      return
    }

    setApiError(null)

    try {
      await updateProduct(productId, product)
      navigate(`/products/${productId}`)
    } catch (error: unknown) {
      setApiError(
        error instanceof Error
          ? error.message
          : 'Unable to update the product.',
      )
    }
  }

  if (loading) {
    return <Loading />
  }

  if (loadError || productId === null) {
    return (
      <ErrorMessage
        message={loadError ?? 'Product could not be found.'}
        onRetry={() => setRequestId((currentRequestId) => currentRequestId + 1)}
      />
    )
  }

  return (
    <main>
      <Link to={`/products/${productId}`}>Back to product details</Link>
      <h1>Edit product</h1>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <label>
          Title
          <input {...register('title')} />
          {errors.title && <span>{errors.title.message}</span>}
        </label>
        <label>
          Price
          <input
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </label>
        <label>
          Category
          <input {...register('category')} />
          {errors.category && <span>{errors.category.message}</span>}
        </label>
        <label>
          Description
          <textarea {...register('description')} />
          {errors.description && <span>{errors.description.message}</span>}
        </label>
        <label>
          Image URL
          <input type="url" {...register('image')} />
          {errors.image && <span>{errors.image.message}</span>}
        </label>
        {apiError && <p role="alert">{apiError}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving product...' : 'Save changes'}
        </button>
      </form>
    </main>
  )
}

export default EditProduct
