# 🖥️ Git Desktop을 사용한 PNM 시스템 개발 가이드

## 📋 초기 설정

### 1. pnm-system 디렉토리 삭제

PowerShell 또는 Git Bash에서 다음 명령어를 실행하세요:

```bash
# PowerShell
cd C:\Users\user\Documents\GitHub\PNM
Remove-Item -Path .\pnm-system -Recurse -Force

# Git Bash
cd /c/Users/user/Documents/GitHub/PNM
rm -rf pnm-system
```

### 2. 의존성 설치

```bash
cd C:\Users\user\Documents\GitHub\PNM
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 Supabase 정보를 입력하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 4. 개발 서버 실행

```bash
npm run dev
```

## 🔄 Git Desktop 워크플로우

### 변경사항 확인 및 커밋

1. **Git Desktop 실행**
2. **변경 파일 확인**: 좌측 패널에서 변경된 파일 목록 확인
3. **변경 내용 검토**: 우측 패널에서 코드 변경 사항 확인
4. **커밋 메시지 작성**:
   - Summary: 간단한 제목 (예: "feat: 인맥 관리 기능 추가")
   - Description: 상세 설명 (선택사항)
5. **Commit to main** 클릭
6. **Push origin** 클릭하여 GitHub에 푸시

### 커밋 메시지 규칙

- `feat:` 새로운 기능 추가
- `fix:` 버그 수정
- `docs:` 문서 수정
- `style:` 코드 포맷팅, 세미콜론 누락 등
- `refactor:` 코드 리팩토링
- `test:` 테스트 추가
- `chore:` 빌드 업무 수정, 패키지 매니저 수정 등

## 🚀 개발 순서

### Phase 1: 기본 구조 (현재 완료)
- ✅ 프로젝트 초기 설정
- ✅ 기본 디렉토리 구조
- ✅ 필수 설정 파일들
- ✅ 홈페이지 UI

### Phase 2: 인증 시스템
- [ ] Supabase 연동
- [ ] 로그인/회원가입 페이지
- [ ] 사용자 프로필 관리

### Phase 3: 핵심 기능
- [ ] 연락처 CRUD
- [ ] 그룹 관리
- [ ] 관계 설정

### Phase 4: 시각화
- [ ] 네트워크 그래프
- [ ] 통계 대시보드
- [ ] 활동 히트맵

### Phase 5: 고급 기능
- [ ] 일정 관리
- [ ] 알림 시스템
- [ ] 데이터 가져오기/내보내기

## 📂 디렉토리 구조 설명

```
PNM/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 관련 페이지
│   ├── (dashboard)/       # 대시보드 레이아웃
│   ├── contacts/          # 연락처 관리
│   ├── network/           # 네트워크 시각화
│   ├── analytics/         # 분석 대시보드
│   └── settings/          # 설정 페이지
├── components/            # React 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   └── features/         # 기능별 컴포넌트
├── lib/                   # 유틸리티 및 헬퍼
│   ├── supabase/         # Supabase 클라이언트
│   ├── hooks/            # Custom React Hooks
│   └── utils/            # 유틸리티 함수
├── types/                 # TypeScript 타입 정의
└── public/               # 정적 파일
```

## 🔍 개발 팁

### 1. 실시간 미리보기
개발 서버를 실행한 상태에서 코드를 수정하면 자동으로 브라우저에 반영됩니다.

### 2. TypeScript 타입 체크
```bash
npm run type-check
```

### 3. 코드 포맷팅
```bash
npm run format
```

### 4. ESLint 검사
```bash
npm run lint
```

## 🐛 문제 해결

### 포트 충돌
3001 포트가 이미 사용 중인 경우:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# 또는 package.json에서 포트 변경
"dev": "next dev -p 3002"
```

### 캐시 문제
```bash
# .next 폴더 삭제
rm -rf .next
npm run dev
```

### 의존성 문제
```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

## 📞 지원

문제가 발생하면 GitHub Issues에 등록하거나 다음 정보와 함께 문의하세요:
- 오류 메시지
- 재현 단계
- 브라우저 및 OS 정보
