<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const navigateTo = () => {
  router.push('/')
}
</script>

<template>
  <button class="font-extrabold text-2xl hover:text-gray-600" @click="navigateTo">&#8592;</button>
</template>
