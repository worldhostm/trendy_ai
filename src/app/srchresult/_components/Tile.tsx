'use client'

import React from "react";
import styles from "./Tile.module.css";
import Link from "next/link";

interface TileProps {
  title: string;
  content: string;
  hashtags: string[];
  url : string;
}

const Tile: React.FC<TileProps> = ({ title, content, hashtags,url }) => {
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
      <div className={`${styles.hashtags}`}>
        {hashtags.map((tag, index) => (
          <span key={index} className={`${styles.hashtag} bodyS`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tile;
