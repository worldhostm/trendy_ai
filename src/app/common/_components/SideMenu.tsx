'use client'

import React, { Suspense, useEffect, useState } from 'react'
import styles from './sidemenu.module.css';
import { useRouter } from 'next/navigation';
import { useLanguage } from './LanguageContext';
export default function SideMenu() {
    const {isOpen,setIsOpen} = useLanguage();
    const router = useRouter();
    const [selected] = useState(false);
    return (
        <div className={`${styles.container} ${ !isOpen && styles.inactive }`}>
            <div className={`titleM ${selected && 'selected'}`} onClick={()=>{router.push('/');setIsOpen(false)}}>All Categories</div>
            <div className={`titleM ${selected && 'selected'}`} onClick={()=>{router.push('/esysrch');setIsOpen(false)}}>Quick Search</div>
        </div>
  )
}
