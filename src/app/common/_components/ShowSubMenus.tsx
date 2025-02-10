'use client'

import Image from 'next/image';
import React from 'react'
import { useWindowWidth } from './_libs/useWindowWidth';

interface Props{
    menu : string;
    menu2 : string;
}
export default function ShowSubMenus({menu,menu2}:Props) {
    const innerWidth = useWindowWidth();
  return (
    <div 
    className=''
    style={{
        backgroundColor:'transparent',
        display:`${innerWidth > 768 ? `flex`: `none`}`,
        gap:'8px',
        width:`${innerWidth > 768 ? `1200px` : `100%`}`,
        justifyContent:'baseline',
        padding : '20px 0px',
        opacity: 0.64
    }} 
    >
        <div>{menu}</div>
        <Image src="/leftnavi.svg" width={16} height={16} alt="왼쪽 화살표 네비"/>
        <div>{menu2}</div>
    </div>
  )
}
