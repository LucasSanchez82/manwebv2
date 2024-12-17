import { z } from 'zod'
export const profileSchemaForm = z.object({
  name: z
    .string()
    .min(3, { message: 'Doit contenir au moins 3 lettres' })
    .describe('Nom'),
  email: z
    .string()
    .email({ message: "N'est pas détecté comme un email valide" })
    .describe('Email'),
  image: z
    .string()
    .url({
      message:
        " une url doit etre au format: 'https://exemple.com/exemple-ima'",
    })
    .describe('Image'),
})
