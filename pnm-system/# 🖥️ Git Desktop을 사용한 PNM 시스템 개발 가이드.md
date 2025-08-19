# 🖥️ Git Desktop을 사용한 PNM 시스템 개발 가이드

## 📋 사전 준비사항

1. **필수 프로그램 설치**
   - [Git Desktop](https://desktop.github.com/) 다운로드 및 설치
   - [Node.js](https://nodejs.org/) (18.0.0 이상) 설치
   - [Visual Studio Code](https://code.visualstudio.com/) 또는 선호하는 에디터

2. **GitHub 계정**
   - GitHub 계정이 없다면 [github.com](https://github.com)에서 생성
   - Git Desktop에서 GitHub 계정으로 로그인

## 🚀 Step 1: Git Desktop에서 저장소 생성

### 방법 A: 로컬 저장소 먼저 생성 (권장)

1. **Git Desktop 실행**

2. **새 저장소 생성**
   - `File` → `New Repository` 클릭
   - 또는 메인 화면에서 `Create a New Repository on your hard drive` 클릭

3. **저장소 정보 입력**
   ```
   Name: PNM
   Description: 인맥관리 및 행사 관계도 시각화 시스템
   Local Path: C:\Users\user\Documents\GitHub
   ☑ Initialize this repository with a README
   Git Ignore: Node (선택)
   License: MIT License (선택사항)
   ```
   
4. **Create Repository** 클릭

5. **GitHub에 퍼블리시**
   - 상단의 `Publish repository` 버튼 클릭
   - Repository name: `PNM`
   - Description 입력
   - ☐ Keep this code private (공개/비공개 선택)
   - `Publish Repository` 클릭

### 방법 B: GitHub에서 먼저 생성

1. **GitHub.com에서 저장소 생성**
   - GitHub.com 로그인 → `New repository`
   - Repository name: `PNM`
   - Public/Private 선택
   - `Create repository` 클릭

2. **Git Desktop에서 클론**
   - Git Desktop에서 `File` → `Clone Repository`
   - GitHub.com 탭에서 `PNM` 선택
   - Local Path: `C:\Users\user\Documents\GitHub`
   - `Clone` 클릭

## 📁 Step 2: 프로젝트 초기 설정

1. **VS Code에서 프로젝트 열기**
   - Git Desktop에서 `Repository` → `Open in Visual Studio Code` 클릭
   - 또는 `Ctrl+Shift+A` 단축키

2. **터미널 열기**
   - VS Code에서 `` Ctrl+` `` 또는 `Terminal` → `New Terminal`

3. **Next.js 프로젝트 생성**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --app
   ```
   
   프롬프트 응답:
   ```
   ✔ Would you like to use ESLint? → Yes
   ✔ Would you like to use `src/` directory? → No
   ✔ Would you like to use App Router? → Yes
   ✔ Would you like to customize the default import alias? → No
   ```

## 📦 Step 3: 의존성 설치

터미널에서 다음 명령어들을 순서대로 실행:

```bash
# 기본 의존성 설치
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# UI 컴포넌트
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs
npm install lucide-react framer-motion

# 데이터 시각화
npm install d3 vis-network

# 폼 처리 및 검증
npm install react-hook-form zod @hookform/resolvers

# 유틸리티
npm install crypto-js date-fns react-hot-toast
npm install @tanstack/react-query next-themes

# 파일 처리
npm install tesseract.js xlsx papaparse

# 개발 의존성
npm install -D @types/d3 @types/crypto-js tailwindcss-animate
```

## 🔧 Step 4: 프로젝트 파일 생성

### 필수 파일들 생성 (VS Code에서)

1. **환경 변수 파일 생성**
   - 프로젝트 루트에 `.env.local` 파일 생성
   - 다음 내용 추가:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://aayiixuujynjlbpuakir.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFheWlpeHV1anluamxicHVha2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1ODg5NjAsImV4cCI6MjA3MTE2NDk2MH0.Tl0ccLvwvuSzjBsOOmEnlFTJx1NvdqueTwRvyY0vqUk
   NEXT_PUBLIC_ENCRYPTION_KEY=PNM-DEFAULT-ENCRYPTION-KEY-2024
   ```

2. **폴더 구조 생성**
   ```
   📁 프로젝트 루트에서 다음 폴더들 생성:
   ├── 📁 components/
   │   ├── 📁 ui/
   │   ├── 📁 auth/
   │   ├── 📁 contacts/
   │   ├── 📁 events/
   │   └── 📁 network/
   ├── 📁 lib/
   │   ├── 📁 supabase/
   │   ├── 📁 utils/
   │   └── 📁 hooks/
   └── 📁 types/
   ```

3. **위에서 제공한 코드 파일들 복사**
   - 각 artifact의 코드를 해당 경로에 파일로 저장
   - VS Code에서 파일 생성 → 코드 붙여넣기

## 💾 Step 5: Git Desktop에서 첫 커밋

1. **Git Desktop으로 돌아가기**
   - 변경된 파일들이 자동으로 감지됨

2. **변경사항 확인**
   - Changes 탭에서 변경된 파일 목록 확인
   - 각 파일 클릭하여 변경 내용 검토

3. **커밋 생성**
   - Summary: `Initial project setup`
   - Description (선택사항): 
     ```
     - Next.js 프로젝트 초기 설정
     - Supabase 연동 설정
     - 기본 컴포넌트 구조 생성
     - 환경 변수 설정
     ```
   - `Commit to main` 클릭

4. **GitHub에 푸시**
   - `Push origin` 버튼 클릭 (또는 `Ctrl+P`)

## 🏃 Step 6: 개발 서버 실행

1. **VS Code 터미널에서**
   ```bash
   npm run dev
   ```

2. **브라우저에서 확인**
   - http://localhost:3000 접속
   - 메인 페이지가 정상적으로 표시되는지 확인

## 📝 Step 7: 개발 워크플로우

### 새로운 기능 개발 시:

1. **Git Desktop에서 브랜치 생성**
   - `Current Branch` → `New Branch`
   - 브랜치 이름 예: `feature/login-page`, `feature/contact-management`
   - `Create Branch` 클릭

2. **코드 작업**
   - VS Code에서 개발 진행
   - 파일 저장 시 자동으로 Git Desktop에 반영

3. **커밋하기**
   - Git Desktop에서 변경사항 확인
   - 의미있는 단위로 커밋 생성
   - 커밋 메시지 예:
     ```
     feat: 로그인 페이지 UI 구현
     fix: 다크모드 전환 버그 수정
     style: 버튼 컴포넌트 스타일 개선
     ```

4. **푸시 및 Pull Request**
   - `Push origin` 클릭
   - GitHub.com에서 Pull Request 생성 (필요시)

## 🔄 Step 8: 동기화 및 협업

### 최신 변경사항 받기:
1. Git Desktop에서 `Fetch origin` 클릭
2. 변경사항이 있으면 `Pull origin` 클릭

### 충돌 해결:
1. Git Desktop이 충돌을 감지하면 알림 표시
2. VS Code에서 충돌 파일 열기
3. 충돌 마커 확인 및 수정
4. Git Desktop에서 `Continue Merge` 클릭

## 🎯 유용한 Git Desktop 단축키

| 기능 | 단축키 |
|------|--------|
| 저장소 열기 | `Ctrl+O` |
| 변경사항 보기 | `Ctrl+1` |
| 히스토리 보기 | `Ctrl+2` |
| VS Code 열기 | `Ctrl+Shift+A` |
| 커밋 | `Ctrl+Enter` |
| 푸시 | `Ctrl+P` |
| 풀 | `Ctrl+Shift+P` |
| 브랜치 생성 | `Ctrl+Shift+N` |

## 📚 추가 리소스

- [Git Desktop 공식 문서](https://docs.github.com/desktop)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase 공식 문서](https://supabase.com/docs)

## ⚠️ 주의사항

1. **`.env.local` 파일은 절대 커밋하지 마세요**
   - Git Desktop에서 자동으로 .gitignore에 추가됨
   - 실수로 체크되어 있다면 체크 해제

2. **node_modules 폴더는 커밋하지 마세요**
   - 자동으로 제외되지만 확인 필요

3. **규칙적인 커밋**
   - 작은 단위로 자주 커밋
   - 의미있는 커밋 메시지 작성

4. **브랜치 전략**
   - main: 안정된 코드만
   - develop: 개발 중인 코드
   - feature/*: 새 기능
   - fix/*: 버그 수정

## 🚨 문제 해결

### npm 명령어가 작동하지 않을 때:
```bash
# Node.js 설치 확인
node --version

# npm 캐시 정리
npm cache clean --force

# node_modules 재설치
rm -rf node_modules
npm install
```

### Git Desktop에서 푸시가 실패할 때:
1. GitHub 로그인 상태 확인
2. 저장소 권한 확인
3. `Repository` → `Repository Settings` → `Remote` 확인

### 포트 3000이 이미 사용 중일 때:
```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

---

이제 Git Desktop을 통해 편리하게 버전 관리를 하면서 PNM 시스템을 개발할 수 있습니다! 🎉