import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { createProduct } from '../services/productApi'
import type { CreateProductInput } from '../types/product'

const addProductSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.'),
  price: z.number().positive('Price must be greater than zero.'),
  category: z.string().trim().min(1, 'Category is required.'),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters.'),
  image: z.string().url('Image must be a valid URL.'),
})

function AddProduct() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(addProductSchema),
  })

  async function onSubmit(product: CreateProductInput) {
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
          {isSubmitting ? 'Adding product...' : 'Add product'}
        </button>
      </form>
    </main>
  )
}

export default AddProduct
