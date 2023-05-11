import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('My aplicacion deberia funcionar como espero', async () => {
  const user = userEvent.setup()
  const app = render(<App />)

  // obtenemos el textarea -> es al que le haremos este test
  const textAreaFrom = app.getByPlaceholderText('Introduce el texto')

  await user.type(textAreaFrom, 'Hola Mundo')
  const result = await app.findByDisplayValue(
    /Hello World/i,
    {},
    {
      timeout: 3000,
    }
  )

  expect(result).toBeTruthy()
})
