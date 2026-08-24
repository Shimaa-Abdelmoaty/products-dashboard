import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router'
import Button from '../components/Button'
import { updateProduct, getProduct } from '../services/productApi'
import Input from '../components/Input'
import type { ProductFormValues } from '../types/product'
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
  } = useForm<ProductFormValues>({
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

  async function onSubmit(product: ProductFormValues) {
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
    <div className="mx-auto max-w-3xl space-y-8">
      <div><Link to={`/products/${productId}`} className="text-sm font-medium text-teal-300 transition hover:text-teal-200">← Back to product details</Link><p className="mt-6 text-sm font-medium text-teal-300">Catalog management</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Edit product</h1><p className="mt-2 text-sm text-slate-400">Update product information</p></div>
      <form className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/10 sm:p-8" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Product information</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><Input label="Title" error={errors.title?.message} {...register('title')} />
        <Input
          label="Price"
          error={errors.price?.message}
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
        />
        <Input
          label="Category"
          error={errors.category?.message}
          {...register('category')}
        />
        </div></div>
        <label>
          Description
          <textarea className="min-h-32 w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20" {...register('description')} />
          {errors.description && <span>{errors.description.message}</span>}
        </label>
        <div><p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Media</p><Input
          label="Image URL"
          error={errors.image?.message}
          type="url"
          {...register('image')}
        /></div>
        {apiError && <p role="alert">{apiError}</p>}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={() => navigate(`/products/${productId}`)}>Cancel</Button><Button type="submit" loading={isSubmitting}>Save changes</Button></div>
      </form>
    </div>
  )
}

export default EditProduct
