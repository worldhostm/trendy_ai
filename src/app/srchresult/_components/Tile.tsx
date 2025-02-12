'use client'

import React from "react";
import styles from "./Tile.module.css";

interface TileProps {
  title: string;
  content: string;
  hashtags: string[];
}

const Tile: React.FC<TileProps> = ({ title, content, hashtags }) => {
  return (
    <div className={styles.tileContainer}>
      {/* 제목 */}
      <div className={`${styles.title} titleS`}>{title}</div>

      {/* 내용 */}
        <div className={`${styles.content2} bodyM`}>
            {content}
        </div>

      {/* 해시태그 */}
      <div className={`${styles.hashtags} bodyS`}>
        {hashtags.map((tag, index) => (
          <span key={index} className={styles.hashtag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tile;
