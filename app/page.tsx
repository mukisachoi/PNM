'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight, BarChart3, Calendar, Shield } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // 이미 로그인되어 있으면 대시보드로 이동
      router.push('/dashboard');
    }
  };

  const features = [
    {
      icon: Users,
      title: '체계적인 인맥 관리',
      description: '모든 인맥을 한 곳에서 효율적으로 관리하세요'
    },
    {
      icon: Calendar,
      title: '일정 관리',
      description: '중요한 미팅과 이벤트를 놓치지 마세요'
    },
    {
      icon: BarChart3,
      title: '인사이트 분석',
      description: '인맥 관계를 시각화하고 분석하세요'
    },
    {
      icon: Shield,
      title: '안전한 데이터 보호',
      description: '개인정보는 안전하게 암호화되어 보호됩니다'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 헤더 */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PNM
            </span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => router.push('/login')}>
              로그인
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              onClick={() => router.push('/signup')}
            >
              시작하기
            </Button>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            인맥관리의 새로운 기준
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          People Network Management System으로<br />
          체계적이고 효율적인 인맥 관리를 시작하세요
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            onClick={() => router.push('/signup')}
          >
            무료로 시작하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => router.push('/login')}
          >
            로그인
          </Button>
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          주요 기능
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            무료로 가입하고 모든 기능을 체험해보세요
          </p>
          <Button 
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => router.push('/signup')}
          >
            무료 가입하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t bg-white dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 PNM - People Network Management System</p>
        </div>
      </footer>
    </div>
  );
}