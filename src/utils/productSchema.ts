import { z } from 'zod'

export const productSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.'),
  price: z.number().positive('Price must be greater than zero.'),
  category: z.string().trim().min(1, 'Category is required.'),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters.'),
  image: z.string().url('Image must be a valid URL.'),
})