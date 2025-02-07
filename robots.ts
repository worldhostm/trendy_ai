import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 모든 검색 엔진 허용
      {
        userAgent: '*',
        allow: ['/'],
      },
      // 네이버 검색 봇 (Yeti)
      {
        userAgent: 'Yeti',
        allow: ['/'],
      },
      // 다음 검색 봇
      {
        userAgent: 'Daum',
        allow: ['/'],
      },
      // Bing 검색 봇
      {
        userAgent: 'bingbot',
        allow: ['/'],
      },
      // Google 검색 봇
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: '/private/',
      },
    ],
    sitemap: 'https://trndyai.com/sitemap.xml', // 실제 사이트맵 URL로 변경
  };
}