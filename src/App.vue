<script setup lang="ts">

  import { RouterLink } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <nav>
    <RouterLink to ="/human">Play Against Human</RouterLink>
    <RouterLink to ="/ai">Play Against an AI Opponent</RouterLink>
    <RouterLink to ="/cpu">Watch Two AIs Play</RouterLink>
  </nav>

  <NavBar />
  
  <main>
    <RouterView />
  </main>
  
</template>

<style>

</style>