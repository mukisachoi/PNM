'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  UserPlus, 
  Search,
  Bell,
  Settings,
  BarChart3,
  Clock,
  Star,
  Phone,
  Mail,
  Trophy,
  ArrowUp,
  CalendarCheck,
  AlertCircle,
  LineChart,
  Activity
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContacts: 248,
    recentMeetings: 15,
    activityScore: 87,
    importantContacts: 42,
    monthlyGrowth: 12,
    upcomingMeetings: 3,
    followUpNeeded: 5
  });

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(false);
    } catch (error) {
      console.error('대시보드 데이터 로딩 오류:', error);
      setLoading(false);
    }
  };

  const quickActions = [
    { 
      icon: UserPlus, 
      label: '연락처 추가', 
      href: '/contacts/new',
      gradient: 'from-blue-500 to-purple-600'
    },
    { 
      icon: Calendar, 
      label: '일정 등록', 
      href: '/calendar',
      gradient: 'from-green-500 to-blue-600'
    },
    { 
      icon: Search, 
      label: '인맥 검색', 
      href: '/contacts',
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      icon: BarChart3, 
      label: '분석 보기', 
      href: '/analytics',
      gradient: 'from-yellow-500 to-red-600'
    },
  ];

  const recentActivities = [
    { title: '김철수님과 미팅', time: '2시간 전', color: 'bg-green-500' },
    { title: '이영희님 연락처 추가', time: '5시간 전', color: 'bg-blue-500' },
    { title: '박민수님 생일 알림', time: '1일 전', color: 'bg-purple-500' },
  ];

  const importantContacts = [
    { name: '김철수', company: 'ABC 회사', position: '부장', avatar: '김철수', bgColor: '667eea' },
    { name: '이영희', company: 'XYZ 기업', position: '팀장', avatar: '이영희', bgColor: 'f56565' },
    { name: '박민수', company: '프리랜서', position: '개발자', avatar: '박민수', bgColor: '48bb78' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6 space-y-6">
        {/* 헤더 */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              안녕하세요! 👋
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">오늘도 소중한 인연을 관리해보세요</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="hover:scale-110 transition-transform">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="hover:scale-110 transition-transform">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">전체 인맥</CardTitle>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                <Users className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalContacts}</div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                {stats.monthlyGrowth}% 증가
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">이번 달 미팅</CardTitle>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white">
                <Calendar className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.recentMeetings}</div>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 flex items-center">
                <CalendarCheck className="h-4 w-4 mr-1" />
                {stats.upcomingMeetings}개 예정
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">활동 점수</CardTitle>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white">
                <Trophy className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activityScore}</div>
              <div className="flex mt-2">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="h-4 w-4 text-gray-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">중요 연락처</CardTitle>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center text-white">
                <Star className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.importantContacts}</div>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {stats.followUpNeeded}명 팔로업 필요
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* 네트워크 성장 차트 */}
            <Card className="border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-purple-500" />
                  네트워크 성장 추이
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                  <p className="text-muted-foreground">차트 영역 (Chart.js 구현 예정)</p>
                </div>
              </CardContent>
            </Card>

            {/* 빠른 실행 버튼 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  className={`h-auto flex-col py-6 bg-gradient-to-r ${action.gradient} text-white border-0 hover:opacity-90 hover:scale-105 transition-all duration-300`}
                  onClick={() => router.push(action.href)}
                >
                  <action.icon className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 최근 활동 */}
            <Card className="border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  최근 활동
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`h-2 w-2 ${activity.color} rounded-full mt-2 animate-pulse`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 주요 인맥 */}
            <Card className="border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-500" />
                  주요 인맥
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {importantContacts.map((contact, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={`https://ui-avatars.com/api/?name=${contact.avatar}&background=${contact.bgColor}&color=fff`} 
                        alt={contact.name}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.company} | {contact.position}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-blue-500">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-green-500">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}