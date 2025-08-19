import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Calendar, 
  Network, 
  Shield, 
  Sparkles, 
  ChevronRight,
  CheckCircle,
  Globe,
  Lock,
  Zap
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-50" />
        <div className="container relative mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 animate-fade-in">
              체계적인 <span className="text-primary">인맥관리</span>의 시작
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-in">
              소중한 인연을 체계적으로 관리하고, 행사와 네트워크를 시각화하여
              비즈니스 성공을 위한 든든한 기반을 만들어보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  무료로 시작하기 <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  로그인
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            강력한 기능들
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="스마트 인맥관리"
              description="명함 OCR, 소셜 계정 연동, 관계도 자동 생성으로 인맥을 효율적으로 관리하세요."
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8" />}
              title="행사 & 이벤트 관리"
              description="행사별 참석자 관리, 네트워킹 기록, 후속 조치까지 한 곳에서 관리하세요."
            />
            <FeatureCard
              icon={<Network className="h-8 w-8" />}
              title="관계도 시각화"
              description="인맥 간의 관계를 직관적으로 파악하고 숨겨진 연결고리를 발견하세요."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="프라이버시 보호"
              description="암호화된 개인 메모, 공개/비공개 설정으로 정보를 안전하게 보호합니다."
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8" />}
              title="소셜 통합"
              description="카카오톡, 네이버, 구글, 페이스북 계정으로 간편하게 시작하세요."
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8" />}
              title="AI 기반 분석"
              description="관계 패턴 분석, 네트워킹 추천, 중복 데이터 자동 병합 기능을 제공합니다."
            />
          </div>
        </div>
      </section>

      {/* 보안 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                엔터프라이즈급 보안
              </h2>
              <div className="space-y-4">
                <SecurityItem
                  icon={<Lock className="h-5 w-5" />}
                  text="AES-256 암호화로 민감한 정보 보호"
                />
                <SecurityItem
                  icon={<Shield className="h-5 w-5" />}
                  text="역할 기반 접근 제어 (RBAC)"
                />
                <SecurityItem
                  icon={<Zap className="h-5 w-5" />}
                  text="실시간 백업 및 복구 시스템"
                />
                <SecurityItem
                  icon={<CheckCircle className="h-5 w-5" />}
                  text="GDPR 및 개인정보보호법 준수"
                />
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Shield className="h-32 w-32 text-primary/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            30일 무료 체험으로 모든 기능을 경험해보세요
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="gap-2">
              무료 체험 시작하기 <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="bg-card p-6 rounded-lg border card-hover">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function SecurityItem({ 
  icon, 
  text 
}: { 
  icon: React.ReactNode
  text: string 
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-primary">{icon}</div>
      <span>{text}</span>
    </div>
  )
}