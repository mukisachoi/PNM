'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, TrendingUp, Users, Calendar, Activity, PieChart } from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();

  const stats = [
    {
      title: '총 연락처',
      value: '0',
      change: '+0%',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-500',
    },
    {
      title: '이번 달 미팅',
      value: '0',
      change: '+0%',
      icon: <Calendar className="h-5 w-5" />,
      color: 'bg-green-500',
    },
    {
      title: '활동 점수',
      value: '0',
      change: '+0%',
      icon: <Activity className="h-5 w-5" />,
      color: 'bg-purple-500',
    },
    {
      title: '네트워크 성장률',
      value: '0%',
      change: '+0%',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/')}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                분석 대시보드
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                인맥 활동 통계 및 인사이트
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="dark:bg-gray-800/50 backdrop-blur border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} text-white p-2 rounded-lg`}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {stat.change} 지난 달 대비
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dark:bg-gray-800/50 backdrop-blur border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                월별 활동 추이
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  데이터가 충분하지 않습니다
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800/50 backdrop-blur border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                그룹별 분포
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  데이터가 충분하지 않습니다
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
