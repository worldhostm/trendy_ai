import React, { Suspense } from 'react'
import ResultDetail from './_components/ResultDetail'

export default function page() {
  return (
    <Suspense>
      <ResultDetail />
    </Suspense>
  )
}
