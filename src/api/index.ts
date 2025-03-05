import type { ApiEndpoint } from '../types/api'
import { API_ENDPOINT } from '../constants/api'

class ApiClient {
  baseUrl: string
  constructor() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API_BASE_URL 환경 변수가 누락되었습니다. 다시 확인해주세요.')
    }
    this.baseUrl = baseUrl
  }

  async request<T>(endpoint: ApiEndpoint, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINT[endpoint]}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = (await response.json()) as T
      return data
    } catch (error) {
      console.error('Error: ', error)
      throw error
    }
  }

  // GET 요청
  get<T>(endpoint: ApiEndpoint): Promise<T> {
    return this.request(endpoint, { method: 'GET' })
  }
}

export default ApiClient
