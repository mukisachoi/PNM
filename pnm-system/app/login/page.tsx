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
  Loader2,
  Chrome,
  MessageCircle,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        toast.error('로그인 실패: ' + error.message)
      } else {
        toast.success('로그인 성공!')
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('로그인 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'naver' | 'facebook') => {
    try {
      // Supabase OAuth 설정이 필요합니다
      toast.error(`${provider} 로그인은 준비 중입니다`)
    } catch (error) {
      toast.error('소셜 로그인 중 오류가 발생했습니다')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* 왼쪽 영역 - 로그인 폼 */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* 로고 */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">P</span>
              </div>
              <span className="text-3xl font-bold">PNM</span>
            </Link>
            <h2 className="mt-6 text-2xl font-bold">다시 만나서 반가워요!</h2>
            <p className="mt-2 text-muted-foreground">
              계정에 로그인하여 인맥관리를 시작하세요
            </p>
          </div>

          {/* 소셜 로그인 버튼 */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('google')}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google로 로그인
            </Button>
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('kakao')}
                className="bg-[#FEE500] hover:bg-[#FEE500]/90 text-black border-[#FEE500]"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('naver')}
                className="bg-[#03C75A] hover:bg-[#03C75A]/90 text-white border-[#03C75A]"
              >
                <span className="font-bold">N</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('facebook')}
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
                또는 이메일로 로그인
              </span>
            </div>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
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
            </div>

            {/* 옵션 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300"
                />
                <span className="text-sm">로그인 상태 유지</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                비밀번호 찾기
              </Link>
            </div>

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </Button>
          </form>

          {/* 회원가입 링크 */}
          <p className="text-center text-sm">
            아직 계정이 없으신가요?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">
              회원가입
            </Link>
          </p>
        </div>
      </div>

      {/* 오른쪽 영역 - 이미지/정보 (데스크톱만) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-background items-center justify-center p-8">
        <div className="max-w-md text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <User className="w-16 h-16 text-primary" />
          </div>
          <h3 className="text-3xl font-bold">인맥관리의 새로운 시작</h3>
          <p className="text-muted-foreground">
            체계적인 인맥관리와 행사관리로 비즈니스 네트워크를 확장하세요.
            관계도 시각화를 통해 숨겨진 연결고리를 발견할 수 있습니다.
          </p>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">활성 사용자</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">등록된 인맥</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">진행 행사</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}