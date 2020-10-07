import { Service } from '@src/interfaces';
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message)
    throw error
  }
  return data
}

export const useServices = () => {
  const { data, error } = useSWR<Service[], Error>('/api/services', fetcher)

  let categories: string[] = [];
  if (data) {
    categories = data.reduce((ct: string[], service) => {
      ct = [...ct, ...service.categoryCodes]
      return ct;
    }, [])

    // remove duplicates
    categories = Array.from(new Set(categories)).filter((c) => c !== 'Included')
  }

  return {
    categories,
    services: data || [],
    isLoading: !error && !data,
    isError: error
  }
}