'use client'

import React, { Suspense } from 'react'
import EasySearch from './_components/EasySearch'

export default function page() {
  return (
    <Suspense>
      <EasySearch />
    </Suspense>
  )
}
