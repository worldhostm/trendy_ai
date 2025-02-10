'use client'
import React from 'react';
import styles from './footer.module.css';
import { useWindowWidth } from './_libs/useWindowWidth';
import Image from 'next/image';

export default function Footer() {
    const innerWidth = useWindowWidth();
  return (
    <div style={{
        borderTop:'1px solid #E0E0E0',
        width: '100%',
        height:'auto',
        display:'flex',
        justifyContent:'center',
        padding : '40px 120px',
        position:'relative'
    }}>
        <div style={{
            width:'1200px', height:'auto',
            display:'flex',
            flexDirection:'column',
            gap:'28px',
        }}>
            <div>
                <Image src="/31ais_logo.svg" alt="Company Logo" className={styles['logo-image']} width={72} height={24} priority={false} />
            </div>
            <div 
            className={`${styles.upper_container} bodyS`}
            >
                <div>
                    Find your AI solution <br/>
                    Contact. trndynow@gmail.com   <br/>
                    {innerWidth < 768 && <br/>}
                    We are currently testing our MVP and will continue to develop our products to make it easier to find AI services. Stay tuned.
                </div>
                <div 
                className={`bodyS ${styles.under_container}`}
                >
                ©️ CWC all rights reservd
                </div>
            </div>
        </div>
    </div>
  )
}
