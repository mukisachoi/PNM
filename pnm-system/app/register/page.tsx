'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  User,
  Phone,
  Loader2,
  Chrome,
  MessageCircle,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

const registerSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  phone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호를 입력해주세요').optional(),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, '이용약관에 동의해주세요'),
}).refine(data => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true)
    try {
      // 1. Supabase Auth에 사용자 등록
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (authError) {
        toast.error('회원가입 실패: ' + authError.message)
        return
      }

      // 2. Users 테이블에 추가 정보 저장
      if (authData.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert({
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            role: 'user',
            is_public: true,
          })

        if (dbError) {
          console.error('사용자 정보 저장 실패:', dbError)
        }
      }

      toast.success('회원가입 성공! 이메일을 확인해주세요.')
      router.push('/login')
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialRegister = async (provider: 'google' | 'kakao' | 'naver' | 'facebook') => {
    try {
      // Supabase OAuth 설정이 필요합니다
      toast.error(`${provider} 회원가입은 준비 중입니다`)
    } catch (error) {
      toast.error('소셜 회원가입 중 오류가 발생했습니다')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* 왼쪽 영역 - 정보 (데스크톱만) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-background items-center justify-center p-8">
        <div className="max-w-md space-y-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-4">PNM과 함께 시작하세요</h3>
            <p className="text-muted-foreground">
              체계적인 인맥관리 시스템으로 비즈니스 네트워크를 확장하세요
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">스마트한 인맥관리</h4>
                <p className="text-sm text-muted-foreground">
                  명함 OCR, 엑셀 일괄 등록으로 쉽고 빠르게 인맥을 관리하세요
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">행사 & 네트워킹</h4>
                <p className="text-sm text-muted-foreground">
                  행사별 참석자 관리와 네트워킹 기록을 한 곳에서 관리하세요
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">관계도 시각화</h4>
                <p className="text-sm text-muted-foreground">
                  인맥 간의 관계를 시각화하여 숨겨진 연결고리를 발견하세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 영역 - 회원가입 폼 */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* 로고 */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">P</span>
              </div>
              <span className="text-3xl font-bold">PNM</span>
            </Link>
            <h2 className="mt-6 text-2xl font-bold">계정 만들기</h2>
            <p className="mt-2 text-muted-foreground">
              무료로 시작하세요
            </p>
          </div>

          {/* 소셜 회원가입 버튼 */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleSocialRegister('google')}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google로 시작하기
            </Button>
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister('kakao')}
                className="bg-[#FEE500] hover:bg-[#FEE500]/90 text-black border-[#FEE500]"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister('naver')}
                className="bg-[#03C75A] hover:bg-[#03C75A]/90 text-white border-[#03C75A]"
              >
                <span className="font-bold">N</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialRegister('facebook')}
                className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-[#1877F2]"
              >
                <span className="font-bold">f</span>
              </Button>
            </div>
          </div>

          {/* 구분선 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                또는 이메일로 가입
              </span>
            </div>
          </div>

          {/* 회원가입 폼 */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* 이름 입력 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                이름
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  {...register('name')}
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="홍길동"
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* 이메일 입력 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  {...register('email')}
                  type="email"
                  className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* 전화번호 입력 (선택) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                전화번호 (선택)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="010-1234-5678"
                  disabled={isLoading}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                비밀번호 확인
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* 이용약관 동의 */}
            <div>
              <label className="flex items-start">
                <input
                  {...register('terms')}
                  type="checkbox"
                  className="mr-2 mt-1 rounded border-gray-300"
                />
                <span className="text-sm">
                  <Link href="/terms" className="text-primary hover:underline">
                    이용약관
                  </Link>
                  과{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    개인정보처리방침
                  </Link>
                  에 동의합니다
                </span>
              </label>
              {errors.terms && (
                <p className="text-sm text-destructive mt-1">{errors.terms.message}</p>
              )}
            </div>

            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  계정 생성 중...
                </>
              ) : (
                '계정 만들기'
              )}
            </Button>
          </form>

          {/* 로그인 링크 */}
          <p className="text-center text-sm">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}