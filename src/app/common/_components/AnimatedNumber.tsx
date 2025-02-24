'use client'

import { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ targetValue }: { targetValue: number }) => {
    const [currentValue, setCurrentValue] = useState(targetValue);
    const latestTargetValue = useRef(targetValue); // 최신 targetValue 저장
    const isAnimating = useRef(false); // 애니메이션 중복 실행 방지

    useEffect(() => {
        latestTargetValue.current = targetValue; // 최신 값 업데이트
        if (!isAnimating.current) {
            isAnimating.current = true; // 애니메이션 시작 표시

            const animate = () => {
                setCurrentValue((prev) => {
                    const difference = latestTargetValue.current - prev;
                    if (Math.abs(difference) < 0.1) {
                        isAnimating.current = false; // 애니메이션 종료
                        return latestTargetValue.current; // 정확한 값 설정
                    }
                    return prev + difference * 0.1; // 부드러운 보간
                });

                if (Math.abs(latestTargetValue.current - currentValue) > 0.1) {
                    requestAnimationFrame(animate);
                } else {
                    isAnimating.current = false;
                }
            };

            requestAnimationFrame(animate);
        }
    }, [targetValue]); // API가 targetValue를 변경할 때마다 실행

    return <span style={{background: 'var(--primary-grient)',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent', }}>{currentValue.toFixed(0)}</span>;
};

export default AnimatedCounter;