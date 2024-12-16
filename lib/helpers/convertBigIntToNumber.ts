const convertBigIntToNumber = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToNumber)
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === 'bigint' ? Number(value) : convertBigIntToNumber(value),
    ])
  )
}

export default convertBigIntToNumber
