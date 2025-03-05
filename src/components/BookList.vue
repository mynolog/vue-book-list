<script setup lang="ts">
import type { Book } from '../types/book'
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ApiClient from '../api'
import { API_ENDPOINT } from '../constants/api'

const router = useRouter()
const apiClient = new ApiClient()
const books = reactive<Book[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response: Book[] = await apiClient.get<Book[]>('BOOKS')
    if (response) {
      books.push(...response)
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

const getBookLink = (id: Book['id']) => {
  return `${API_ENDPOINT.BOOKS}/${id}`
}

const navigateToBookDetail = (id: Book['id']) => {
  router.push(`${API_ENDPOINT.BOOKS}/${id}`)
}
</script>

<template>
  <ul v-if="isLoading" class="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-3 px-16">
    <li
      v-for="(_, index) in Array.from({ length: 10 })"
      :key="index"
      class="w-full md:w-80 h-20 flex tems-center gap-3 px-4 bg-gray-100 animate-pulse rounded-md"
    ></li>
  </ul>
  <ul v-else class="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-3 px-16">
    <li
      v-for="book in books"
      :key="book.id + book.title"
      class="group w-full md:w-80 h-20 flex items-center gap-3 px-4 overflow-hidden rounded-md opacity-75 text-sm bg-[#f3f3fd] ease-linear transition-all duration-100 hover:scale-105 hover:cursor-pointer hover:opacity-100"
      @click="navigateToBookDetail(book.id)"
    >
      <router-link :to="getBookLink(book.id)">
        <span class="truncate group-hover:font-bold">
          {{ book.id }}
        </span>
        <span class="truncate group-hover:font-bold">
          {{ book.title }}
        </span>
      </router-link>
    </li>
  </ul>
</template>
