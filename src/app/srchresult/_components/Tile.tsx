'use client'

import React, { MouseEvent, SetStateAction, useRef, useState } from "react";
import styles from "./Tile.module.css";
import Link from "next/link";

interface TileProps {
  title: string;
  content: string;
  hashtags: string[];
  url : string;
  setquery?: React.Dispatch<SetStateAction<string>>;
}

const Tile: React.FC<TileProps> = ({ title, content, hashtags,url ,setquery}) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollRef.current) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // 이동 속도 조절
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };


  return (
    <div className={styles.tileContainer}>
      {/* 제목 */}
      <div className={`${styles.title} titleS`}>{title}</div>

      {/* 내용 */}
        <Link 
        href={url}
        className={`${styles.content} bodyM`}
        target="_blank"
        >
            {content}
        </Link>

      {/* 해시태그 */}
      <div 
      className={`${styles.hashtags}`}
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
        {hashtags.map((tag, index) => (
          <span key={index} 
          className={`${styles.hashtag} bodyS`}
          onClick={()=>setquery && setquery(tag.replace('#',""))}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tile;
