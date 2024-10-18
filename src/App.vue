<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <h1>Test app</h1>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/memo">Memo</RouterLink>
  </nav>
  <hr />
  <RouterView />
</template>

<style scoped></style>
