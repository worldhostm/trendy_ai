

import React from 'react'
import AiSupDetail from './_components/AiSupDetail'
import { Metadata } from 'next'

export const metadata :Metadata={
  openGraph:{
    description : '매일 새로운 AI를 한 번에! AI솔루션과 인기 생산성 도구를 실시간으로 확인하고 비교할 수 있습니다',
    title:'트렌디 AI',
    images:'',
    url :'https://31ais.com',
    siteName:'Trendy AI',
  },
  title:'Trendy AI',
  description:'매일 새로운 AI를 한 번에! AI솔루션과 인기 생산성 도구를 실시간으로 확인하고 비교할 수 있습니다',
  keywords:'AI 실시간 랭킹, AI, 인공지능, AI 랭킹, 실시간 랭킹, AI 검색, AI 도구, 인공지능 기술, AI 트렌드, AI 서비스, 머신러닝, 딥러닝, AI 플랫폼, AI 비교, 최신 AI, AI 기술 분석, 빅데이터, AI 자동화, 인공지능 소프트웨어, AI 솔루션, AI 개발',
  robots:"index, follow"
}

export default function page() {
  return (
    <AiSupDetail />
  )
}
