'use client'

import React, { Suspense, useState } from 'react'
import styles from './sidemenu.module.css';
import { useRouter } from 'next/navigation';
interface Props{
    isOpen : boolean 
}
export default function SideMenu({isOpen}:Props) {
    const router = useRouter();
    const [selected] = useState(false);

  return (
    <Suspense>
        <div className={`${styles.container} ${ !isOpen && styles.inactive }`}>
            <div className={`titleM ${selected && 'selected'}`} onClick={()=>router.push('/')}>All Categories</div>
            <div className={`titleM ${selected && 'selected'}`} onClick={()=>router.push('/esysrch')}>Quick Search</div>
        </div>
    </Suspense>
  )
}
