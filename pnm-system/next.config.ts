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
  
  // PWA 설정
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
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_APP_URL || '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ]
  },
  
  // 리다이렉트 설정
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/contacts',
        permanent: false,
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
    
    // SVG 로더 설정
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    
    return config
  },
  
  // 실험적 기능
  experimental: {
    // 서버 액션 활성화
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // 타입스크립트 설정
  typescript: {
    // 프로덕션 빌드 시 타입 에러 무시 (개발 중에만 사용)
    ignoreBuildErrors: false,
  },
  
  // ESLint 설정
  eslint: {
    // 프로덕션 빌드 시 ESLint 에러 무시 (개발 중에만 사용)
    ignoreDuringBuilds: false,
  },
  
  // 출력 설정
  output: 'standalone',
  
  // 압축 설정
  compress: true,
  
  // 성능 최적화
  poweredByHeader: false,
  generateEtags: true,
  
  // 국제화 설정 (필요시 활성화)
  // i18n: {
  //   locales: ['ko', 'en'],
  //   defaultLocale: 'ko',
  // },
}

module.exports = nextConfig