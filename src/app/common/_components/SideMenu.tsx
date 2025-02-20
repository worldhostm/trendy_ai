'use client'

import React, { useEffect, useState } from 'react'
import styles from './sidemenu.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
interface Props{
    isOpen : boolean 
}
export default function SideMenu({isOpen}:Props) {
    const router = useRouter();
    const path = usePathname();
    const [selected, setselected] = useState(false);
    const searchParam = useSearchParams().get('type');

    useEffect(()=>{
        if(path.includes('esysrch') || searchParam ==='simple') setselected(true);
    },[])

  return (
    <div className={`${styles.container} ${ !isOpen && styles.inactive }`}>
        <div className={`titleM ${selected && 'selected'}`} onClick={()=>router.push('/')}>All Categories</div>
        <div className={`titleM ${selected && 'selected'}`} onClick={()=>router.push('/esysrch')}>Quick Search</div>
    </div>
  )
}
