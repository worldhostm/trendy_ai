'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useRef, useState } from 'react'
import style from './aiSupDetail.module.css';
import ReadOnlyStarRating from '@/app/common/_components/ReadOnlyStartRating';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/app/common/_components/LanguageContext';

interface Detail {
    category: string;
    url: string;
    name: string;
    company: string;
    description: string;
    instructions: string[];
    alternative : {serviceTitle:string, description:string, order:number}[]
  }

export default function AiSupDetail() {
    const {language} = useLanguage();
    const {name} = useParams<{name:string}>();
    const [detail , setDetail] = useState<Detail>();
    // const [error, setError] = useState<string | null>(null);
    // const [loading, setLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState('/default_service.png');
    const [hashtags,setHashtag] = useState([]);
    // const hashtags = ['#해시태그','#해시태그','#해시태그','#해시태그','#해시태그','#해시태그','#해시태그','#해시태그','#해시태그','#해시태그'];
    const router =  useRouter();

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
        scrollRef.current.style.cursor = "grabbing"; // 드래그 중 손모양 변경
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        if (scrollRef.current) scrollRef.current.style.cursor = "grab";
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (scrollRef.current) scrollRef.current.style.cursor = "grab";
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // 드래그 이동 속도 조절
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    useEffect(() => {
        setImgSrc(`/api/service-page-image/${name}`);
        const fetchItems = async () => {
            console.info(name);
        try {
            const response = await fetch(`/api/detail-service/${language}/${name}`,{
            });  // API 호출
            if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
            }
            const data = await response.json();  // JSON 데이터 파싱
            setDetail(data);  // 데이터 상태 업데이트
            setHashtag(data.hashtags);
            console.info(data.hashtags);
        } catch (err: unknown) {
            // setError(err.message);  // 에러 상태 업데이트
            console.error(err);
        } 
        };

        fetchItems();  // 함수 호출
    },[]);  // 컴포넌트 마운트 시 한 번만 실행

  return (
    <Suspense>
        <div className={style.container}>
            {/* 회사명 */}
            <div 
                className={`${style.menupath} bodyS`}
            >
                <div>홈</div>
                <div>
                    <Image src="/leftnavi.svg" alt="navi" width={16} height={16} />
                </div>
                <div>
                    전체 카테고리
                </div>
                <div>
                    <Image src="/leftnavi.svg" alt="navi" width={16} height={16} />
                </div>
                <div>
                    {detail?.name}
                </div>
            </div>
            {/* 서브헤더 */}
            <div className={style.title}>
                <span>
                    {detail?.name}
                </span>
            </div>
            {/* 이미지 및 요약 */}
            <div className={style.topcontainer}>
                <div className={style.flex1}>
                {/* /default_service.png */}
                    <Image 
                    src={imgSrc} 
                    width={462} height={260} 
                    alt={`${name}`}
                    onError={()=>setImgSrc('/default_service.png')}
                    />
                    <div 
                        className={style.hashtagdiv}
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {
                            hashtags.map((e,idx)=>(
                                <div 
                                key={e +'$$$' + idx}
                                className={`${style.hashtag} bodyM`}>{e}</div>
                            ))
                        }
                    </div>
                </div>
                <div className={style.flex2}>
                    <div className={style.borderdiv}>
                        <div className={style.summarydiv}>
                            <div className={style.sumt}>
                                Summary
                            </div>
                            <div className={`${style.desc_sum} bodyM`}>
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
                    <Link 
                    className={style.sumbutton}
                    href ={`${detail?.url}`}
                    target='_blank'
                    >서비스 이동
                    </Link>
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
                <div className={`${style.description} bodyM`}>
                {detail?.description}
                </div>
            </div>
            {/* 유사한서비스 */}
            <div className={style.featuredContainer}>
                <div className={style.subtitle}>이 서비스와 유사한 서비스들</div>
                {
                    detail?.alternative.map((e,idx)=>
                            <div
                            key={e.serviceTitle + '$$' + idx}
                            className={style.featured}
                            >
                                <span className={style.order}>
                                {e.order}.
                                </span>
                                <span 
                                className={`${style.fname} bodyMixed`}
                                onClick={()=>router.push(`/detail/${e.serviceTitle}`)}
                                > {e.serviceTitle} : </span>
                                <div className={`${style.f_desc} bodyM`}>
                                    {e.description ? e.description:'설명글이 없습니다'}
                                </div>
                            </div>
                    )
                }
            </div>
            {/* 관련뉴스 */}
            <div className={style.newsContainer}>
                <div className={style.subtitle}>관련 뉴스</div>
                <Link href='#' className={style.newsrow}>
                    <div className={`${style.newsTitle} titleS`}>뉴스 기사 제목</div>
                    <div className={`${style.from} bodyM`}>출처</div>
                </Link>
            </div>
        </div>
    </Suspense>
  )
}
