'use client'

import React, { useEffect, useState } from 'react'
import styles from './ResultDetail.module.css';
import Tile from '@/app/srchresult/_components/Tile';
import { useSearchParams } from 'next/navigation';
import { useWindowWidth } from '@/app/common/_components/_libs/useWindowWidth';
import { ResultItem } from '@/app/srchresult/_components/SrchResult';
import { serviceStore } from '@/store/serviceStore';

// 검색 결과 상세페이지
export default function ResultDetail() {
    const {selectedCategories} = serviceStore.getState();
    const innerWidth = useWindowWidth();
    const searchparam = useSearchParams();
    const resultType = searchparam.get("type");
    const [resultData, setResultData] = useState<ResultItem[] | null>(() => {
    const storedResult = localStorage.getItem("result");
    return storedResult ? JSON.parse(storedResult) : null;
    });

    const [relresultData] = useState<ResultItem[] | null>(() => {
    const storedRelResult = localStorage.getItem("relresults");
    return storedRelResult ? JSON.parse(storedRelResult) : null;
    });

    useEffect(() => {
    // ✅ `resultData`와 `relresultData`가 없을 때만 localStorage에서 값 가져오기
    if (!resultData && !relresultData) {
        const storedResult =
        resultType === "related"
            ? localStorage.getItem("relresults")
            : localStorage.getItem("result");

            // rslt
            // simple

        if (storedResult) {
            try {
                const parsedResult = JSON.parse(storedResult);
                setResultData(parsedResult);
            } catch (error) {
                console.error("JSON 파싱 오류:", error);
            }
        }
    }
    },[]);
    
    return (
    <div className={`${styles.container}`}>
        <div className={`${styles.title} ${innerWidth > 768 ? `titleL`: `titleS`}`}>
            {
                resultType === 'rslt' 
                ? '검색 결과'
                : resultType === 'simple'
                ? '간편 검색 결과'
                : resultType === 'related'
                ? '연관 검색 결과'
                :''
            }
        </div>
        {/* 검색 조건 */}
        <div className={`${styles.conditions}`}>
            {
                selectedCategories.map(e=><div className={`${styles.condition} bodyS`}>{e}</div>)
            }
        </div>
        <div className={`${styles.grid_container}`}>
        {
         (resultType ==='rslt' ? resultData : relresultData)?.map((e,idx)=>
            <Tile
                key={e.serviceTitle + '$$' + idx}
                title={e.serviceTitle}
                content={e.description}
                hashtags={e.hashtags}
                url={e.url}
            />
        )}
        </div>
    </div>
  )
}
