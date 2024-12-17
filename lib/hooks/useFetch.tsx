'use client'
import { useState } from 'react'
import { toast } from 'sonner'

type FetchResult<T> = Omit<UseFetchResult<T>, 'refetch'>
type Refetch<T> = (
  url: FetchProps[0],
  options?: FetchProps[1]
) => Promise<FetchResult<T>>
interface UseFetchResult<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
  refetch: Refetch<T>
}

type FetchProps = Parameters<typeof fetch>
type UseFetchProps = {
  errorMessage?: string
}
function useFetch<T = unknown>(props?: UseFetchProps): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData: Refetch<T> = async (url, options) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        console.warn('Error fetching data', response)
        toast.error(props?.errorMessage ?? 'Error fetching data')
      }
      const result = await response.json()
      setData(result)
      setIsLoading(false)
      return result
    } catch (error) {
      setError(error as Error)
      setIsLoading(false)
      return { error }
    }
  }

  return { data, isLoading, error, refetch: fetchData }
}
export default useFetch
