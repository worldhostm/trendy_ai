'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import style from './aiSupDetail.module.css';
import ReadOnlyStarRating from '@/app/common/_components/ReadOnlyStartRating';

interface Detail {
    category: string;
    url: string;
    name: string;
    company: string;
    description: string;
    instructions: string[];
    alternative : {name:string, description:string, order:number}[]
  }

export default function AiSupDetail() {
    const {name} = useParams<{name:string}>();
    const [detail , setDetail] = useState<Detail>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router =  useRouter();
    useEffect(() => {
        const fetchItems = async () => {
        try {
            const response = await fetch(`/api/detail-service/${name}`,{
                // method:'GET',
                // headers : {
                //     'Accept' : 'application/json',
                //     'Content-Type' : 'application/json',
                //      'Access-Control-Allow-Origin':'*'
                // },
                // body: JSON.stringify({name:name.name}),
            });  // API 호출
            if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
            }
            const data = await response.json();  // JSON 데이터 파싱
            setDetail(data);  // 데이터 상태 업데이트
        } catch (err: any) {
            setError(err.message);  // 에러 상태 업데이트
        } finally {
            setLoading(false);  // 로딩 상태 종료
        }
        };

        fetchItems();  // 함수 호출
    });  // 컴포넌트 마운트 시 한 번만 실행

  return (
    <div className={style.container}>
        {/* 회사명 */}
        <div style={{
            marginTop:'20px',
            marginBottom:'20px'
        }}>홈 메뉴</div>
        {/* 서브헤더 */}
        <div className={style.title}>
            <span>
                {detail?.name}
            </span>
        </div>
        {/* 이미지 및 요약 */}
        <div className={style.topcontainer}>
            <div className={style.flex1}>
                <img src="/default_service.png"/>
            </div>
            <div className={style.flex2}>
                <div className={style.borderdiv}>
                    <div className={style.summarydiv}>
                        <div className={style.sumt}>
                            Summary
                        </div>
                        <div className={style.desc_sum}>
                            {detail?.description}
                        </div>
                    </div>
                </div>
                <div className={style.suminner}>
                    <div className={style.score}>Score</div>
                    <div className={style.rating}>
                        <ReadOnlyStarRating rating={3.5}/>
                        <div>3.5</div>
                    </div>
                </div>
                <a 
                className={style.sumbutton}
                href ={`${detail?.url}`}
                >서비스 이동
                </a>
            </div>
        </div>
        {/* 장문 설명 */}
        <div className={style.descContainer}>
            <div className={style.desc_cname}>{detail?.company}</div>
            <div className={style.grborder}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1152" height="2" viewBox="0 0 1152 2" fill="none">
                <path d="M0 1H1152" stroke="url(#paint0_linear_15652_2783)"/>
                <defs>
                    <linearGradient id="paint0_linear_15652_2783" x1="0" y1="1.5" x2="1152" y2="1.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#006AFF"/>
                    <stop offset="1" stopColor="#D682FF"/>
                    </linearGradient>
                </defs>
                </svg>
            </div>
            <div className={style.description}>
            {detail?.description}
            </div>
        </div>
        {/* 유사한서비스 */}
        <div className={style.featuredContainer}>
            <div className={style.subtitle}>이 서비스와 유사한 서비스들</div>
            {
                detail?.alternative.map((e,idx)=>
                        <div
                        key={e.name + '$$' + idx}
                        className={style.featured}
                        >
                            <span className={style.order}>
                            {e.order}.
                            </span>
                            <span  className={style.fname}> {e.name} : </span>
                            <div className={style.f_desc}>
                                {e.description}
                            </div>
                        </div>
                )
            }
        </div>
        {/* 관련뉴스 */}
        <div className={style.newsContainer}>
            <div className={style.subtitle}>관련 뉴스</div>
            <div className={style.newsrow}>
                <div className={style.newsTitle}>뉴스 기사 제목</div>
                <div>출처</div>
            </div>
            <div className={style.newsrow}>
                <div className={style.newsTitle}>뉴스 기사 제목</div>
                <div>출처</div>
            </div>
            <div className={style.newsrow}>
                <div className={style.newsTitle}>뉴스 기사 제목</div>
                <div>출처</div>
            </div>
            <div className={style.newsrow}>
                <div className={style.newsTitle}>뉴스 기사 제목</div>
                <div>출처</div>
            </div>
            <div className={style.newsrow}>
                <div className={style.newsTitle}>뉴스 기사 제목</div>
                <div>출처</div>
            </div>
            <div className={style.newsrow}>
                <div className={style.newsTitle}>뉴스 기사 제목</div>
                <div>출처</div>
            </div>
            <div className={style.newsrow}>
                <div className={style.newsTitle}>뉴스 기사 제목</div>
                <div>출처</div>
            </div>
            <div className={style.newsrow}>
                <div className={style.newsTitle}>뉴스 기사 제목</div>
                <div>출처</div>
            </div>
            <div className={style.newsrow}>
                <div className={style.newsTitle}>뉴스 기사 제목</div>
                <div>출처</div>
            </div>
        </div>
    </div>
  )
}
