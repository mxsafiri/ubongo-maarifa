import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from './design-system/Card'
import { Button } from './design-system/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './design-system/Dialog'

export type ResourceType = 'document' | 'presentation' | 'assignment' | 'quiz' | 'video' | 'link'

export interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  url: string
  courseId?: string
  createdAt: Date
  updatedAt: Date
  size?: number
  downloadCount?: number
  status: 'draft' | 'published' | 'archived'
}

interface ResourceCardProps {
  resource: Resource
  onEdit?: (resource: Resource) => void
  onDelete?: (id: string) => void
  onView?: (resource: Resource) => void
}

export function ResourceCard({ resource, onEdit, onDelete, onView }: ResourceCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case 'document':
        return '📄'
      case 'presentation':
        return '📊'
      case 'assignment':
        return '📝'
      case 'quiz':
        return '❓'
      case 'video':
        return '🎥'
      case 'link':
        return '🔗'
      default:
        return '📄'
    }
  }

  const formatSize = (bytes?: number) => {
    if (!bytes) return 'N/A'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className="group h-full cursor-pointer transition-all hover:shadow-soft-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                <div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-sm text-surface-500">{resource.description}</p>
                </div>
              </div>
              <div className="flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                {onView && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onView(resource)
                    }}
                  >
                    View
                  </Button>
                )}
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit(resource)
                    }}
                  >
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowDeleteDialog(true)
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4 text-xs text-surface-500">
              <div className="flex items-center gap-1">
                <span>Size:</span>
                <span className="font-medium">{formatSize(resource.size)}</span>
              </div>
              {resource.downloadCount !== undefined && (
                <div className="flex items-center gap-1">
                  <span>Downloads:</span>
                  <span className="font-medium">{resource.downloadCount}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <span>Created:</span>
                <span className="font-medium">{formatDate(resource.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Updated:</span>
                <span className="font-medium">{formatDate(resource.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Status:</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    resource.status === 'published'
                      ? 'bg-success-100 text-success-700'
                      : resource.status === 'draft'
                      ? 'bg-surface-100 text-surface-700'
                      : 'bg-surface-100 text-surface-700'
                  }`}
                >
                  {resource.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog
        open={showDeleteDialog}
        onOpenChange={(open) => setShowDeleteDialog(open)}
      >
        <DialogContent onClose={() => setShowDeleteDialog(false)}>
          <DialogHeader>
            <DialogTitle>Delete Resource</DialogTitle>
          </DialogHeader>
          <p className="text-surface-600">
            Are you sure you want to delete &quot;{resource.title}&quot;? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                onDelete?.(resource.id)
                setShowDeleteDialog(false)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
