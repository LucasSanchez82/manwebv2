'use server'

import TMDBResponse from './schema'

const getFilmsTmdbMovies = async (title: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${title}&language=fr-FR&include_adult=true`
  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGRjYWFkZDc3NTU3NWMxNDgzYzU2OTliY2NkYjBkNiIsIm5iZiI6MTU5ODY5MTg1Ny40MDIsInN1YiI6IjVmNGExYTExYTFhOWJhMDAzMzViNTMwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3oOmej8Z_MqzAaedT5bhDS7jxn_AwzXxkF_y9MglJIc',
    },
  }

  const response = await fetch(url, options)
  const result = await response.json()
  return TMDBResponse.parse(result)
}

export default getFilmsTmdbMovies
export type GetTmdbMoviesReturnType = Awaited<
  ReturnType<typeof getFilmsTmdbMovies>
>
