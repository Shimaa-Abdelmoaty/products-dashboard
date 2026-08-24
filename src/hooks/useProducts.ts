import { useEffect, useState } from 'react'
import { getProducts } from '../services/productApi'
import type { Product } from '../types/product'

type UseProductsResult = {
  products: Product[]
  loading: boolean
  error: string | null
  refetch: () => void
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to fetch products.'
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [requestId, setRequestId] = useState(0)

  useEffect(() => {
    let isActive = true

    async function loadProducts() {
      setLoading(true)
      setError(null)

      try {
        const fetchedProducts = await getProducts()

        if (isActive) {
          setProducts(fetchedProducts)
        }
      } catch (fetchError: unknown) {
        if (isActive) {
          setError(getErrorMessage(fetchError))
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void loadProducts()

    return () => {
      isActive = false
    }
  }, [requestId])

  function refetch() {
    setRequestId((currentRequestId) => currentRequestId + 1)
  }

  return { products, loading, error, refetch }
}