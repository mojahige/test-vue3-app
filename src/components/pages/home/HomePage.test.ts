import { render, screen } from '@testing-library/vue'
import HomePage from './HomePage.vue'
import { router } from '@/router'

vi.mock('vue-router/auto-routes', async (importOriginal) => {
  const originalModule = await importOriginal<typeof import('vue-router/auto-routes')>()

  type Route = (typeof originalModule)['routes'][number]

  const routes: Pick<Route, 'name' | 'path'>[] = [
    {
      name: '/',
      path: '/'
    },
    {
      name: '/a',
      path: '/a'
    },
    {
      name: '/b',
      path: '/b'
    }
  ]

  return {
    ...originalModule,
    routes
  }
})

afterEach(() => {
  vi.clearAllMocks()
})

test('Render routes link', () => {
  render(HomePage, {
    global: {
      plugins: [router]
    }
  })

  // exclude route
  expect(
    screen.queryByRole('link', {
      name: '/'
    })
  ).not.toBeInTheDocument()

  // displayed route
  expect(screen.getAllByRole('link')).toHaveLength(2)

  expect(
    screen.getByRole('link', {
      name: '/a'
    })
  ).toBeInTheDocument()
  expect(
    screen.getByRole('link', {
      name: '/b'
    })
  ).toBeInTheDocument()
})
