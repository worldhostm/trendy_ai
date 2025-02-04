'use client'

import React from 'react'
import AiSupDetail from './_components/AiSupDetail'
import { useParams } from 'next/navigation';

export default function page() {
    const params = useParams();
    const name = params?.name;  // URL에서 name 파라미터 추출
    console.info(name);
  return (
    <AiSupDetail />
  )
}
