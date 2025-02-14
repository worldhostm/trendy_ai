import React, { Suspense } from 'react'
import SrchResult from './_components/SrchResult'
import Loading from '../common/_components/Loading'

export default function page() {
  return (
    <Suspense fallback={<Loading/>}>
      <SrchResult />
    </Suspense>
  )
}
