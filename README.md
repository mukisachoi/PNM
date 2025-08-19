# PNM (Personal Network Management) System

## 📋 프로젝트 소개

PNM은 개인의 인맥 관계를 체계적으로 관리하고 분석할 수 있는 웹 애플리케이션입니다.

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local.example` 파일을 복사하여 `.env.local` 파일을 생성하고 필요한 환경 변수를 설정합니다.

```bash
cp .env.local.example .env.local
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3001](http://localhost:3001)로 접속합니다.

## 📁 프로젝트 구조

```
PNM/
├── app/                # Next.js App Router
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 홈페이지
│   └── globals.css     # 전역 스타일
├── components/         # React 컴포넌트
│   └── ui/            # UI 컴포넌트
├── lib/               # 유틸리티 함수
├── public/            # 정적 파일
├── types/             # TypeScript 타입 정의
└── package.json       # 프로젝트 설정
```

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Query
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Data Visualization**: D3.js, Vis-network

## 📝 주요 기능

- **인맥 관리**: 연락처 정보 저장 및 관리
- **관계 네트워크**: 인맥 간 관계 시각화
- **일정 관리**: 미팅 및 이벤트 스케줄링
- **분석 대시보드**: 인맥 활동 통계 및 인사이트

## 🔧 Git Desktop 사용 가이드

### 변경사항 커밋하기

1. Git Desktop을 열고 변경된 파일들을 확인
2. 커밋 메시지 작성 (예: "feat: 초기 프로젝트 구조 설정")
3. "Commit to main" 버튼 클릭
4. "Push origin" 버튼으로 GitHub에 푸시

### 브랜치 관리

- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치

## 📄 라이선스

MIT License

## 👥 기여

이슈 및 풀 리퀘스트는 언제나 환영합니다!
