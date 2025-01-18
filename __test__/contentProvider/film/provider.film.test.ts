import { describe, expect, it } from 'bun:test'

describe('provider.film', async () => {
  it('should return all content type ids available', async () => {
    const url = 'https://api.themoviedb.org/3/authentication?query=harry'
    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGRjYWFkZDc3NTU3NWMxNDgzYzU2OTliY2NkYjBkNiIsIm5iZiI6MTU5ODY5MTg1Ny40MDIsInN1YiI6IjVmNGExYTExYTFhOWJhMDAzMzViNTMwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3oOmej8Z_MqzAaedT5bhDS7jxn_AwzXxkF_y9MglJIc',
      },
    }

    const response = await fetch(url, options)
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json.success).toBeTrue()
  })
})
