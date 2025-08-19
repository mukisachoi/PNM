'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();

  const metrics = [
    {
      title: '총 연락처',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/50',
    },
    {
      title: '이번 달 미팅',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Calendar,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/50',
    },
    {
      title: '활동 점수',
      value: '0',
      change: '-0%',
      trend: 'down',
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/50',
    },
    {
      title: '네트워크 성장',
      value: '0%',
      change: '+0%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/50',
    },
  ];

  const recentActivities = [
    { date: '2024-01-20', type: '연락처 추가', detail: '홍길동님 추가' },
    { date: '2024-01-19', type: '미팅 완료', detail: '김철수님과 미팅' },
    { date: '2024-01-18', type: '그룹 생성', detail: '비즈니스 그룹 생성' },
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
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-5 w-5 mr-2" />
              새로고침
            </Button>
            <Button variant="outline">
              <Filter className="h-5 w-5 mr-2" />
              필터
            </Button>
            <Button variant="outline">
              <Download className="h-5 w-5 mr-2" />
              보고서 다운로드
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="border-0 dark:bg-gray-800/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {metric.title}
                    </p>
                    <p className="text-3xl font-bold mt-2">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm ${
                        metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {metric.change}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        vs 지난달
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Network Growth Chart */}
          <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>네트워크 성장 추이</CardTitle>
                <BarChart3 className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  데이터가 없습니다
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Distribution */}
          <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>연락처 분포</CardTitle>
                <PieChart className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  데이터가 없습니다
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Heatmap */}
          <Card className="border-0 dark:bg-gray-800/50 backdrop-blur lg:col-span-2">
            <CardHeader>
              <CardTitle>활동 히트맵</CardTitle>
              <CardDescription>
                일별 활동 빈도를 시각화
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  활동 데이터가 없습니다
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b dark:border-gray-700 last:border-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.type}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.detail}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    활동 내역이 없습니다
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="border-0 dark:bg-gray-800/50 backdrop-blur mt-8">
          <CardHeader>
            <CardTitle>인사이트</CardTitle>
            <CardDescription>
              데이터 기반 추천 사항
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  🎯 연락처 추가하기
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  첫 번째 연락처를 추가하여 네트워크 구축을 시작하세요.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                  📅 일정 관리하기
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  정기적인 미팅을 예약하여 관계를 유지하세요.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                  🔗 관계 설정하기
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  인맥 간의 관계를 설정하여 네트워크를 시각화하세요.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
