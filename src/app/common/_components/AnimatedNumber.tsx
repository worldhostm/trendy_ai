'use client'

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
    value: number; // 최종 목표 값
    duration?: number; // 애니메이션 지속 시간 (기본값 1초)
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 1000 }) => {
    const [count, setCount] = useState(0); // 애니메이션되는 상태값

    useEffect(() => {
        let start: number | null = null;
        const startValue = count; // 현재 값에서 시작 (0부터가 아닐 수도 있음)
        const change = value - startValue; // 목표값 - 시작값
        const step = (timestamp: number) => {
            if (start === null) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1); // 진행률 0~1 사이
            setCount(startValue + Math.floor(progress * change));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [value, duration]); // value가 변경될 때마다 실행

    return <div>{count}</div>;
};

export default AnimatedNumber;
