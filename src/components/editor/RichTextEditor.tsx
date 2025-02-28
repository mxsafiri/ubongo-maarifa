import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import type ReactQuill from 'react-quill'

// Define types for Quill props
interface QuillProps {
  value: string
  onChange: (value: string) => void
  modules?: any
  formats?: string[]
  theme?: string
  placeholder?: string
  className?: string
}

const QuillNoSSRWrapper = dynamic<QuillProps>(
  async () => {
    const { default: RQ } = await import('react-quill')
    return function ({ ...props }) {
      return <RQ {...props} />
    }
  },
  { ssr: false }
)

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

interface RichTextEditorProps {
  initialValue?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ 
  initialValue = '', 
  onChange,
  placeholder = 'Write your content here...'
}: RichTextEditorProps) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (content: string) => {
    setValue(content)
    onChange?.(content)
  }

  return (
    <QuillNoSSRWrapper
      modules={modules}
      formats={formats}
      theme="snow"
      value={value}
      onChange={handleChange}
      className="h-full"
      placeholder={placeholder}
    />
  )
}
