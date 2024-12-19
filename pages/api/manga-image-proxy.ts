import type { NextApiRequest, NextApiResponse } from 'next'

interface ErrorResponse {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer | ErrorResponse>
) {
  const { image } = req.query

  if (!image || typeof image !== 'string') {
    return res.status(400).json({ error: 'Image URL is required' })
  }

  try {
    const response = await fetch(
      'https://mangadex.org/covers/' + decodeURIComponent(image),
      {
        headers: {
          'User-Agent': 'Your-App-Name/1.0.0',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    const buffer = await response.arrayBuffer()

    // Définir les headers pour l'image
    console.log('test')
    res.setHeader('Content-Type', contentType || 'image/*')
    res.setHeader('Cache-Control', 'public, max-age=31536000')

    return res.send(Buffer.from(buffer))
  } catch (error) {
    console.error('Image proxy error:', error)
    return res.status(500).json({ error: 'Failed to fetch image' })
  }
}
