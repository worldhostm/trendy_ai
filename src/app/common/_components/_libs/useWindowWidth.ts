'use client'
import { useState, useEffect } from 'react';

// 커스텀 훅: useWindowWidth
export const useWindowWidth = (): number => {
  // @todo 초기값이 window.innerWidth 값을 가져오지 못해 0으로 설정했을 때 스켈레톤UI가 이상하게 보이는 현상 수정 필요
  // 0일때 768보다 작아서 pc화면에서도 모바일의 스켈레톤이 뜸 임시로 너비 1200으로 설정
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // 초기 실행으로 현재 윈도우 크기 설정
      handleResize();

      // 윈도우 크기 변경 시 업데이트
      window.addEventListener('resize', handleResize);

      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowWidth;
};
