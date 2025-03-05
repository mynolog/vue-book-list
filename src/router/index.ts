import { createRouter, createWebHistory } from 'vue-router'
import BookPage from '../pages/BookPage.vue'
import { API_ENDPOINT } from '../constants/api'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: API_ENDPOINT['ROOT'],
      redirect: API_ENDPOINT['BOOKS'],
    },
    {
      path: API_ENDPOINT['BOOKS'],
      name: 'books',
      alias: '/bk',
      component: BookPage,
    },
    {
      path: API_ENDPOINT['BOOK_DETAIL'],
      name: 'book-detail',
      component: () => import('../pages/BookDetailPage.vue'),
    },
    {
      path: API_ENDPOINT['ID'],
      redirect: (to) => {
        const id = to.params.id
        return { path: `/books/${id}` }
      },
    },
  ],
})

export default router
