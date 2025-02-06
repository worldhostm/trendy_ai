'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function MobileSideMenu() {
    const router = useRouter();
  return (
    <div style={{
        position:'absolute',
        width : '100vw',
        height : '100vh',
        backgroundColor : 'white',
        zIndex : 9999,
        padding : '0px 20px',
        top:0
    }}>
        <div 
        className='titleM'
        onClick={()=>router.push('/')}>전체 메뉴</div>
    </div>
  )

}
