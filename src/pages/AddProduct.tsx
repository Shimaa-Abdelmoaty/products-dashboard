import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import Button from '../components/Button'
import Input from '../components/Input'
import { createProduct } from '../services/productApi'
import type { ProductFormValues } from '../types/product'
import { productSchema } from '../utils/productSchema'

function AddProduct() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  })

  async function onSubmit(product: ProductFormValues) {
    setApiError(null)

    try {
      const createdProduct = await createProduct(product)

      if (Number.isInteger(createdProduct.id) && createdProduct.id > 0) {
        navigate(`/products/${createdProduct.id}`)
      } else {
        navigate('/products')
      }
    } catch (submissionError: unknown) {
      setApiError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to create the product.',
      )
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div><p className="text-sm font-medium text-teal-300">Catalog management</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Add product</h1><p className="mt-2 text-sm text-slate-400">Create a new product in your catalog</p></div>
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
          <textarea className="min-h-32 w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20" {...register('description')} />
          {errors.description && <span>{errors.description.message}</span>}
        </label>
        <div><p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Media</p><Input
          label="Image URL"
          error={errors.image?.message}
          type="url"
          {...register('image')}
        /></div>
        {apiError && <p role="alert">{apiError}</p>}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={() => navigate('/products')}>Cancel</Button><Button type="submit" loading={isSubmitting}>Create product</Button></div>
      </form>
    </div>
  )
}

export default AddProduct
