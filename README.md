# PNM (Personal Network Management) System

<div align="center">
  <img src="public/PNM_L.png#gh-light-mode-only" alt="PNM Logo" width="120" />
  <img src="public/PNM_D.png#gh-dark-mode-only" alt="PNM Logo" width="120" />
  
  <h3>인맥 관계를 체계적으로 관리하는 스마트한 도구</h3>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
</div>

## 📋 프로젝트 소개

PNM은 개인의 인맥 관계를 체계적으로 관리하고 분석할 수 있는 웹 애플리케이션입니다. 
다크모드 지원, PWA 기능, 시각적 네트워크 분석 등 현대적인 기능을 제공합니다.

## ✨ 주요 기능

- 🌓 **다크모드/라이트모드** - 시스템 테마 자동 감지 및 수동 전환
- 📱 **PWA 지원** - 모바일 앱처럼 설치 가능
- 👥 **인맥 관리** - 연락처 정보 체계적 관리
- 🔗 **관계 네트워크** - 인맥 간 관계 시각화
- 📅 **일정 관리** - 미팅 및 이벤트 스케줄링
- 📊 **분석 대시보드** - 인맥 활동 통계 및 인사이트

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn
- Git

### 설치 방법

1. **저장소 클론**
```bash
git clone https://github.com/yourusername/PNM.git
cd PNM
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
```bash
cp .env.local.example .env.local
# .env.local 파일을 열어 Supabase 정보 입력
```

4. **개발 서버 실행**
```bash
npm run dev
```

5. **브라우저에서 접속**
```
http://localhost:3001
```

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Shadcn/ui
- **Theme**: next-themes

### Backend & Data
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod

### Visualization
- **Network Graph**: Vis-network
- **Charts**: D3.js
- **Data Processing**: PapaParse, XLSX

## 📁 프로젝트 구조

```
PNM/
├── app/                # Next.js App Router
├── components/         # React 컴포넌트
│   ├── ui/            # UI 컴포넌트
│   └── common/        # 공통 컴포넌트
├── lib/               # 유틸리티 함수
├── public/            # 정적 파일
│   ├── icons/         # PWA 아이콘
│   └── ...           # 로고 및 기타 파일
└── types/             # TypeScript 타입 정의
```

## 📝 개발 명령어

```bash
# 개발 서버 실행 (포트 3001)
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

## 🎯 로드맵

- [x] 프로젝트 초기 설정
- [x] 다크모드 구현
- [x] PWA 매니페스트 설정
- [ ] Supabase 연동
- [ ] 사용자 인증 시스템
- [ ] 연락처 CRUD 기능
- [ ] 네트워크 시각화
- [ ] 분석 대시보드
- [ ] 일정 관리 기능

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

## 📞 문의

프로젝트 관련 문의사항은 [Issues](https://github.com/yourusername/PNM/issues)를 통해 등록해주세요.

---

<div align="center">
  Made with ❤️ using Next.js and TypeScript
</div>
