'use client'

import { useState } from "react";
import Image from "next/image";
interface Props{
    category:string;
    className?:string;
}

const CategoryImage = ({ category,className }:Props) => {
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/category-logo/${category}`
  );

  return (
    <Image
      src={imgSrc}
      alt="Thumbnail"
      className={className}
      width={32}
      height={32}
      onError={() => setImgSrc("/category_default.svg")} // 이미지 로드 실패 시 기본 이미지로 변경
    />
  );
};

export default CategoryImage;
