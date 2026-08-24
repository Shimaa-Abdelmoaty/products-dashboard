import axios from 'axios'
import type {
  CreateProductInput,
  DeleteProductResponse,
  ProductResponse,
  ProductsResponse,
  UpdateProductInput,
} from '../types/product'

const productApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

export async function getProducts(): Promise<ProductsResponse> {
  const response = await productApi.get<ProductsResponse>('/products')
  return response.data
}

export async function getProduct(id: number): Promise<ProductResponse> {
  const response = await productApi.get<ProductResponse>(`/products/${id}`)
  return response.data
}

export async function createProduct(
  product: CreateProductInput,
): Promise<ProductResponse> {
  const response = await productApi.post<ProductResponse>('/products', product)
  return response.data
}

export async function updateProduct(
  id: number,
  product: UpdateProductInput,
): Promise<ProductResponse> {
  const response = await productApi.put<ProductResponse>(
    `/products/${id}`,
    product,
  )
  return response.data
}

export async function deleteProduct(
  id: number,
): Promise<DeleteProductResponse> {
  const response = await productApi.delete<DeleteProductResponse>(
    `/products/${id}`,
  )
  return response.data
}