<script setup lang="ts">
import type { OnMessageEvent } from '@/workers/html-2-markdown'
import MemoEditorPreview from './MemoEditorPreview.vue'
import MemoEditorTextarea from './MemoEditorTextarea.vue'
import { html2MarkdownWorker } from '@/workers'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const markdownContent = ref('')
const htmlContent = ref('')

watch(markdownContent, () => {
  html2MarkdownWorker.postMessage(markdownContent.value)
})

function onWorkerMessage(event: OnMessageEvent) {
  htmlContent.value = event.data
}

function onInput(value: string) {
  markdownContent.value = value
}

onMounted(() => {
  html2MarkdownWorker.addEventListener('message', onWorkerMessage)
})

onBeforeUnmount(() => {
  html2MarkdownWorker.removeEventListener('message', onWorkerMessage)
})
</script>

<template>
  <div class="MemoEditor">
    <div>
      <MemoEditorTextarea @input="onInput" />
    </div>
    <hr />
    <div>
      <MemoEditorPreview :content="htmlContent" />
    </div>
  </div>
</template>

<style scoped>
.MemoEditor {
  display: grid;
  grid-template: '. . .' 50dvh / 1fr auto 1fr;
  gap: 0.5rem;

  & > div > * {
    height: 100%;
  }
}
</style>
