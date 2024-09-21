<script setup lang="ts">
const { content } = defineProps<{
  content: string
}>()
</script>

<template>
  <div class="MemoPreview" v-html="content" />
</template>

<style scoped>
.MemoPreview {
  all: revert;

  & > :first-child {
    margin-top: 0 !important;
  }

  & > :last-child {
    margin-bottom: 0;
  }
}
</style>
