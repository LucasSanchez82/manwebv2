export const fileToBase64 = async (files: FileList) => {
  console.log('in fileToBase64')
  const file = files[0]
  const reader = new FileReader()

  return new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      const base64 = reader.result as string
      console.log('base64 reussit', base64)
      resolve(base64)
    }
    reader.onerror = () => {
      console.error(reader.error)
      return reject(
        new Error("Impossible de lire l'image pour la convertir en base64")
      )
    }
    reader.readAsDataURL(file) // Converts to base64
  })
}
