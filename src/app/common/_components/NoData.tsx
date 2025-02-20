'use client'

import Image from 'next/image'
import React from 'react'
import styles from '../../srchresult/_components/srchResult.module.css';

export default function NoData() {
  return (
    <div className={`${styles.nodata} bodyL`}>
        <Image src="/31ais_logo.svg" width={80} height={80} alt="logo"/>
        No data available
    </div>
  )
}
