import markdownit from 'markdown-it'
import shiki from '@shikijs/markdown-it'

const renderer = markdownit()

renderer.use(
  await shiki({
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    }
  })
)

export { renderer }
