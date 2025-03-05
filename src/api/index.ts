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

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const url = API_ENDPOINT[endpoint as keyof typeof API_ENDPOINT] || endpoint
      const response = await fetch(`${this.baseUrl}${url}`, {
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

  get<T>(endpoint: string): Promise<T> {
    return this.request(endpoint, { method: 'GET' })
  }
}

export default ApiClient
