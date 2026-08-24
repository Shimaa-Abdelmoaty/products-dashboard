export type ProductRating = {
  rate: number
  count: number
}

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductRating
}

export type ProductFormValues = Omit<Product, 'id' | 'rating'>

export type CreateProductInput = ProductFormValues

export type UpdateProductInput = Partial<ProductFormValues>

export type ProductsResponse = Product[]

export type ProductResponse = Product

export type DeleteProductResponse = Product