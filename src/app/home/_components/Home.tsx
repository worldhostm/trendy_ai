'use client'
import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import { useRouter } from 'next/navigation';

interface AIItem {
    category: string;
    url: string;
    name: string;
    order: number;
  }

export default function Home() {
    const [items, setItems] = useState([]);  // 데이터를 저장할 상태
    // const [loading, setLoading] = useState<boolean>(true);  // 로딩 상태
    // const [error, setError] = useState<string | null>(null);  // 에러 상태
    const router = useRouter();

    useEffect(() => {
        const fetchItems = async () => {
        try {
            const response = await fetch(`/api/all-service`,{
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
        } catch (err: any) {
            console.error(err);
            // setError(err.message);  // 에러 상태 업데이트
        } finally {
            // setLoading(false);  // 로딩 상태 종료
        }
        };

        fetchItems();  // 함수 호출
    }, []);  // 컴포넌트 마운트 시 한 번만 실행
    
    // const gridItems = [
    //     { id: 1, image: '/path/to/image1.jpg'
    //         , rank: [
    //             { cid:1,rank: 1, logo:'/static/caredoc_logo.svg' ,name: 'Company One', url: '#' },
    //             { cid:2,rank: 1, logo:'/static/caredoc_logo.svg' ,name: 'Company One', url: '#' },
    //             { cid:3,rank: 1, logo:'/static/caredoc_logo.svg' ,name: 'Company One', url: '#' },
    //             { cid:4,rank: 1, logo:'/static/caredoc_logo.svg' ,name: 'Company One', url: '#' }
    //         ]
    //         , logo: '/static/caredoc_logo.svg'
    //         , companyName: 'Company One'
    //         , link: '#' 
    //     },
    //     { id: 2, image: '/path/to/image2.jpg', rank: [{ cid:11,rank: 2, logo:'/static/caredoc_logo.svg' ,name: 'Company Two', url: '#' }], logo: '/static/caredoc_logo.svg', companyName: 'Company Two', link: '#' },
    //     { id: 3, image: '/path/to/image3.jpg', rank: [{ cid:12,rank: 3, logo:'/static/caredoc_logo.svg' ,name: 'Company Three', url: '#' }], logo: '/static/caredoc_logo.svg', companyName: 'Company Three', link: '#' },
    //     // Add more items as needed
    //   ];
    return (
        <div className={styles['grid-container']}>
        {Object.entries(items).map(([category,items]) => (
            <div key={`${category}`} className={styles['grid-item']}>
            {/* Top Section */}
            <div className={styles['top-section']}>
                {/* <img src={item.image} alt="Thumbnail" className={styles['top-image']} /> */}
                <span className={styles['top-text']}>{`${category}`}</span>
            </div>
            <div className={styles.mid}>
            {/* Mid Section */}
                {
                    (items as AIItem[]).map((item,idx)=>
                    <div
                    // href={`/detail/${item.url}`}
                    // href={`/detail/${item.name}`}
                    key={`${item.name} ${idx}`}
                    className={styles['mid-section']}
                    onClick={()=>router.push(`/detail/${item.name}`)}
                    >
                        <div className={styles['mid-item']}>
                            <div 
                                className={styles.midcontent}
                            >
                                <div className={`${styles.ranknum} ${item.order < 4 && styles.top3}`}>{item.order}</div>
                                {/* <img src={e.logo} alt="Logo" className={styles['mid-logo']} /> */}
                                <span>{item.name}</span>
                            </div>
                            {/* <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="ArrowSquareOut">
                                <g id="Vector">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.875 3.75C13.875 3.33579 14.2108 3 14.625 3H20.25C20.6642 3 21 3.33579 21 3.75V9.375C21 9.78921 20.6642 10.125 20.25 10.125C19.8358 10.125 19.5 9.78921 19.5 9.375V4.5H14.625C14.2108 4.5 13.875 4.16421 13.875 3.75Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M20.7803 3.21967C21.0732 3.51256 21.0732 3.98744 20.7803 4.28033L14.0303 11.0303C13.7374 11.3232 13.2626 11.3232 12.9697 11.0303C12.6768 10.7374 12.6768 10.2626 12.9697 9.96967L19.7197 3.21967C20.0126 2.92678 20.4874 2.92678 20.7803 3.21967Z" fill="black"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.43934 6.43934C3.72064 6.15804 4.10217 6 4.5 6H10.5C10.9142 6 11.25 6.33579 11.25 6.75C11.25 7.16421 10.9142 7.5 10.5 7.5L4.5 7.5L4.5 19.5H16.5V13.5C16.5 13.0858 16.8358 12.75 17.25 12.75C17.6642 12.75 18 13.0858 18 13.5V19.5C18 19.8978 17.842 20.2794 17.5607 20.5607C17.2794 20.842 16.8978 21 16.5 21H4.5C4.10218 21 3.72065 20.842 3.43934 20.5607C3.15804 20.2794 3 19.8978 3 19.5V7.5C3 7.10217 3.15804 6.72064 3.43934 6.43934Z" fill="black"/>
                                </g>
                                </g>
                                </svg>
                            </div> */}
                        </div>
                    </div>
                    )
                }
            </div>

            {/* Bottom Section */}
            {/* {
                items.length > 10 &&
                <div className={styles['bottom-section']}>
                    <button className={styles['bottom-button']}>더보기</button>
                </div>
            } */}
            </div>
        ))}
        </div>
    );
}
