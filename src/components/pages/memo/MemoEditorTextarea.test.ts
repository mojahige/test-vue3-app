import { render, screen, fireEvent } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import MemoEditorTextarea from './MemoEditorTextarea.vue'

test('renders a MemoEditorTextarea', () => {
  render(MemoEditorTextarea)

  expect(screen.getByRole('textbox')).toBeInTheDocument()
})

test('emit', async () => {
  const user = userEvent.setup()
  const onInput = vi.fn()

  render(MemoEditorTextarea, {
    props: {
      onInput
    }
  })

  const textarea = screen.getByRole('textbox')

  await user.type(textarea, 'foo')

  expect(onInput).toHaveBeenCalledTimes(3) // !
  expect(onInput).toBeCalledWith('foo')

  onInput.mockClear()

  await fireEvent.update(textarea, 'foo')

  expect(onInput).toHaveBeenCalledTimes(1)
  expect(onInput).toBeCalledWith('foo')
})
