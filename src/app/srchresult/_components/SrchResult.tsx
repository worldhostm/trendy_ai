'use client'

import React, { Suspense, useCallback, useEffect, useState } from 'react'
import styles from './srchResult.module.css';
import Tile from './Tile';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/app/common/_components/LanguageContext';
// import Loading from '@/app/common/_components/Loading';
import { serviceStore } from '@/store/serviceStore';
import Loading from '@/app/common/_components/Loading';

// 검색결과, 연관검색결과 아이템 인터페이스
export interface ResultItem{
    serviceTitle : string;
    description : string;
    hashtags : string[];
    url : string;
}

export default function SrchResult() {
    const {language} = useLanguage();
    // 검색 결과 
    const [results, setresults] = useState<ResultItem[]>([]);
    // 연관 검색결과 
    const [relresults, setrelresults] = useState<ResultItem[]>([]);

    const [isfocus,setisfocus] = useState<boolean>(false);
    const searchparam = useSearchParams();
    const [query, setQuery] = useState(searchparam.get("query")??'');
    const [debouncedQuery, setDebouncedQuery] = useState(""); // ✅ 디바운스된 검색어 상태
    const router = useRouter();
    const {setsrchresults, setrelatedsrchresults,searchTypes} = serviceStore.getState();
    // const sampleData = Array.from({ length: 10 }, (_, index) => ({
    //     serviceTitle: `타일 제목 ${index + 1}`,
    //     description: `첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄`,
    //     hashtags: ["React", "CSSModules", "Component", "Tile"]
    //   }));

    // ✅ fetchItems를 useCallback으로 분리
    const fetchItems = useCallback(async (searchQuery: string) => {
        try {
        const response = await fetch(`/api/search/${language}/${searchQuery}`, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            },
        });

        if (!response.ok) {
            throw new Error("네트워크 응답에 문제가 있습니다.");
        }

        const data = await response.json();
        setsrchresults(data.result);
        setrelatedsrchresults(data.relatedResult);
        setresults(data.result);
        setrelresults(data.relatedResult);
        } catch (err) {
        console.error("API 호출 오류:", err);
        }
    }, [language,query]); // ✅language 변경 시 다시 생성됨

    // 페이지 진입시 쿼리스트링으로 검색
    useEffect(() => {
      fetchItems(query);
    }, [])
    
    // ✅ 사용자가 입력을 멈춘 후 일정 시간 후에 `debouncedQuery` 업데이트
    useEffect(() => {
        const handler = setTimeout(() => {
        setDebouncedQuery(query); // 사용자가 입력을 멈춘 후 `query` 값을 `debouncedQuery`로 업데이트
        }, 500); // 500ms 동안 입력이 없으면 실행

        return () => clearTimeout(handler); // 기존 타이머 취소하여 불필요한 호출 방지
    }, [query]);

    // ✅ useEffect에서 fetchItems 호출
    // useEffect(() => {
    // if (debouncedQuery) {
    //     fetchItems(debouncedQuery);
    // }
    // }, [debouncedQuery]);

    // ✅ fetchItems가 변경될 때마다 실행됨
    // const path = usePathname();
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && debouncedQuery.trim()) {
                fetchItems(debouncedQuery);
            }
    }; 
  return (
    <Suspense fallback={<Loading />}>
        <div className={`${styles.container}`}>
            {/* 검색창 */}
            <div className={`${styles.input_container}`}>
                <input 
                    className={styles.input}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={()=>setisfocus(false)}
                    onBlur={()=>setisfocus(true)}
                    // autoComplete=''
                />
                <div 
                className={`${styles.image_container}`}
                onClick={()=>fetchItems(query)}
                >
                    <Image src={'/gradientglass.svg'} width={24} height={24} alt="gradientglass"/>
                </div>
                {
                (isfocus && !query) &&
                    <Image src={'/searchforai.svg'} className={styles.searchforai} width={94} height={24} alt='searchforai' />
                }
            </div>
            {/* 검색창 end */}
            {/* 검색결과 컨테이너 */}
            {/* 검색 결과 페이지 서브 타이틀 */}
            <div className={`${styles.subtitle} titleM`} style={{marginBottom:'20px'}}>{searchTypes[language]['rslt']}</div>
            <div className={`${styles.srchrslt_container}`}>
            {
            results.length > 0
            ? results.slice(0,3).map((e,idx)=>
                <Tile
                    key={e.serviceTitle + '$$' + idx} 
                    title={e.serviceTitle}
                    content={e.description}
                    hashtags={e.hashtags}
                    url = {e.url}
                    setquery={setQuery}
                />
            )
            :<div className={`${styles.nodata} bodyL`}>
                <Image src="/31ais_logo.svg" width={80} height={80} alt="logo"/>
                No data available
            </div>
            }
            </div>
            {/* 검색결과더보기버튼 */}
            {
                // 3개씩 보여줘서 3 이상이면 View More 버튼 보여줌
                results?.length > 3 &&
                <div 
                className={`${styles.viewmoreBtn}`}
                onClick={()=>router.push(`/resultdetail?type=rslt`)}
                >
                    {/* 검색 결과 View More */}
                    View More
                    <Image src={'/viewmore.svg'} alt='' width={20} height={20}/>
                </div>
            }
            {/* 연관 검색 결과 컨테이너 */}
            <div className={`${styles.subtitle} titleM`}>{searchTypes[language]['related']}</div>
            <div className={`${styles.subtitle_desc} bodyM`}>
            Provides the most relevant services based on the AI service description and search query.
            </div>
            <div className={`${styles.featured_container}`}>
            {
            relresults.length > 0
            ? 
            relresults.slice(0,9).map((e,idx)=>
                <Tile
                    key={e.serviceTitle + '$$' + idx}  
                    title={e.serviceTitle}
                    content={e.description}
                    hashtags={e.hashtags}
                    url={e.url}
                    setquery={setQuery}
                />
            )
            :
            <div className={`${styles.nodata} bodyL`}>
                <Image src="/31ais_logo.svg" width={80} height={80} alt="logo"/>
                No data available
            </div>
            }
            </div>
            {
                relresults.length > 9 &&
                    <div 
                    className={`${styles.viewmoreBtn}`}
                    onClick={()=>router.push(`/resultdetail?type=related`)}
                    >
                        {/* 연관 검색 결과 View More */}
                        View More
                        <Image src={'/viewmore.svg'} alt='' width={20} height={20}/>
                    </div>
            }
        </div>
    </Suspense>
  )
}
