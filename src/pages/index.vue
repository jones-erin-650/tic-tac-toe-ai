<script setup lang="ts">
  import { BrowserWindow } from 'electron';
import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()

</script>

<template>
  <main class="pt-8 text-center dark:bg-gray-800 min-h-screen dark:text-white">
    <h1 class="text-7xl font-bold uppercase">Tic Tac Toe</h1>

    <h3 class="text-4xl my-4">Choose An Opponent</h3>

    <div class="flex justify-center gap-4">
      <RouterLink
        to="v/ai"
        class="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold"
      >
        Play with AI
      </RouterLink>
      <button
        class="bg-green-500 text-white px-6 py-3 rounded-lg font-bold cursor-pointer"
        @click="router.push('/v/human')"
      >
        Play with a Human
      </button>
    </div>

   
  </main>
</template>
