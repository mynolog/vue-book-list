class ApiClient {
  baseUrl: string
  constructor() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    if (!baseUrl) {
      throw new Error('API_BASE_URL 환경 변수가 누락되었습니다. 다시 확인해주세요.')
    }
    this.baseUrl = baseUrl
  }

  async request(url: string, options: RequestInit = {}) {
    try {
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
      return await response.json()
    } catch (error) {
      console.error('Error: ', error)
      throw error
    }
  }

  // GET 요청
  get(url: string) {
    return this.request(url, { method: 'GET' })
  }
}

export default ApiClient
