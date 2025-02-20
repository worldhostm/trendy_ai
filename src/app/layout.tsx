import type { Metadata } from "next";
import "./globals.css";
import Header from "./common/_components/Header";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "./common/_components/Footer";
import { LanguageProvider } from "./common/_components/LanguageContext";
import { Suspense } from "react";

export const metadata :Metadata={
  openGraph:{
    description : '매일 새로운 AI를 한 번에! AI솔루션과 인기 생산성 도구를 실시간으로 확인하고 비교할 수 있습니다',
    title:' 31AIS : Find your AI services everyday',
    images:'',
    url :'https://31ais.com',
    siteName:'31AIS',
  },
  title:' 31AIS : Find your AI services everyday',
  description:'매일 새로운 AI를 한 번에! AI솔루션과 인기 생산성 도구를 실시간으로 확인하고 비교할 수 있습니다',
  keywords:'AI 실시간 랭킹, AI, 인공지능, AI 랭킹, 실시간 랭킹, AI 검색, AI 도구, 인공지능 기술, AI 트렌드, AI 서비스, 머신러닝, 딥러닝, AI 플랫폼, AI 비교, 최신 AI, AI 기술 분석, 빅데이터, AI 자동화, 인공지능 소프트웨어, AI 솔루션, AI 개발',
  robots:"index, follow"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Suspense>
            <Header />
          </Suspense>
          {/* <MenuPath /> */}
            {children}
          <Footer />
        </LanguageProvider>
        {/* 운영 환경에서만 구글 데이터수집 */}
        {
          process.env.NEXT_PUBLIC_ENV_VAR ==='product'
          &&
          <GoogleAnalytics  
            gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}`}
          />
        }
      </body>
    </html>
  );
}
