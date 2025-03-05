import type { Book } from '../types/book'

export const getBookDetailEndpoint = (id: Book['id'] | string) => {
  return `/books/${id}`
}
