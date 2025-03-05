<script setup lang="ts">
import BookDetail from '../components/BookDetail.vue'
import NavigateButton from '../components/NavigateButton.vue'
</script>

<template>
  <div class="flex justify-center items-start gap-5">
    <navigate-button />
    <book-detail />
  </div>
</template>
