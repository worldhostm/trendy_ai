'use client'

import React, { Suspense, useEffect, useState } from 'react'
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
// import Loading from '@/app/common/_components/Loading';

// 검색 결과 상세페이지
export default function ResultDetail() {
    // const [loading ,setloading] = useState(true);
    const {language} = useLanguage();
    const {selectedCategories,setselectedCategories, relatedsrchresults, srchresults} = serviceStore.getState();
    const innerWidth = useWindowWidth();
    const searchParam = useSearchParams();
    const resultType = searchParam.get("type") as 'rslt' | 'related' | 'simple' | null;
    const [resultData, setResultData] = useState<ResultItem[] | null>(resultType === 'rslt'? srchresults : resultType === 'related'? relatedsrchresults:[]);
    const [viewCount, setviewCount] = useState(1);
    const router = useRouter();

    const searchTypes = {
        ko: {
          rslt: "검색결과",
          related: "연관 검색 결과",
          simple: "간편 검색 결과",
        },
        en: {
          rslt: "Search Result",
          related: "Related Search Result",
          simple: "Quick Search Result",
        },
      };
    const subtitles = {en:'Provides the most relevant services based on the AI service description and search query.',ko:'AI 서비스의 설명을 토대로 검색어와 가장 관련 높은 서비스를 제공'}
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
        setTimeout(()=>{
            // setloading(false);
        }, 1000)
        if(resultType === "simple"){
            fetchSimple();
        }
    },[]);


    
    return (
    <Suspense>
    {
        // !loading
        // ?
        <div className={`${styles.container}`}>
            <div className={`${styles.title} ${innerWidth > 768 ? `titleL`: `titleS`}`}>
                {
                    resultType &&
                    searchTypes[language][resultType]
                }
            </div>
            {
                resultType === 'related' &&
                    <div className={`${styles.subtitle}`}> 
                        {
                            subtitles[language]
                        }
                    </div>
            }
            {/* 검색 조건 */}
            {
                resultType ==='simple' && 
                    <div className={`${styles.conditions}`}>
                        <div 
                        className={styles.resetbtn}
                        onClick={()=>{
                            router.push('/esysrch');
                            setselectedCategories([]);
                        }
                        }
                        >
                            <span className="pretendard-bold" style={{width:'73px', }}>
                                Reset
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
                (resultData && resultData.length > 0)
                ?
                resultData.slice(0,viewCount * 9).map((e,idx)=>
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
                (resultData && resultData.length > 9) && (resultData && resultData.length > viewCount * 9 )
                &&
                <div className={`${styles.morebtn}`} onClick={()=>setviewCount(viewCount+1)}>View More</div>
            }
        </div>
        // :<Loading />
    }
    </Suspense>
  )
}
