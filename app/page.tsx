'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Network, BarChart3, Settings, UserPlus, Search, TrendingUp, Calendar, Moon, Sun } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: '인맥 관리',
      description: '체계적인 인맥 정보 관리와 그룹화',
      path: '/contacts',
      color: 'bg-blue-500',
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: '관계 네트워크',
      description: '인맥 간의 관계를 시각적으로 표현',
      path: '/network',
      color: 'bg-green-500',
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: '일정 관리',
      description: '미팅 및 이벤트 일정 관리',
      path: '/calendar',
      color: 'bg-purple-500',
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: '분석 대시보드',
      description: '인맥 활동 통계 및 인사이트',
      path: '/analytics',
      color: 'bg-orange-500',
    },
  ];

  const quickActions = [
    {
      icon: <UserPlus className="h-5 w-5" />,
      label: '새 연락처 추가',
      action: () => router.push('/contacts/new'),
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: '연락처 검색',
      action: () => router.push('/contacts?search=true'),
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: '활동 분석',
      action: () => router.push('/analytics'),
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: '설정',
      action: () => router.push('/settings'),
    },
  ];

  const handleFeatureClick = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Logo and Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Logo size={60} />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                인맥관리
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                People Network Management System
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              onClick={action.action}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-0 dark:bg-gray-800/50 backdrop-blur"
              onClick={() => handleFeatureClick(feature.path)}
            >
              <CardHeader>
                <div className={`${feature.color} text-white p-3 rounded-lg inline-block mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dark:bg-gray-800/50 backdrop-blur border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">총 연락처</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">0</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">등록된 인맥</p>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800/50 backdrop-blur border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">이번 달 미팅</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">0</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">예정된 일정</p>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800/50 backdrop-blur border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">활동 점수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">0</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">이번 주 활동</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 PNM - People Network Management System</p>
          <p className="mt-2">
            <a href="http://localhost:3001" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              http://localhost:3001
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
