'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Ghost, ArrowLeft, RotateCcw, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FallbackProps } from 'react-error-boundary'

export default function FallbackGhost({
  error,
  resetErrorBoundary: reset,
}: FallbackProps) {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (error) {
      console.error('Unhandled error:', error)
    }
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="relative w-full max-w-2xl">
        <motion.div
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="perspective-1000 transform rounded-2xl border border-white border-opacity-20 bg-white bg-opacity-10 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col items-center text-white">
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="mb-6"
            >
              <Ghost className="drop-shadow-glow h-24 w-24 text-blue-200" />
            </motion.div>
            <h2 className="mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-center text-4xl font-bold text-transparent">
              Oops! A Ghost in the Machine
            </h2>
            <p className="mb-8 text-center text-xl text-blue-100">
              {"Don't be spooked! Our code exorcists are on the case."}
            </p>
            <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
              <Button
                onClick={reset}
                variant="default"
                className="flex w-full items-center justify-center border-none bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600 sm:w-auto"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Banish the ghost
              </Button>
              <Button
                onClick={() => (window.location.href = '/')}
                variant="outline"
                className="flex w-full items-center justify-center border-white border-opacity-50 bg-white bg-opacity-20 text-white hover:bg-opacity-30 sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Return to safety
              </Button>
            </div>
          </div>
        </motion.div>

        {process.env.NODE_ENV === 'development' && error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-4 overflow-hidden rounded-xl bg-black bg-opacity-50"
          >
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="ghost"
              className="flex w-full items-center justify-between px-4 py-2 text-blue-300 hover:bg-black hover:bg-opacity-40 hover:text-blue-100"
            >
              <span>Spectral analysis</span>
              <motion.div animate={{ rotate: showDetails ? 180 : 0 }}>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </Button>
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4"
                >
                  <p className="mb-2 break-all font-mono text-sm text-white">
                    {error.message || 'Unknown spectral activity'}
                  </p>
                  {(error as any).digest && (
                    <p className="font-mono text-sm text-gray-300">
                      Ectoplasmic residue: {(error as any).digest}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
