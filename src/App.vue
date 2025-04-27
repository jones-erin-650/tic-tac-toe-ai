<script setup lang="ts">

  import { RouterLink } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>

<template>
  
  <main class="text-center dark:bg-gray-800 min-h-screen dark:text-white">
    <NavBar />


    <RouterView />

  </main>
  
</template>

<style>

</style>