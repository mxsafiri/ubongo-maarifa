import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './design-system/Button'
import { Loading } from './design-system/Loading'
import { cn } from '@/lib/utils'

interface MediaUploaderProps {
  onUpload: (files: File[]) => Promise<void>
  accept?: Record<string, string[]>
  maxFiles?: number
  maxSize?: number
}

export function MediaUploader({
  onUpload,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    'video/*': ['.mp4', '.webm'],
    'audio/*': ['.mp3', '.wav'],
    'application/pdf': ['.pdf'],
  },
  maxFiles = 10,
  maxSize = 10485760, // 10MB
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true)
      try {
        // Initialize progress for each file
        const progress: Record<string, number> = {}
        acceptedFiles.forEach((file) => {
          progress[file.name] = 0
        })
        setUploadProgress(progress)

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            const next = { ...prev }
            Object.keys(next).forEach((fileName) => {
              if (next[fileName] < 100) {
                next[fileName] += Math.random() * 30
                if (next[fileName] > 100) next[fileName] = 100
              }
            })
            return next
          })
        }, 500)

        await onUpload(acceptedFiles)

        // Ensure all progress bars reach 100%
        setUploadProgress((prev) => {
          const next = { ...prev }
          Object.keys(next).forEach((fileName) => {
            next[fileName] = 100
          })
          return next
        })

        clearInterval(progressInterval)
        setTimeout(() => {
          setUploadProgress({})
          setIsUploading(false)
        }, 1000)
      } catch (error) {
        console.error('Upload failed:', error)
        setIsUploading(false)
        setUploadProgress({})
      }
    },
    [onUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
  })

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          'relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-surface-200 bg-surface-50 p-6 text-center transition-colors hover:bg-surface-100 dark:border-surface-800 dark:bg-surface-950 dark:hover:bg-surface-900',
          isDragActive && 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
        )}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className="text-4xl">📁</div>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            {isDragActive
              ? 'Drop files here...'
              : 'Drag and drop files here, or click to select files'}
          </p>
          <p className="text-xs text-surface-400 dark:text-surface-500">
            Supported files: Images, Videos, Audio, PDF
          </p>
          <p className="text-xs text-surface-400 dark:text-surface-500">
            Max file size: {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
      </div>

      <AnimatePresence>
        {Object.keys(uploadProgress).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 space-y-2"
          >
            {Object.entries(uploadProgress).map(([fileName, progress]) => (
              <div key={fileName} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate">{fileName}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
                  <motion.div
                    className="h-full bg-primary-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
