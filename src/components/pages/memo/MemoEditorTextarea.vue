<script setup lang="ts">
const emit = defineEmits<{
  (e: 'input', value: string): void
}>()

function emitInput(event: Event) {
  const { target } = event

  if (!(target instanceof HTMLTextAreaElement)) {
    return
  }

  emit('input', target.value)
}
</script>

<template>
  <textarea @input="emitInput" />
</template>

<style scoped>
textarea {
  width: 100%;
  padding: 0.5rem;
  font-family: monospace;
  resize: none;
}
</style>
