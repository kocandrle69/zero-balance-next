import { Suspense } from 'react'
import MediaContent from './MediaContent'

export default function MediaPage() {
  return (
    <Suspense>
      <MediaContent />
    </Suspense>
  )
}