import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },
  compiler: {
    removeConsole: {
      exclude:
        process.env.NODE_ENV === 'production'
          ? [
              'error',
              'warn',
              'info',
              'log',
              'table',
              'trace',
              'time',
              'timeEnd',
              'group',
              'groupEnd',
              'groupCollapsed',
              'count',
              'countReset',
              'assert',
              'clear',
              'profile',
              'profileEnd',
              'debug',
              'dir',
              'dirxml',
              'exception',
              'table',
              'timeLog',
              'context',
              'memory',
              'memoryProfile',
              'memoryProfileEnd',
              'assert',
              'profile',
              'profileEnd',
              'startGroup',
              'startGroupCollapsed',
              'endGroup',
              'table',
              'timeStamp',
              'timeline',
              'timelineEnd',
            ]
          : [],
    },
  },
}

export default nextConfig
