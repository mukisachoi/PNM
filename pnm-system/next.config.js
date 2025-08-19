/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 이미지 도메인 설정
  images: {
    domains: [
      'aayiixuujynjlbpuakir.supabase.co',
      'localhost',
      // 소셜 로그인 프로필 이미지 도메인
      'k.kakaocdn.net',
      'phinf.pstatic.net',
      'graph.facebook.com',
      'lh3.googleusercontent.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // 환경 변수 검증
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
  },
  
  // 보안 헤더
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  
  // 웹팩 설정
  webpack: (config, { isServer }) => {
    // 클라이언트 사이드에서만 실행되어야 하는 모듈 처리
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    return config
  },
  
  // 타입스크립트 설정
  typescript: {
    // 개발 중 타입 에러 무시하지 않음
    ignoreBuildErrors: false,
  },
  
  // ESLint 설정
  eslint: {
    // 개발 중 ESLint 에러 무시하지 않음
    ignoreDuringBuilds: false,
  },
  
  // 출력 설정
  output: 'standalone',
  
  // 압축 설정
  compress: true,
  
  // 성능 최적화
  poweredByHeader: false,
  generateEtags: true,
}

module.exports = nextConfig