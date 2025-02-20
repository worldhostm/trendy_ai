'use client'

import React, { useEffect, useState } from 'react'
import styles from './ResultDetail.module.css';
import Tile from '@/app/srchresult/_components/Tile';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWindowWidth } from '@/app/common/_components/_libs/useWindowWidth';
import { ResultItem } from '@/app/srchresult/_components/SrchResult';
import { serviceStore } from '@/store/serviceStore';
import { useLanguage } from '@/app/common/_components/LanguageContext';
import CategoryImage from '@/app/common/_components/ImageComponent';
import Image from 'next/image';
import NoData from '@/app/common/_components/NoData';

// 검색 결과 상세페이지
export default function ResultDetail() {
    const {language} = useLanguage();
    const {selectedCategories,setselectedCategories} = serviceStore.getState();
    const innerWidth = useWindowWidth();
    const searchparam = useSearchParams();
    const resultType = searchparam.get("type");
    const [resultData, setResultData] = useState<ResultItem[] | null>(() => {
        const storedResult = resultType ==='rslt' ? window.localStorage.getItem("result") : null;
        return storedResult ? JSON.parse(storedResult) : null;
    });
    const [relresultData] = useState<ResultItem[] | null>(() => {

        const storedRelResult = resultType ==='related' ? window.localStorage.getItem("relresults") : null;
        return storedRelResult ? JSON.parse(storedRelResult) : null;
    });
    const [viewCount, setviewCount] = useState(1);

    // 쿼리스트링 simple일때 간편 검색 
    const fetchSimple = async () => {
        try {
            const response = await fetch(`/api/category-service`,{
                method:'POST',
                body : JSON.stringify({category:selectedCategories, lang:language}),
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Access-Control-Allow-Origin':'*'
                }
            });  // API 호출
            if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
            }
            const data = await response.json();  // JSON 데이터 파싱
            // setItems(data);  // 데이터 상태 업데이트
            setResultData(data)
        } catch (err: unknown ) {
            console.error(err);
            // setError(err.message);  // 에러 상태 업데이트
        } finally {
            // setLoading(false);  // 로딩 상태 종료
        }
        };

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
    if(resultType === "simple"){
        fetchSimple();
    }
    },[]);

    const router = useRouter();

    
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
        {
            resultType ==='simple' && 
                <div className={`${styles.conditions}`}>
                    <div 
                    className={styles.resetbtn}
                    onClick={()=>router.push('/esysrch')}
                    >
                        <span style={{width:'73px', }}>
                            검색 초기화
                        </span>
                        <Image src="/reset.svg" width={16} height={14} alt="reset"/>
                    </div>
                    {

                        selectedCategories &&  selectedCategories.map((e,idx)=>
                            <div 
                            key={e+'$$'+idx}
                            className={`${styles.condition} bodyS`}>
                                <span>
                                    {e}
                                </span>
                                <div style={{width:'24px'}}>
                                    <CategoryImage 
                                        category={e}
                                        size={24}
                                    />
                                </div>
                            </div>
                            )
                    }
                </div>
        }
        <div className={`${styles.grid_container}`}>
        {
            resultData && resultData.length > 0
            ?
            ((resultType ==='rslt' || resultType ==='simple') ? resultData : relresultData)?.slice(0,viewCount * 9).map((e,idx)=>
                <Tile
                    key={e.serviceTitle + '$$' + idx}
                    title={e.serviceTitle}
                    content={e.description}
                    hashtags={e.hashtags}
                    url={e.url}
                />
            )
            :<NoData />
        }
        </div>
        {
            (resultData && resultData.length > 9 || relresultData && relresultData.length > 9) && (resultData && resultData.length > viewCount * 9 )
            ||
            (relresultData && relresultData.length > 9 || relresultData && relresultData.length > 9) && (relresultData && relresultData.length > viewCount * 9 )
            
            &&
            <div className={`${styles.morebtn}`} onClick={()=>setviewCount(viewCount+1)}>더보기</div>
        }
    </div>
  )
}
