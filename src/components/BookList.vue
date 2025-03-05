<script setup lang="ts">
import type { Book } from '../types/book'
import { onMounted, reactive } from 'vue'
import ApiClient from '../api'

const apiClient = new ApiClient()
const books = reactive<Book[]>([])

onMounted(async () => {
  try {
    const response: Book[] = await apiClient.get<Book[]>('BOOKS')
    if (response) {
      books.push(...response)
    }
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <ul class="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-3">
    <li
      v-for="book in books"
      :key="book.id + book.title"
      class="group w-96 h-20 flex items-center gap-3 px-4 rounded-md opacity-75 bg-[#f3f3fd] ease-linear transition-all duration-100 hover:scale-105 hover:cursor-pointer hover:opacity-100"
    >
      <span class="group-hover:font-bold">
        {{ book.id }}
      </span>
      <span class="group-hover:font-bold">
        {{ book.title }}
      </span>
    </li>
  </ul>
</template>
