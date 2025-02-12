'use client'

import React, { useEffect, useState } from 'react'
import styles from './srchResult.module.css';
import Tile from './Tile';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/app/common/_components/LanguageContext';

// 검색결과, 연관검색결과 아이템 인터페이스
interface ResultItem{
    serviceTitle : string;
    description : string;
    hashtags : string[];
}

export default function SrchResult() {
    const context = useLanguage();
    // 검색 결과 
    const [results, setresults] = useState<ResultItem[]>();
    // 연관 검색결과 
    const [relresults, setrelresults] = useState<ResultItem[]>();

    const [isfocus,setisfocus] = useState<boolean>(false);
    const searchparam = useSearchParams();
    const [query, setQuery] = useState("");
    const router = useRouter();
    
    const sampleData = Array.from({ length: 10 }, (_, index) => ({
        serviceTitle: `타일 제목 ${index + 1}`,
        description: `첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄첫번째 줄`,
        hashtags: ["React", "CSSModules", "Component", "Tile"]
      }));

      
      useEffect(() => {
        // 샘플데이터
        // if(sampleData){
        //     setresults(sampleData);
        //     setrelresults(sampleData);
        //     return;
        // }
        const fetchItems = async () => {
        try {
            const response = await fetch(`/api/search/${context.language}/${searchparam.get("query")}`,{
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
            setresults(data.result);  // 데이터 상태 업데이트
            setrelresults(data.relatedResult);  // 데이터 상태 업데이트
            
        } catch (err: unknown ) {
            console.error(err);
            // setError(err.message);  // 에러 상태 업데이트
        } finally {
            // setLoading(false);  // 로딩 상태 종료
        }
        };
        fetchItems();  // 함수 호출
    }, []);  // 컴포넌트 마운트 시 한 번만 실행

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            router.push(`/srchresult?query=${query}`);
        }
    }; 
  return (
    <div className={`${styles.container}`}>
        {/* 검색창 */}
        <div className={`${styles.input_container}`}>
            <input 
                className={styles.input}
                type="text" 
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={()=>setisfocus(false)}
                onBlur={()=>setisfocus(true)}
                // autoComplete=''
            />
            <div className={`${styles.image_container}`}>
                <Image src={'/gradientglass.svg'} width={24} height={24} alt="gradientglass"/>
            </div>
            {
            (isfocus && !query) &&
                <Image src={'/searchforai.svg'} className={styles.searchforai} width={94} height={24} alt='searchforai' />
            }
        </div>
        {/* 검색창 end */}
         {/* 검색결과 컨테이너 */}
        <div className={`${styles.subtitle} titleM`}>검색결과</div>
        <div className={`${styles.srchrslt_container}`}>
        {results && results.slice(0,3).map((e,idx)=>
            <Tile
                key={e.serviceTitle + '$$' + idx} 
                title={e.serviceTitle}
                content={e.description}
                hashtags={e.hashtags}
            />
        )}
        </div>
        {/* 검색결과더보기버튼 */}
        <div 
        className={`${styles.viewmoreBtn}`}
        onClick={()=>router.push(`/resultdetail?type=rslt`)}
        >
            검색 결과 더보기
            <Image src={'/viewmore.svg'} alt='' width={20} height={20}/>
        </div>
        {/* 연관 검색 결과 컨테이너 */}
        <div className={`${styles.subtitle} titleM`}>연관 검색 결과</div>
        <div className={`${styles.featured_container}`}>
        {relresults && relresults.slice(0,9).map((e,idx)=>
            <Tile
                key={e.serviceTitle + '$$' + idx}  
                title={e.serviceTitle}
                content={e.description}
                hashtags={e.hashtags}
            />
        )}
        </div>
        <div 
        className={`${styles.viewmoreBtn}`}
        onClick={()=>router.push(`/resultdetail?type=related`)}
        >
            연관 검색 결과 더보기
            <Image src={'/viewmore.svg'} alt='' width={20} height={20}/>
        </div>
    </div>
  )
}
