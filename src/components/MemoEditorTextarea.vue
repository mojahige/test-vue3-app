<script setup lang="ts">
const model = defineModel<string>({ required: true })
</script>

<template>
  <textarea v-model="model" />
</template>

<style scoped>
textarea {
  width: 100%;
  padding: 0.5rem;
  font-family: monospace;
  resize: none;
}
</style>
