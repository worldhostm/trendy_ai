'use client'

import React, { Fragment } from 'react'
import styles from '@/app/detail/[name]/_components/aiSupDetail.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
export default function MenuPath() {
    const path = usePathname();
    const parr = path.split('/');
  return (
    // 간편검색에만 임시로 처리 
    parr.includes('esysrch') && 
    <Fragment>
        <div 
        className={`${styles.menupath} bodyS`}
        style={{
            width:'1200px',
            paddingLeft : '24px'
        }}
        >
        <div>Main</div>
        <div>
            <Image src="/leftnavi.svg" alt="navi" width={16} height={16} />
        </div>
        <div>
            {parr[1]==='esysrch' && 'Quick Search'}
        </div>
        <div>
            {/* <Image src="/leftnavi.svg" alt="navi" width={16} height={16} /> */}
        </div>
        <div>
            {parr[2]??''}
        </div>
            {parr[3]??''}
        </div>
        {/* 서브헤더 */}
    </Fragment>
  )
}
