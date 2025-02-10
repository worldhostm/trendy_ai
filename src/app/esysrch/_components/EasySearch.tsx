'use client'

import React, { useEffect, useState } from 'react';
import styles from './easySearch.module.css';
import Image from 'next/image';
import { useWindowWidth } from '@/app/common/_components/_libs/useWindowWidth';

interface AIServiceCategory {
  category: string;
}

const aiCategories: AIServiceCategory[] = [
  { category: "Natural Language Processing" },
  { category: "Computer Vision" },
  { category: "Speech Recognition" },
  { category: "Reinforcement Learning" },
  { category: "Generative AI" },
  { category: "Machine Learning Models" },
  { category: "Recommendation Systems" },
  { category: "AI Ethics & Fairness" },
  { category: "Data Annotation & Labeling" },
  { category: "AI Hardware Optimization" },
  { category: "AI-Powered Search Engines" },
  { category: "Robotics & Automation" },
  { category: "AI for Healthcare" },
  { category: "AI for Finance" },
  { category: "AI for Cybersecurity" },
  { category: "AI-Powered Chatbots" },
  { category: "AI-Powered Virtual Assistants" },
  { category: "AI for Autonomous Vehicles" },
  { category: "AI for Supply Chain" },
  { category: "AI for Gaming" },
  { category: "AI for Marketing & Ads" }
];

export default function EasySearch() {
  const innerWidth = useWindowWidth();
  const [selectedCtgry, setselectedCtgry] = useState<AIServiceCategory[]>([]);
  useEffect(() => {
    console.info(selectedCtgry);
  }, [selectedCtgry]);
  
  return (
    <div className={styles.container}>
      <div className={styles.esrch_container}>
        <div className={`${styles.grid_container}`}>
          <div className={styles.title_container}>
            <div className={`${styles.title} titleM`}>Serive Name : Description and images</div>
            <div className={`${styles.cntnts} bodyM`}>하단 카테고리를 선택하여 필요한 AI를 찾아보세요.</div>
          </div>
          <div className={styles.esrchgrid}>
            {
              aiCategories.map((e,idx)=>(
                selectedCtgry.includes(e)
                ?
                <div 
                key={e + '$$' + idx}
                  // className={`${ styles.grid_item}`}
                  className={`${ styles.grid_item}  styles.active} ${selectedCtgry.includes(e) && styles.paddingunset}`}
                  onClick={()=>setselectedCtgry((prev)=>
                    {
                      const newValue = [...prev, e]
                      if(prev.includes(e)){
                      return prev.filter(ele=> ele !== e);
                      }
                      return newValue;
                    })}
                >
                    <div className={`${styles.categoryname} ${innerWidth > 768 ? `titleM` : `titleS`}`}>{e.category}</div>
                    <div className={`${styles.categoryimg}`}><Image src={'/category_default.svg'} width={40} height={40} alt="defulatcate"/></div>
                  </div>
                : 
                <div 
                key={e + '$$' + idx}
                  className={`${ styles.grid_item}`}
                  // className={`${ styles.grid_item} ${selectedCtgry.includes(e) && styles.active} ${selectedCtgry.includes(e) && styles.paddingunset}`}
                  onClick={()=>setselectedCtgry((prev)=>
                    {
                      const newValue = [...prev, e]
                      if(prev.includes(e)){
                      return prev.filter(ele=> ele !== e);
                      }
                      return newValue;
                    })}
                >
                  {/* <div className={`${ selectedCtgry.includes(e) && styles.grid_item}`}> */}
                    <div className={`${styles.categoryname} ${innerWidth > 768 ? `titleM` : `titleS`}`}>{e.category}</div>
                    <div className={`${styles.categoryimg}`}><Image src={'/category_default.svg'} width={40} height={40} alt="defulatcate"/></div>
                  {/* </div> */}
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className={`${styles.result_container}`}>
        <div className={`${styles.resultinner_container}`}>
          <div className={`${ styles.number_container} titleM`}><span className={`${styles.srchnumber} headlineL`}>20</span>개</div>
          <div className='titleM'>AI를 선별하였습니다.</div>
          <div className={`${styles.likebtn} titleM`}>선별된 AI 확인하기</div>
          <div className={`${styles.result_bottom_container}`}>
            <div><Image src="/ArrowCounterClockwise.svg" width={20} height={20} alt="ArrowCounterClockwise"/></div>
            <div className='bodyM'>검색 초기화</div>
          </div>
        </div>
      </div>
      {
        innerWidth < 768 &&
          <div className={styles.mobileBottom}>
            <div className={`${styles.button1} titleM`}>검색 초기화</div>
            <div className={`${styles.button2} titleM`}>선별된 AI 확인하기</div>
          </div>
      }
    </div>
  )
}
