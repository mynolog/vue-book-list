<script setup lang="ts">
import type { Book } from '../types/book'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import ApiClient from '../api'
import { getBookDetailEndpoint } from '../utilis/apiUtils'

const apiClient = new ApiClient()
const route = useRoute()
const book = reactive<Book>({
  id: 0,
  title: '',
  author: '',
  publishYear: 0,
  description: '',
})
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const { id } = route.params
    const bookId = Array.isArray(id) ? id[0] : id

    if (!bookId) {
      error.value = '유효한 책 ID가 아닙니다.'
      return
    }

    const endpoint = getBookDetailEndpoint(bookId)

    if (!endpoint) {
      error.value = '책을 찾을 수 없습니다.'
      return
    }

    const response: Book = await apiClient.get(endpoint)
    if (response) {
      Object.assign(book, response)
    } else {
      error.value = '책 데이터가 없습니다.'
    }
  } catch (err) {
    error.value = '책 정보를 가져오는 중에 오류가 발생했습니다.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="isLoading" class="w-[65%] h-72 bg-gray-200 rounded-md animate-pulse"></div>

  <div v-else>
    <div v-if="error" class="text-red-500 p-4">
      <p>{{ error }}</p>
    </div>

    <div v-else class="h-72 bg-[#f3f3fd] rounded-md p-4">
      <div class="flex mb-2 mt-10">
        <strong class="mr-2 w-28">책 ID</strong> <span>{{ book.id }}</span>
      </div>
      <div class="flex mb-2">
        <strong class="mr-2 w-28">제목</strong> <span>{{ book.title }}</span>
      </div>
      <div class="flex mb-2">
        <strong class="mr-2 w-28">저자</strong> <span>{{ book.author }}</span>
      </div>
      <div class="flex mb-2">
        <strong class="mr-2 w-28">출판 연도</strong> <span>{{ book.publishYear }}</span>
      </div>
      <div class="flex">
        <strong class="mr-2 w-28">설명</strong> <span>{{ book.description }}</span>
      </div>
    </div>
  </div>
</template>
