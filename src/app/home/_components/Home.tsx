'use client'
import React, { Suspense, useEffect, useState } from 'react';
import styles from './home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CategoryImage from '@/app/common/_components/ImageComponent';
// import Link from 'next/link';

interface Service {
    serviceTitle: string;
    url: string;
    editorComment: string;
    order: number;
  }
  
  interface Category {
    categoryName: string;
    logo: string;
    editorPick: boolean;
    service: Service[];
  }

  // 소스에서 href에 노출되는 데이터를 숨기고 아웃링크를 태운다.
  const handleClick = (url:string, title?:string) => {
    const nurl = process.env.NEXT_PUBLIC_ENV_VAR === 'develop' ? `/detail/${title}`: url
    window.open(nurl, "_blank", "noopener,noreferrer");
  };

export default function Home() {
    const [language] = useState<"en"|"ko">("en"); // 기본값: 영어
    const [items, setItems] = useState<Category[]>([]);  // 데이터를 저장할 상태
    const [isfocus,setisfocus] = useState<boolean>(false);
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            router.push(`/srchresult?query=${query}`);
        }
      };

    useEffect(() => {
        const fetchItems = async () => {
        try {
            const response = await fetch(`/api/all-category/${language}`,{
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
            setItems(data);  // 데이터 상태 업데이트
        } catch (err: unknown ) {
            console.error(err);
            // setError(err.message);  // 에러 상태 업데이트
        } finally {
            // setLoading(false);  // 로딩 상태 종료
        }
        };

        fetchItems();  // 함수 호출
    }, [language]);  // 컴포넌트 마운트 시 한 번만 실행
    // process.env.NEXT_PUBLIC_ENV_VAR==='develop'
    return (
        <Suspense>
            <div className={`${styles.container}`}>
                <div className={`${styles.input_container}`}>
                    <input 
                        className={styles.input}
                        type="text" 
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={()=>setisfocus(true)}
                        onBlur={()=>setisfocus(false)}
                    
                    />
                    <div 
                    className={`${styles.image_container}`}
                    onClick={()=>router.push(`/srchresult?query=${query}`)}
                    >
                        <Image src={'/gradientglass.svg'} width={24} height={24} alt="gradientglass"/>
                    </div>
                    {
                    (!isfocus && !query) && 
                        <Image src={'/searchforai.svg'} className={styles.searchforai} width={94} height={24} alt='searchforai' />
                    }
                </div>
                <div className={styles['grid-container']}>
                {
                items 
                ?
                items.sort((a,b)=>{
                    const priorityCategories = ["Beauty", "Creative Content", "Face Creator"];
                    const aIndex = priorityCategories.indexOf(a.categoryName);
                    const bIndex = priorityCategories.indexOf(b.categoryName);
    
                    if (aIndex === -1 && bIndex === -1) return 0; // 둘 다 우선순위 X → 변경 없음
                    if (aIndex === -1) return 1; // A가 우선순위 X → 뒤로
                    if (bIndex === -1) return -1; // B가 우선순위 X → 앞으로
                    return aIndex - bIndex; // 우선순위 배열 내 순서대로 정렬
                }).map((item,index) => (
                    <div key={`${item.categoryName}`} className={styles['grid-item']}>
                    {/* Top Section */}
                    <div className={styles['top-section']}>
                        <div className={styles.topimgdiv}>
                        {/* /category_default.svg */}
                                 {/* <Image src= alt="Thumbnail" className={styles['top-image']} width={32} height={32}/> */}
                            <CategoryImage 
                            category={`${item.categoryName}`}
                            className={styles['top-image']}
                            type='category'
                            />
                            <span className={`${styles['top-text']} titleM`}>{`${item.categoryName}`}</span>
                        </div>
                        {
                            // 상위 3개 에디터픽 표시
                            index < 3 &&
                                <div className={`${styles.editorpick}`}>
                                    <Image  src={'/editorpick.svg'} width={16} height={16} alt="editorpick"/>
                                    <span className='bodyS' style={{whiteSpace:'nowrap', fontWeight:400}}>
                                        Editor Pick
                                    </span>
                                </div>
                        }
                    </div>
                    {/* 에디터픽 나올떄까지 임시 */}
                            <div 
                                className={`${index < 3 ? styles.midinner :styles.midinner_normal}`}
                            >
                                <div className={`${styles.mid}`}>
                                {/* Mid Section */}
                                    {
                                        item.service && item.service.map(e=>
                                            <div
                                            key={`${e.serviceTitle} ${index}`}
                                            className={styles['mid-section']}
                                            // href={`/detail/${e.serviceTitle}`}
                                            onClick={()=>{handleClick(e.url,e.serviceTitle)}}
                                            // target='_blank'
                                            // onClick={()=>router.push(`/detail/${e.serviceTitle}`)}
                                            >
                                                <div 
                                                className={styles['mid-item']}
                                                >
                                                    <div 
                                                        className={styles.midcontent}
                                                    >
                                                        <div className={`${styles.ranknum} ${e.order < 4 && styles.top3} titleS`}>{e.order}</div>
                                                        {/* <img src={e.logo} alt="Logo" className={styles['mid-logo']} /> */}
                                                        <span className='titleS'>{e.serviceTitle}</span>
                                                    </div>
                                                    {/* 상위 3개만 노출 @todo 임시 */}
                                                    {
                                                        index < 3 &&
                                                            <div className={styles.midcontent2}>
                                                                <div className={`${styles.ranknum}`} 
                                                                style={{backgroundColor:'transparent', color:'transparent'}}>{e.order}</div>
                                                                <div 
                                                                className='bodyM' 
                                                                style={{
                                                                    fontWeight:400
                                                                }}>{e.editorComment}</div>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                    </div>
                ))
                :<div> 데이터가 없습니다.</div>
                }
                </div>
            </div>
        </Suspense>
        )
}
