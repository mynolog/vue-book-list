<script setup lang="ts">
import { onMounted } from 'vue'
import ApiClient from './api'

onMounted(async () => {
  const apiClient = new ApiClient()

  try {
    const books = await apiClient.get('books')
    console.log(books)
  } catch (error) {
    console.error('Error fetching books', error)
  }
})
</script>

<template></template>
