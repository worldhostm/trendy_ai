import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div 
    style={{
      display:'flex',
      flexDirection:'column',
      gap:'15px',
      width:'100vw',
      height:'40vh',
      justifyContent:'center',
      alignItems:'center',
    }}
    >
      <Image src={'/404_Image.png'} width={120} height={120} alt='404'/>
      <p
      style={{
      // 404 ERROR<br/>원하는 페이지를 찾을 수 없습니다.
      color: '#212121',
      fontSize: 16,
      fontFamily: 'Pretendard',
      fontWeight: '700',
      wordWrap: 'break-word',
      textAlign:'center'
      }}
      >404 ERROR<br/>
      원하는 페이지를 찾을 수 없습니다.</p>
      <p 
      style={{
        width:'100%', textAlign:'center',
        color: '#212121',
        fontSize: 12,
        fontFamily: 'Pretendard',
        fontWeight: '400',
        wordWrap: 'break-word',
        opacity:0.64,
      }}
      >
        요청하신 페이지와 주소를 열심히 찾아봤으나 찾을 수 없었어요.<br/>
        새로운 페이지나 주소를 주시면 다시 열심히 찾아볼게요.
      </p>
    </div>
  )
}
