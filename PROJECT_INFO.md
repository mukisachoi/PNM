# PNM System - Project Information

## 🎯 프로젝트 개요

**PNM (Personal Network Management)**은 개인의 인맥 관계를 체계적으로 관리하고 분석할 수 있는 웹 애플리케이션입니다.

## 🌐 접속 정보

- **개발 서버**: http://localhost:3001
- **기본 포트**: 3001 (헌금관리시스템과 충돌 방지)

## 🎨 다크모드 지원

### 아이콘 구조
```
public/
├── PNM_L.png           # 라이트모드 메인 로고
├── PNM_D.png           # 다크모드 메인 로고
├── icons/
│   ├── PNM_L/         # 라이트모드 아이콘 세트
│   │   ├── android/
│   │   ├── ios/
│   │   └── windows11/
│   └── PNM_D/         # 다크모드 아이콘 세트
│       ├── android/
│       ├── ios/
│       └── windows11/
├── manifest.json       # 라이트모드 PWA 매니페스트
└── manifest-dark.json  # 다크모드 PWA 매니페스트
```

### 다크모드 기능
- 시스템 테마 자동 감지
- 수동 테마 전환 버튼
- 테마별 아이콘 자동 변경
- PWA 매니페스트 동적 변경

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: Radix UI + Shadcn/ui
- **Theme**: next-themes (다크모드)
- **Icons**: Lucide React

### State & Data
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod
- **Database**: Supabase
- **Authentication**: Supabase Auth

### Visualization
- **Network Graph**: Vis-network
- **Charts**: D3.js
- **Data Processing**: PapaParse, XLSX

### Build & Dev
- **Package Manager**: npm
- **Linter**: ESLint
- **Formatter**: Prettier
- **Type Checking**: TypeScript

## 📁 프로젝트 구조

```
PNM/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃 (다크모드 설정)
│   ├── page.tsx           # 홈페이지 대시보드
│   ├── globals.css        # 전역 스타일
│   └── providers.tsx      # Context Providers
├── components/            # React 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── common/           # 공통 컴포넌트
│       └── Logo.tsx      # 다크모드 반응 로고
├── lib/                   # 유틸리티 함수
│   └── utils.ts          # 헬퍼 함수
├── types/                 # TypeScript 타입 정의
│   └── index.ts          # 전역 타입
├── public/               # 정적 파일
│   ├── PNM_L.png        # 라이트모드 로고
│   ├── PNM_D.png        # 다크모드 로고
│   ├── icons/           # PWA 아이콘
│   ├── manifest.json    # PWA 매니페스트
│   ├── offline.html     # 오프라인 페이지
│   └── robots.txt       # SEO 설정
└── 설정 파일들
    ├── package.json      # 의존성 관리
    ├── tsconfig.json     # TypeScript 설정
    ├── tailwind.config.ts # Tailwind 설정
    ├── next.config.js    # Next.js 설정
    └── .eslintrc.json    # ESLint 설정
```

## 🚀 주요 기능

### 현재 구현됨
- ✅ 반응형 홈페이지 대시보드
- ✅ 다크모드/라이트모드 전환
- ✅ PWA 지원 (매니페스트, 아이콘)
- ✅ 로고 자동 테마 변경
- ✅ 기본 UI 컴포넌트

### 개발 예정
- [ ] 인맥 관리 (CRUD)
- [ ] 관계 네트워크 시각화
- [ ] 일정 관리 시스템
- [ ] 분석 대시보드
- [ ] Supabase 연동
- [ ] 사용자 인증
- [ ] 데이터 가져오기/내보내기

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 타입 체크
npm run type-check

# 코드 포맷팅
npm run format

# ESLint 검사
npm run lint
```

## 📌 환경 변수

`.env.local` 파일 생성 필요:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## 🎯 개발 로드맵

### Phase 1: 기초 구축 ✅
- 프로젝트 구조 설정
- 다크모드 구현
- PWA 설정
- 기본 UI 구성

### Phase 2: 인증 & DB
- Supabase 연동
- 사용자 인증
- 데이터베이스 스키마

### Phase 3: 핵심 기능
- 연락처 관리
- 그룹 관리
- 관계 설정

### Phase 4: 시각화
- 네트워크 그래프
- 통계 차트
- 활동 분석

### Phase 5: 고급 기능
- 일정 관리
- 알림 시스템
- 데이터 동기화

## 📝 버전 히스토리

### v2.0.0 (2024-01-XX)
- 프로젝트 완전 재구축
- Next.js 14 App Router 적용
- 다크모드 지원 추가
- PWA 기능 구현

### v1.0.0 (이전 버전)
- pnm-system 하위 디렉토리 구조
- 초기 프로토타입

## 🤝 기여 가이드

1. Git Desktop으로 변경사항 관리
2. 커밋 메시지 규칙 준수
3. 기능별 브랜치 생성
4. Pull Request 제출

## 📞 문의 & 지원

프로젝트 관련 문의사항은 GitHub Issues를 통해 등록해주세요.
