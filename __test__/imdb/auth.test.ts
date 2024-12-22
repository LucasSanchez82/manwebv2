import { it, expect, describe } from 'bun:test'

describe('auth', () => {
  it('should return a true', async () => {
    const url = 'https://api.themoviedb.org/3/authentication'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.IMDB_API_KEY}`,
      },
    }

    const response = await fetch(url, options)
    const result = await response.json()
    expect(result.success).toBeTrue()
  })
})
