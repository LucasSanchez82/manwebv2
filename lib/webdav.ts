import { AuthType, createClient, WebDAVClient } from 'webdav'

const globalForPrisma = globalThis as unknown as { webdav: WebDAVClient }

export const webdav =
  globalForPrisma.webdav ||
  createClient(process.env.WEBDAV_URL!, {
    authType: AuthType.Password,
    username: process.env.WEBDAV_USER,
    password: process.env.WEBDAV_PASS,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.webdav = webdav
