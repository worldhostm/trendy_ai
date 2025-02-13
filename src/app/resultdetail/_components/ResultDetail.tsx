'use client'

import React, { useEffect, useState } from 'react'
import styles from './ResultDetail.module.css';
import Tile from '@/app/srchresult/_components/Tile';
import { useSearchParams } from 'next/navigation';
import { useWindowWidth } from '@/app/common/_components/_libs/useWindowWidth';

// 검색 결과 상세페이지
export default function ResultDetail() {
    // const {resultData,relresultData, setresultData} = useLanguage();
    const innerWidth = useWindowWidth();
    const searchparam = useSearchParams();
    const resultType = searchparam.get("type");
    const [resultData, setResultData] = useState<any>(() => {
    const storedResult = localStorage.getItem("result");
    return storedResult ? JSON.parse(storedResult) : null;
    });

    const [relresultData, setRelresultData] = useState<any>(() => {
    const storedRelResult = localStorage.getItem("relresults");
    return storedRelResult ? JSON.parse(storedRelResult) : null;
    });

    useEffect(() => {
    console.info("resultData가 비어있는가?", !resultData);
    console.info("relresultData가 비어있는가?", !relresultData);

    // ✅ `resultData`와 `relresultData`가 없을 때만 localStorage에서 값 가져오기
    if (!resultData && !relresultData) {
        const storedResult =
        resultType === "related"
            ? localStorage.getItem("relresults")
            : localStorage.getItem("result");

        console.info("저장된 데이터 확인:", storedResult);

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
    // const sampleData = Array.from({ length: 10 }, (_, index) => ({
    //     serviceTitle: `타일 제목 ${index + 1}`,
    //     description: `첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄`,
    //     hashtags: ["React", "CSSModules", "Component", "Tile"],
    //     url:''
    //   }));

    
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
        {/* { */}
        {
         (resultType ==='rslt' ? resultData : relresultData) && (resultType ==='rslt' ? resultData : relresultData)
         .map((e:any,idx:number)=>
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
