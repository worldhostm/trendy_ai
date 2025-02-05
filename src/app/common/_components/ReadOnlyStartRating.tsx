'use client'
import React  from 'react';

interface ReadOnlyStarRatingProps {
    rating: number;
  }
  
export default function ReadOnlyStarRating ({ rating }:ReadOnlyStarRatingProps) {
return (
<div style={{ display: 'flex' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <defs>
              {/* 선형 그라디언트 정의 (절반 채우기) */}
              <linearGradient id={`half-fill-${star}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="#FFD700" />   {/* 왼쪽 절반 금색 */}
                <stop offset="50%" stopColor="#C0C0C0" />   {/* 오른쪽 절반 회색 */}
              </linearGradient>
            </defs>

            <path 
              d="M19.0792 20.3895L19.0792 20.3893L17.8569 14.9015L21.9302 11.2084C21.9303 11.2084 21.9303 11.2083 21.9304 11.2083C23.0068 10.233 22.4745 8.32605 20.9713 8.19977C20.9708 8.19973 20.9704 8.19969 20.9699 8.19965L15.6326 7.72558L13.5392 2.5567C13.5391 2.55635 13.5389 2.55601 13.5388 2.55567C12.9732 1.1481 11.0268 1.14811 10.4612 2.55571C10.4611 2.55604 10.4609 2.55637 10.4608 2.5567L8.36769 7.71333L3.02867 8.18754C1.52545 8.31385 0.993205 10.2208 2.06963 11.196C2.06969 11.1961 2.06974 11.1961 2.0698 11.1962L6.14312 14.8892L4.92083 20.3771L4.92078 20.3773C4.7592 21.1043 5.05615 21.7689 5.55601 22.1493C6.0589 22.532 6.77937 22.6326 7.41694 22.2293C7.41718 22.2291 7.41742 22.229 7.41767 22.2288L11.9995 19.3408L16.5823 22.2411C17.2201 22.645 17.9409 22.5443 18.444 22.1615C18.9438 21.7811 19.2408 21.1166 19.0792 20.3895Z"
              fill={
                rating >= star
                  ? '#FFD700' // 전체 별 채우기 (금색)
                  : rating >= star - 0.5
                  ? `url(#half-fill-${star})` // 절반 별 채우기
                  : '#C0C0C0' // 빈 별 (회색)
              }
              fillOpacity="1"
              stroke="white"
            />
          </svg>
        </span>
      ))}
    </div>
  );
};
  
  // 사용 예제
  // <ReadOnlyStarRating rating={4} />
  