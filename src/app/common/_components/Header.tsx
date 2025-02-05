'use client'

import React from 'react';
import styles from './header.module.css';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    return (
        <div style={{
            width : '100vw',
            backgroundColor : 'white'
        }}>
            <header className={styles['header-container']}>
            <a
            href='/' 
            className={styles['logo-section']}>
                <img src="/static/logo/trendyai_logo.svg" alt="Company Logo" className={styles['logo-image']} width={20} height={20}/>
                <span className={styles['company-name']}>트랜디 AI</span>
            </a>
            <nav className={styles['menu-section']}>
                <ul className={styles['menu-list']}>
                <li className={styles['menu-item']} onClick={()=>router.push('/')}>전체 카테고리</li>
                {/* <li className={styles['menu-item']} onClick={()=>router.push('/esysrch')}>AI 간편검색</li>
                <li className={styles['menu-item']}>AI 상세검색</li>
                <li className={styles['menu-item']} onClick={()=>router.push('/news')}>뉴스 페이지</li>
                <li className={styles['menu-item']}>콘텐츠 </li> */}
                </ul>
            </nav>
            </header>
        </div>
      );
}
