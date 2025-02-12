'use client'

import React, { useEffect } from 'react'
import styles from './ResultDetail.module.css';
import Tile from '@/app/srchresult/_components/Tile';
import { useSearchParams } from 'next/navigation';
import { useWindowWidth } from '@/app/common/_components/_libs/useWindowWidth';


// 검색 결과 상세페이지

export default function ResultDetail() {
    const innerWidth = useWindowWidth();
    console.info(innerWidth);
    const searchParam = useSearchParams();
    const resultType = searchParam.get("type");
    const sampleData = Array.from({ length: 10 }, (_, index) => ({
        serviceTitle: `타일 제목 ${index + 1}`,
        description: `첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄`,
        hashtags: ["React", "CSSModules", "Component", "Tile"]
    }));  

    useEffect(() => {
    
      return () => {}
    }, [resultType])
    
  return (
    <div className={`${styles.container}`}>
        <div className={`${styles.title} ${innerWidth > 768 ? `titleL`: `titleS`}`}>
            {
                resultType ==='rslt' 
                ? '검색 결과'
                : '연관 검색 결과'
            }
            
        </div>
        <div className={`${styles.grid_container}`}>
        {sampleData && sampleData.slice(0,12).map((e,idx)=>
            <Tile
                key={e.serviceTitle + '$$' + idx}  
                title={e.serviceTitle}
                content={e.description}
                hashtags={e.hashtags}
            />
        )}
        </div>
    </div>
  )
}
