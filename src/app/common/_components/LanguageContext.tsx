'use client'
import { ResultItem } from "@/app/srchresult/_components/SrchResult";
import React, { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from "react";

// 1. 지원할 언어 타입 정의
type Language = "en" | "ko";

// 4. Context에서 사용할 값 타입 정의
interface LanguageContextProps {
  language: Language;
  switchLanguage: (lang: Language) => void;
  //검색 결과 
  resultData : ResultItem[];
  setresultData : Dispatch<SetStateAction<ResultItem[]>>;
  // 연관 검색 결과
  relresultData : ResultItem[];
  setrelresultData : Dispatch<SetStateAction<ResultItem[]>>;
}

// 5. Context 생성 (초기값은 `undefined`, Provider에서 값 제공)
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// 6. Provider 컴포넌트 정의
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en"); // 기본 언어 설정
  const [resultData, setresultData] = useState<ResultItem[]>([]); // Initialize with empty array
  const [relresultData, setrelresultData] = useState<ResultItem[]>([]); // Initialize with empty array

  // 언어 변경 함수
  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, setresultData, resultData, setrelresultData, relresultData}}>
      {children}
    </LanguageContext.Provider>
  );
};

// 7. Custom Hook (Context 사용을 쉽게 하기 위해)
export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
