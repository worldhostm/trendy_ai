'use client'

import React, { Suspense, useEffect, useState } from 'react';
import styles from './easySearch.module.css';
import Image from 'next/image';
import { useWindowWidth } from '@/app/common/_components/_libs/useWindowWidth';
import { useLanguage } from '@/app/common/_components/LanguageContext';
import { serviceStore } from '@/store/serviceStore';
import { useRouter } from 'next/navigation';
import AnimatedCounter from '@/app/common/_components/AnimatedNumber';
import Loading from '@/app/common/_components/Loading';

interface AIServiceCategory {
  categoryName: string;
  logo: string;
}

export default function EasySearch() {
  const {setselectedCategories,selectedCategories} = serviceStore.getState();
  useEffect(() => {
  }, [selectedCategories])
  
  const {language} = useLanguage();
  const innerWidth = useWindowWidth();
  const [category, setcategory] = useState<AIServiceCategory[]>([]);
  const [selectedCtgry, setselectedCtgry] = useState<string[]>([]);
  const [resultCount,setresultCount] = useState<number>(0);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const router = useRouter();

  // useEffect(() => {
  //   setselectedCategories(selectedCtgry);
  // }, [selectedCtgry])
  
  // 카테고리 리스트 api
  const fetchCategory = async () => {
    try {
        const response = await fetch(`/api/all-category`,{
            method:'POST',
            body : JSON.stringify({short:true, lang:language}),
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin':'*'
            }
        });  // API 호출
        if (!response.ok) {
        throw new Error('네트워크 응답에 문제가 있습니다.');
        }
        const catedata = await response.json();  // JSON 데이터 파싱
        setcategory(catedata);
    } catch (err: unknown ) {
        console.error(err);
        // setError(err.message);  // 에러 상태 업데이트
    } finally {
        setLoading(false);  // 로딩 상태 종료
    }
  };

  // 검색된 갯수를 리턴해주는 api 
  const fetchFunc = async () => {
    setLoading(true);
    try {
        const response = await fetch(`/api/category-count`,{
            method:'POST',
            body : JSON.stringify({category: selectedCtgry, lang:language}),
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
        setresultCount(data);
    } catch (err: unknown ) {
        console.error(err);
        // setError(err.message);  // 에러 상태 업데이트
    } finally {
        setLoading(false);  // 로딩 상태 종료
    }
    };

    useEffect(() => {
        fetchCategory();
        setselectedCategories('');
    }, []);

    useEffect(() => {
      fetchFunc();
      setselectedCategories(selectedCtgry);
    }, [selectedCtgry]);

  return (
        <Suspense>
        <div className={styles.container}>
          <div className={styles.esrch_container}>
            <div className={`${styles.grid_container}`}>
              <div className={styles.title_container}>
                <div className={`${styles.title} titleM`}>Quick Search</div>
                <div className={`${styles.cntnts} bodyM`}>
                  {/* 하단 카테고리를 선택하여 필요한 AI를 찾아보세요. */}
                  Select a category below to find the AI you need
                  </div>
              </div>
              <div className={styles.esrchgrid}>
                {
                  category.map((e,idx)=>(
                    selectedCtgry.includes(e.categoryName)
                    ?
                    <div
                      key={e + '$$' + idx}
                      className={`${styles.grid_item_outer}`}
                    >
                      <div 
                        key={e + '$$' + idx}
                        // className={`${ styles.grid_item}`}
                        className={`${ styles.grid_item}`}
                        style={{
                          padding : '19px 23px'
                        }}
                        onClick={()=>setselectedCtgry((prev)=>{
                            const newValue = [...prev, e.categoryName]
                            if(prev.includes(e.categoryName)){
                              return prev.filter((ele) => ele !== e.categoryName);
                            }
                            return newValue;
                          })
                        }
                      >
                          <div className={`${styles.categoryname} ${innerWidth > 768 ? `titleM` : `titleS`}`}>{e.categoryName}</div>
                          <div className={`${styles.categoryimg}`} style={{marginTop:'1px'}}><Image src={e.logo} width={40} height={40} alt="defulatcate"/></div>
                        </div>
                    </div>
                    : 
                      <div 
                        key={e + '$$' + idx}
                        className={`${styles.grid_item}`}
                        onClick={() => setselectedCtgry((prev) => {
                          const newValue = [...prev, e.categoryName];
                            if (prev.includes(e.categoryName)) {
                                return prev.filter((ele) => ele !== e.categoryName);
                            }
                            setselectedCategories(newValue);
                            return newValue;
                          })
                        }
                      >
                        {/* <div className={`${ category.includes(e) && styles.grid_item}`}> */}
                          <div className={`${styles.categoryname} ${innerWidth > 768 ? `titleM` : `titleS`}`}>{e.categoryName}</div>
                          <div className={`${styles.categoryimg}`}><Image src={e.logo} width={40} height={40} alt="defulatcate"/></div>
                        {/* </div> */}
                      </div>
                  ))
                }
              </div>
            </div>
          </div>
          {
          innerWidth > 768 &&
          <div className={`${styles.result_container}`}>
            <div className={`${styles.resultinner_container}`}>
            <div className={`${ styles.number_container} titleM`}><span className={`${styles.srchnumber} headlineL`}><AnimatedCounter targetValue={resultCount}/></span>AIs</div>
              <div className='titleM'>have been selected.</div>
              <div className={`${styles.likebtn} titleM ${resultCount === 0 && styles.backgroundGray}`} onClick={()=>resultCount !== 0 && router.push(`/resultdetail?type=simple`)}>Check AI Services </div>
              <div className={`${styles.result_bottom_container}`}>
                <div><Image src="/ArrowCounterClockwise.svg" width={20} height={20} alt="ArrowCounterClockwise"/></div>
                <div className='bodyM' onClick={()=>setselectedCtgry([])}>Reset</div>
              </div>
            </div>
          </div>
        }
        {/* {
          innerWidth < 768 &&
          <div className={`${styles.mobileResult}`}>
              <div 
              className={`${styles.button2} titleM`}
              onClick={()=>resultCount !== 0 && router.push(`/resultdetail?type=simple`)}
              style={{borderRadius:'20px', height:'40px', padding:'unset', marginBottom:'12px'}}
              >{resultCount} AIs Check AI Services</div>
          </div>
        } */}
        {
          innerWidth < 768 &&
            <div className={styles.mobileBottom}>
              <div className={`${styles.button1} titleM`}>Reset</div>
              <div 
              className={`${styles.button2} titleM ${resultCount === 0 && styles.backgroundGray}`}
              onClick={()=>resultCount !== 0 && router.push(`/resultdetail?type=simple`)}
              > Check {resultCount} AI Services</div>
            </div>
        }
      </div>
      {loading && <Loading />}
      </Suspense>
  )
}
