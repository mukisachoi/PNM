# PNM System - 인맥관리 및 행사 관계도 시각화 시스템

## 📋 프로젝트 소개

PNM(Personal Network Management) System은 개인과 조직의 인맥을 체계적으로 관리하고, 행사 및 네트워크 관계를 시각화하는 웹 애플리케이션입니다.

### 주요 기능

- 🔐 **소셜 로그인**: 카카오톡, 네이버, 페이스북, 구글 OAuth2 연동
- 👥 **인맥 관리**: OCR 명함 스캔, 엑셀/CSV 일괄 등록, 프라이빗 메모
- 📅 **행사 관리**: 이벤트 생성, 참석자 관리, 네트워킹 기록
- 🌐 **관계도 시각화**: 마인드맵, 네트워크 그래프로 관계 구조 파악
- 🔒 **보안**: AES-256 암호화, RBAC 권한 관리, 프라이버시 보호
- 📱 **반응형 디자인**: PC와 모바일 모두 지원
- 🌓 **테마**: 라이트/다크 모드 지원

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn
- Supabase 계정 및 프로젝트

### 설치 방법

1. **저장소 클론**
```bash
git clone https://github.com/your-username/PNM.git
cd PNM
```

2. **의존성 설치**
```bash
npm install
# 또는
yarn install
```

3. **환경 변수 설정**
```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열어 필요한 환경 변수를 설정합니다:
- Supabase URL 및 API 키
- 소셜 로그인 OAuth 클라이언트 ID/Secret
- 암호화 키

4. **데이터베이스 설정**

제공된 SQL 스크립트를 Supabase SQL Editor에서 실행합니다.

5. **개발 서버 실행**
```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## 📁 프로젝트 구조

```
PNM/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 관련 페이지
│   ├── (dashboard)/       # 대시보드 페이지
│   ├── api/               # API 라우트
│   └── layout.tsx         # 루트 레이아웃
├── components/            # React 컴포넌트
│   ├── ui/               # UI 컴포넌트
│   ├── auth/             # 인증 컴포넌트
│   ├── contacts/         # 인맥 관리 컴포넌트
│   ├── events/           # 행사 관리 컴포넌트
│   └── network/          # 네트워크 시각화 컴포넌트
├── lib/                   # 유틸리티 및 라이브러리
│   ├── supabase/         # Supabase 클라이언트
│   ├── utils/            # 유틸리티 함수
│   └── hooks/            # React Hooks
├── public/               # 정적 파일
│   └── icons/           # 아이콘 파일
├── styles/              # 스타일 파일
└── types/               # TypeScript 타입 정의
```

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Form Handling**: React Hook Form + Zod

### Backend & Database
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### 시각화 & 도구
- **Network Graph**: D3.js, vis-network
- **OCR**: Tesseract.js
- **File Processing**: XLSX, Papaparse
- **Encryption**: CryptoJS

## 📝 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 타입 체크
npm run type-check

# 린트 실행
npm run lint

# 코드 포맷팅
npm run format
```

## 🔐 보안 고려사항

1. **데이터 암호화**: 모든 프라이빗 메모는 AES-256으로 암호화
2. **Row Level Security**: Supabase RLS 정책 적용
3. **입력 검증**: 모든 사용자 입력 검증 및 살균
4. **HTTPS**: 프로덕션 환경에서 HTTPS 필수
5. **환경 변수**: 민감한 정보는 환경 변수로 관리

## 🚢 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 GitHub 저장소 연결
2. 환경 변수 설정
3. 자동 배포 설정

### Docker 배포

```bash
# Docker 이미지 빌드
docker build -t pnm-system .

# 컨테이너 실행
docker run -p 3000:3000 --env-file .env.local pnm-system
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 프로젝트들의 도움을 받았습니다:
- Next.js
- Supabase
- Tailwind CSS
- Radix UI
- 그 외 모든 의존성 패키지들

---

Made with ❤️ by PNM Team