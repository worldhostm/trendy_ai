'use client'

import React, { Suspense, useState } from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useWindowWidth } from './_libs/useWindowWidth';
import SideMenu from './SideMenu';

// import MobileSideMenu from './MobileSideMenu';

export default function Header() {
    const innerWidth = useWindowWidth();
    const path = usePathname();
    const searchParam = useSearchParams().get('type');
    const [isOpen, setisOpen] = useState(false);
    const router = useRouter();
    return (
        <Suspense>
            <div style={{
                width : '100vw',
                backgroundColor : 'white',
                borderBottom: '1px solid #ddd',
            }}>
                <header className={styles['header-container']}>
                <Link
                href='/' 
                className={styles['logo-section']}>
                    <Image src="/31ais_logo.svg" alt="Company Logo" className={styles['logo-image']} width={74} height={24} priority={false} />
                    {/* <span className={styles['company-name']}>트랜디 AI</span> */}
                </Link>
                <nav className={styles['menu-section']}>
                    {
                        //  임시 @todo
                        process.env.NEXT_PUBLIC_ENV_VAR === 'develop'
                        ?
                        <ul className={styles['menu-list']}>
                            <li className={`${styles['menu-item']} titleM ${(path==='/') && 'selected'}`} onClick={()=>router.push('/')}>All Categories</li>
                            <li className={`${styles['menu-item']} titleM ${(path.includes('esysrch') || searchParam ==='simple') && `selected`}`} onClick={()=>router.push('/esysrch')}>Quick Search</li>
                        {/*<li className={styles['menu-item']}>AI 상세검색</li>
                        <li className={styles['menu-item']} onClick={()=>router.push('/news')}>뉴스 페이지</li>
                        <li className={styles['menu-item']}>콘텐츠 </li> */}
                        </ul>
                        :
                        <ul className={styles['menu-list']}>
                            <li className={`${styles['menu-item']} titleM ${(path==='/') && 'selected'}`} onClick={()=>router.push('/')}>All Categories</li>
                            <li className={`${styles['menu-item']} titleM ${(path.includes('esysrch') || searchParam ==='simple') && `selected`}`} onClick={()=>router.push('/esysrch')}>Quick Search</li>
                        </ul>
                    }
                </nav>
                {
                    innerWidth < 769 &&
                    <Image src="/list.svg" alt='list' width={24} height={24} onClick={()=>setisOpen(!isOpen)} style={{zIndex:999}}/>
                }
                </header>
                {
                    (innerWidth < 769 && isOpen) &&
                    <SideMenu isOpen={isOpen}/>
                }
            </div>
        </Suspense>
      );
}
