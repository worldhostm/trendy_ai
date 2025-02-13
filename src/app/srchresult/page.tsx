import React, { Suspense } from 'react'
import SrchResult from './_components/SrchResult'

export default function page() {
  return (
    <Suspense>
      <SrchResult />
    </Suspense>
  )
}
