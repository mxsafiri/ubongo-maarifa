import { useState } from 'react'
import { Input } from './design-system/Input'
import { Textarea } from './design-system/Textarea'
import { Select } from './design-system/Select'
import { MediaUploader } from './MediaUploader'
import type { Resource, ResourceType } from './ResourceCard'

const resourceTypes = [
  { value: 'document', label: 'Document' },
  { value: 'presentation', label: 'Presentation' },
  { value: 'assignment', label: 'Assignment' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'video', label: 'Video' },
  { value: 'link', label: 'Link' }
]

interface ResourceFormProps {
  initialData?: Partial<Resource>
  onSubmit: (data: Partial<Resource>) => void
  onCancel: () => void
}

export function ResourceForm({ initialData, onSubmit, onCancel }: ResourceFormProps) {
  const [formData, setFormData] = useState<Partial<Resource>>({
    title: '',
    description: '',
    type: 'document',
    status: 'draft',
    ...initialData
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleFileUpload = async (files: File[]) => {
    if (files[0]) {
      setFormData({ ...formData, url: URL.createObjectURL(files[0]) })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-surface-900">
          Title
        </label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-surface-900">
          Description
        </label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Type</label>
        <Select
          value={formData.type || 'document'}
          onChange={(value) => setFormData({ ...formData, type: value as ResourceType })}
          options={resourceTypes}
        />
      </div>

      {formData.type !== 'link' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-surface-900">
            Upload File
          </label>
          <MediaUploader
            onUpload={handleFileUpload}
            accept={{
              'application/pdf': ['.pdf'],
              'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
              'video/*': ['.mp4', '.webm'],
            }}
          />
        </div>
      )}

      {formData.type === 'link' && (
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium text-surface-900">
            URL
          </label>
          <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            required
          />
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
        <Select
          value={formData.status || 'draft'}
          onChange={(value) => setFormData({ ...formData, status: value as Resource['status'] })}
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
            { value: 'archived', label: 'Archived' }
          ]}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Save Resource
        </button>
      </div>
    </form>
  )
}
