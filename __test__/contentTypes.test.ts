import contentypesUtilities from '@/lib/contentTypes.utils'
import {
  contentTypesValues,
  ContentTypeKey,
  contentTypes,
} from '@/prisma/constant'
import { describe, expect, it } from 'bun:test'

describe('contentTypes.utils', () => {
  it('should return all content type ids available', () => {
    const expectedIds = contentTypesValues.map((type) => type.id)
    expect(contentypesUtilities.allContentTypesIdsAvailable).toEqual(
      expectedIds
    )
  })

  it('should return type id from key', () => {
    const key: ContentTypeKey = 'manga'
    const expectedId = contentTypes[key].id
    expect(contentypesUtilities.getTypeIdFromKey(key)).toBe(expectedId)
  })

  it('should return key from id', () => {
    const id = 1
    expect(contentypesUtilities.getKeyFromId(id)).toBe('manga')
  })

  it('should return many keys from ids string', () => {
    const ids = '1,2,3'
    expect(contentypesUtilities.getManyKeysFromStr(ids)).toEqual([
      'manga',
      'film',
      'serie',
    ])
  })

  it('should return void array when ids string is empty', () => {
    expect(contentypesUtilities.getManyKeysFromStr('')).toEqual([])
  })
})
