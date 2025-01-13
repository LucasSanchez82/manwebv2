import { it, expect, describe } from 'bun:test'
import { getFilmFromTmdbAction } from '@/lib/actions/external/tmdb/tmdb.action'

describe('auth', () => {
  it('should return a json object of a result', async () => {
    expect(await getFilmFromTmdbAction('gossi')).toBeDefined()
  })
})
