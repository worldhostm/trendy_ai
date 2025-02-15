'use client'

import React from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// import MobileSideMenu from './MobileSideMenu';

export default function Header() {
    const router = useRouter();
    return (
        <div style={{
            width : '100vw',
            backgroundColor : 'white',
            borderBottom: '1px solid #ddd',
        }}>
            <header className={styles['header-container']}>
            <Link
            href='/' 
            className={styles['logo-section']}>
                <Image src="/31ais_logo.svg" alt="Company Logo" className={styles['logo-image']} width={100} height={100} priority={false} />
                {/* <span className={styles['company-name']}>트랜디 AI</span> */}
            </Link>
            <nav className={styles['menu-section']}>
                {
                    //  임시 @todo
                    process.env.NEXT_PUBLIC_ENV_VAR === 'develop'
                    ?
                    <ul className={styles['menu-list']}>
                        <li className={`${styles['menu-item']} titleM`} onClick={()=>router.push('/')}>전체 카테고리</li>
                        <li className={`${styles['menu-item']} titleM`} onClick={()=>router.push('/esysrch')}>간편검색</li>
                    {/*<li className={styles['menu-item']}>AI 상세검색</li>
                    <li className={styles['menu-item']} onClick={()=>router.push('/news')}>뉴스 페이지</li>
                    <li className={styles['menu-item']}>콘텐츠 </li> */}
                    </ul>
                    :
                    <ul className={styles['menu-list']}>
                    {/* <li className={`${styles['menu-item']} titleM`} onClick={()=>router.push('/')}>전체 카테고리</li>
                        <li className={`${styles['menu-item']} titleM`} onClick={()=>router.push('/esysrch')}>간편검색</li> */}
                    {/*<li className={styles['menu-item']}>AI 상세검색</li>
                    <li className={styles['menu-item']} onClick={()=>router.push('/news')}>뉴스 페이지</li>
                    <li className={styles['menu-item']}>콘텐츠 </li> */}
                    </ul>
                }
            </nav>
            {/* <Image src="/list.svg" alt='list' width={24} height={24} onClick={()=>setisOpen(!isOpen)}/> */}
            </header>
            {/* {isOpen && <MobileSideMenu />} */}
        </div>
      );
}
