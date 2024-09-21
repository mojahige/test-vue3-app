<script setup lang="ts">
import type { OnMessageEvent } from '@/workers/html-2-markdown'
import MemoPreview from './MemoPreview.vue'
import MemoTextarea from './MemoTextarea.vue'
import { html2MarkdownWorker } from '@/workers'
import { onBeforeUnmount, ref, watch } from 'vue'

const markdownContent = ref('')
const htmlContent = ref('')

watch(markdownContent, () => {
  html2MarkdownWorker.postMessage(markdownContent.value)
})

function onWorkerMessage(event: OnMessageEvent) {
  htmlContent.value = event.data
}

html2MarkdownWorker.addEventListener('message', onWorkerMessage)

onBeforeUnmount(() => {
  html2MarkdownWorker.terminate()
})
</script>

<template>
  <div class="MemoEditor">
    <div>
      <MemoTextarea v-model="markdownContent" />
    </div>
    <hr />
    <div>
      <MemoPreview :content="htmlContent" />
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
