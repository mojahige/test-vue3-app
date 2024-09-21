import { renderer } from '@/markdown'

export type OnMessageEvent = MessageEvent<string>

function handleMessage(event: OnMessageEvent) {
  try {
    self.postMessage(renderer.render(event.data))
  } catch (error: unknown) {
    if (error instanceof Error && /language .* not found/i.test(error.message)) {
      return
    }
  }
}

self.addEventListener('message', handleMessage)
