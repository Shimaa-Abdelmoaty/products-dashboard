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
    <main>
      <h1>Add product</h1>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <Input label="Title" error={errors.title?.message} {...register('title')} />
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
        <label>
          Description
          <textarea {...register('description')} />
          {errors.description && <span>{errors.description.message}</span>}
        </label>
        <Input
          label="Image URL"
          error={errors.image?.message}
          type="url"
          {...register('image')}
        />
        {apiError && <p role="alert">{apiError}</p>}
        <Button type="submit" loading={isSubmitting}>
          Add product
        </Button>
      </form>
    </main>
  )
}

export default AddProduct
