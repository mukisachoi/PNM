'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
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
  Menu,
  X
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';

interface Contact {
  id: string;
  name: string;
  company: string | null;
  position: string | null;
  email: string | null;
  phone: string | null;
  importance: number;
}

interface Activity {
  id: string;
  title: string;
  time: string;
  color: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 상태 관리
  const [stats, setStats] = useState({
    totalContacts: 0,
    recentMeetings: 0,
    activityScore: 0,
    importantContacts: 0,
    monthlyGrowth: 0,
    upcomingMeetings: 0,
    followUpNeeded: 0
  });

  const [importantContacts, setImportantContacts] = useState<Contact[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  // 인증 체크
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
      return false;
    }
    return true;
  };

  // 상대 시간 계산
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  // 대시보드 데이터 로드
  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // 1. 전체 연락처 수
      const { count: contactsCount, data: allContacts } = await supabase
        .from('contacts')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id);

      // 2. 이번 달 미팅 수
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      
      const { count: meetingsCount } = await supabase
        .from('interactions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('interaction_date', startOfMonth.toISOString())
        .eq('interaction_type', 'meeting');

      // 3. 중요 연락처 (importance >= 4)
      const { data: vipContacts, count: importantCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .gte('importance', 4)
        .order('importance', { ascending: false })
        .limit(3);

      // 4. 최근 활동
      const { data: recentInteractions } = await supabase
        .from('interactions')
        .select(`
          *,
          contacts!inner(name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      // 5. 지난달 대비 증가율 계산
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      
      const { count: lastMonthContacts } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .lt('created_at', startOfMonth.toISOString())
        .gte('created_at', lastMonth.toISOString());

      const growth = lastMonthContacts ? 
        Math.round(((contactsCount || 0) - lastMonthContacts) / lastMonthContacts * 100) : 0;

      // 상태 업데이트
      setStats({
        totalContacts: contactsCount || 0,
        recentMeetings: meetingsCount || 0,
        activityScore: Math.min(100, (contactsCount || 0) * 2 + (meetingsCount || 0) * 5),
        importantContacts: importantCount || 0,
        monthlyGrowth: growth,
        upcomingMeetings: 0, // TODO: 캘린더 연동 필요
        followUpNeeded: Math.floor((importantCount || 0) * 0.3)
      });

      // 중요 연락처 설정
      if (vipContacts && vipContacts.length > 0) {
        setImportantContacts(vipContacts);
      } else if (allContacts && allContacts.length > 0) {
        // 중요 연락처가 없으면 최근 연락처 표시
        setImportantContacts(allContacts.slice(0, 3));
      }

      // 최근 활동 설정
      if (recentInteractions && recentInteractions.length > 0) {
        const activities = recentInteractions.map(interaction => ({
          id: interaction.id,
          title: `${interaction.contacts?.name || '알 수 없음'}님과 ${
            interaction.interaction_type === 'meeting' ? '미팅' : 
            interaction.interaction_type === 'call' ? '통화' : 
            interaction.interaction_type === 'email' ? '이메일' : '연락'
          }`,
          time: getRelativeTime(interaction.created_at),
          color: interaction.interaction_type === 'meeting' ? 'bg-green-500' : 
                 interaction.interaction_type === 'call' ? 'bg-blue-500' : 'bg-purple-500'
        }));
        setRecentActivities(activities);
      }

    } catch (error) {
      console.error('대시보드 데이터 로딩 오류:', error);
      toast.error('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        await loadDashboardData();
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 빠른 실행 버튼
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
      {/* 모바일 메뉴 버튼 */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white dark:bg-gray-800"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 p-6">
          <nav className="space-y-4">
            <Button 
              className="w-full justify-start" 
              variant="ghost"
              onClick={() => { router.push('/dashboard'); setMobileMenuOpen(false); }}
            >
              대시보드
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="ghost"
              onClick={() => { router.push('/contacts'); setMobileMenuOpen(false); }}
            >
              인맥 관리
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="ghost"
              onClick={() => { router.push('/calendar'); setMobileMenuOpen(false); }}
            >
              일정 관리
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="ghost"
              onClick={() => { router.push('/analytics'); setMobileMenuOpen(false); }}
            >
              분석
            </Button>
          </nav>
        </div>
      )}

      <div className="container mx-auto p-4 lg:p-6 space-y-6 max-w-7xl">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              안녕하세요! 👋
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-2">
              오늘도 소중한 인연을 관리해보세요
            </p>
          </div>
          <div className="hidden lg:flex gap-2">
            <Button variant="outline" size="icon" className="hover:scale-110 transition-transform">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="hover:scale-110 transition-transform">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 통계 카드 - 모바일 최적화 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 lg:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">전체 인맥</CardTitle>
              <div className="h-8 w-8 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                <Users className="h-4 w-4 lg:h-6 lg:w-6" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{stats.totalContacts}</div>
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-1 lg:mt-2 flex items-center">
                <ArrowUp className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                {stats.monthlyGrowth}% 증가
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 lg:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">이번 달 미팅</CardTitle>
              <div className="h-8 w-8 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white">
                <Calendar className="h-4 w-4 lg:h-6 lg:w-6" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{stats.recentMeetings}</div>
              <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 mt-1 lg:mt-2 flex items-center">
                <CalendarCheck className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                {stats.upcomingMeetings}개 예정
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 lg:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">활동 점수</CardTitle>
              <div className="h-8 w-8 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white">
                <Trophy className="h-4 w-4 lg:h-6 lg:w-6" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{stats.activityScore}</div>
              <div className="flex mt-1 lg:mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-3 w-3 lg:h-4 lg:w-4 ${
                      star <= Math.floor(stats.activityScore / 20) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 lg:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">중요 연락처</CardTitle>
              <div className="h-8 w-8 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center text-white">
                <Star className="h-4 w-4 lg:h-6 lg:w-6" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{stats.importantContacts}</div>
              <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 mt-1 lg:mt-2 flex items-center">
                <AlertCircle className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                {stats.followUpNeeded}명 팔로업
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 메인 컨텐츠 - 반응형 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* 네트워크 성장 차트 */}
            <Card className="border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
              <CardHeader className="p-4 lg:p-6">
                <CardTitle className="flex items-center text-sm lg:text-base">
                  <LineChart className="h-4 w-4 lg:h-5 lg:w-5 mr-2 text-purple-500" />
                  네트워크 성장 추이
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
                <div className="h-48 lg:h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                  <p className="text-xs lg:text-sm text-muted-foreground">차트 영역</p>
                </div>
              </CardContent>
            </Card>

            {/* 빠른 실행 버튼 - 모바일 최적화 */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  className={`h-auto flex-col py-4 lg:py-6 bg-gradient-to-r ${action.gradient} text-white border-0 hover:opacity-90 hover:scale-105 transition-all duration-300`}
                  onClick={() => router.push(action.href)}
                >
                  <action.icon className="h-6 w-6 lg:h-8 lg:w-8 mb-1 lg:mb-2" />
                  <span className="text-xs lg:text-sm font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 최근 활동 */}
            <Card className="border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
              <CardHeader className="p-4 lg:p-6">
                <CardTitle className="flex items-center text-sm lg:text-base">
                  <Clock className="h-4 w-4 lg:h-5 lg:w-5 mr-2 text-blue-500" />
                  최근 활동
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
                <div className="space-y-3 lg:space-y-4">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`h-2 w-2 ${activity.color} rounded-full mt-1.5 lg:mt-2 animate-pulse`}></div>
                        <div className="flex-1">
                          <p className="text-xs lg:text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs lg:text-sm text-muted-foreground text-center py-4">
                      아직 활동이 없습니다
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 주요 인맥 */}
            <Card className="border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur">
              <CardHeader className="p-4 lg:p-6">
                <CardTitle className="flex items-center text-sm lg:text-base">
                  <Users className="h-4 w-4 lg:h-5 lg:w-5 mr-2 text-purple-500" />
                  주요 인맥
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
                <div className="space-y-3">
                  {importantContacts.length > 0 ? (
                    importantContacts.map((contact) => (
                      <div 
                        key={contact.id}
                        className="flex items-center space-x-3 p-2 lg:p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                        onClick={() => router.push(`/contacts/${contact.id}`)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          className="h-8 w-8 lg:h-10 lg:w-10 rounded-full" 
                          src={`https://ui-avatars.com/api/?name=${contact.name}&background=667eea&color=fff`} 
                          alt={contact.name}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs lg:text-sm font-medium truncate">{contact.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {contact.company || '회사 미등록'} | {contact.position || '직책 미등록'}
                          </p>
                        </div>
                        <div className="flex space-x-1 lg:space-x-2">
                          {contact.phone && (
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-6 w-6 lg:h-8 lg:w-8 hover:text-blue-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `tel:${contact.phone}`;
                              }}
                            >
                              <Phone className="h-3 w-3 lg:h-4 lg:w-4" />
                            </Button>
                          )}
                          {contact.email && (
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-6 w-6 lg:h-8 lg:w-8 hover:text-green-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `mailto:${contact.email}`;
                              }}
                            >
                              <Mail className="h-3 w-3 lg:h-4 lg:w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-xs lg:text-sm text-muted-foreground mb-4">
                        아직 등록된 연락처가 없습니다
                      </p>
                      <Button 
                        size="sm"
                        onClick={() => router.push('/contacts/new')}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        첫 연락처 추가하기
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}