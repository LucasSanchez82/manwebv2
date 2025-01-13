import TMDBResponseSchema from '@/lib/actions/external/tmdb/schema'
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
  it('should return a json object of a result', async () => {
    const url =
      'https://api.themoviedb.org/3/search/multi?query=shangri%20la%20frontier&include_adult=true&language=fr-FR&page=1'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGRjYWFkZDc3NTU3NWMxNDgzYzU2OTliY2NkYjBkNiIsIm5iZiI6MTU5ODY5MTg1Ny40MDIsInN1YiI6IjVmNGExYTExYTFhOWJhMDAzMzViNTMwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3oOmej8Z_MqzAaedT5bhDS7jxn_AwzXxkF_y9MglJIc',
      },
    }

    const response = await fetch(url, options)
    const result = await response.json()
    const parsed = TMDBResponseSchema.safeParse(result)
    expect(parsed.success).toBeTrue()
    expect(parsed.data?.results).toBeDefined()
  })

  it('should return a json object of a result', async () => {
    const url =
      'https://api.themoviedb.org/3/search/multi?query=gossip&include_adult=true&language=fr-FR&page=1'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGRjYWFkZDc3NTU3NWMxNDgzYzU2OTliY2NkYjBkNiIsIm5iZiI6MTU5ODY5MTg1Ny40MDIsInN1YiI6IjVmNGExYTExYTFhOWJhMDAzMzViNTMwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3oOmej8Z_MqzAaedT5bhDS7jxn_AwzXxkF_y9MglJIc',
      },
    }

    const response = await fetch(url, options)
    const result = await response.json()
    const parsed = TMDBResponseSchema.safeParse(result)
    console.log(parsed.error)
    console.log(result[19])
    expect(parsed.success).toBeTrue()
    expect(parsed.data?.results).toBeDefined()
  })
})
