'use server'

import TMDBResponseSchema from './schema'

export const getFilmFromTmdbAction = async (title: string) => {
  const url = `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=true&language=fr-FR&page=1`
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
  return TMDBResponseSchema.safeParse(result)
}
