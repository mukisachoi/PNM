'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Network, BarChart3, Settings, UserPlus, Search, TrendingUp, Calendar } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Personal Network Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            인맥 관계를 체계적으로 관리하는 스마트한 도구
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              onClick={action.action}
              className="flex items-center gap-2"
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
              className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleFeatureClick(feature.path)}
            >
              <CardHeader>
                <div className={`${feature.color} text-white p-3 rounded-lg inline-block mb-4`}>
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">총 연락처</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">등록된 인맥</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">이번 달 미팅</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">예정된 일정</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">활동 점수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">이번 주 활동</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
