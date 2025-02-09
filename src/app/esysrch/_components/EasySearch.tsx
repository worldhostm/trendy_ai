'use client'
import React from 'react'
import  styles from './easySearch.module.css';
import Image from 'next/image';

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


console.log(aiCategories);

export default function EasySearch() {
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
              aiCategories.map(e=>(
              <div className={`${styles.grid_item}`}>
                <div className={`titleM`}>{e.category}</div>
                <div className={`${styles.categoryimg}`}><Image src={'/category_default.svg'} width={40} height={40} alt="defulatcate"/></div>
              </div>
              ))
            }
          </div>
        </div>
        <div className={`${styles.result_container}`}>
          <div>
            adsadsads
          </div>
        </div>
      </div>
    </div>
  )
}
