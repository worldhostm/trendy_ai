import React, { Suspense } from 'react'
import ResultDetail from './_components/ResultDetail'
import Loading from '../common/_components/Loading'

export default function page() {
  return (
    <Suspense fallback={<Loading/>}>
      <ResultDetail />
    </Suspense>
  )
}
