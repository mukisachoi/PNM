'use client'

import { useEffect, useState } from 'react'
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Activity,
  UserPlus,
  CalendarPlus,
  Network,
  ArrowUp,
  ArrowDown,
  Clock,
  MoreVertical
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { formatDate, getRelativeTime } from '@/lib/utils'

interface Stats {
  totalContacts: number
  totalEvents: number
  recentContacts: number
  upcomingEvents: number
  contactsGrowth: number
  eventsGrowth: number
}

interface RecentActivity {
  id: string
  type: 'contact' | 'event' | 'relationship'
  action: string
  timestamp: string
  details: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    totalEvents: 0,
    recentContacts: 0,
    upcomingEvents: 0,
    contactsGrowth: 0,
    eventsGrowth: 0,
  })
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 인맥 통계
      const { count: contactCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', user.id)

      // 행사 통계
      const { count: eventCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })

      // 최근 7일 인맥
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      
      const { count: recentContactCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', user.id)
        .gte('created_at', sevenDaysAgo.toISOString())

      // 예정된 행사
      const today = new Date().toISOString().split('T')[0]
      const { count: upcomingCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .gte('start_date', today)

      setStats({
        totalContacts: contactCount || 0,
        totalEvents: eventCount || 0,
        recentContacts: recentContactCount || 0,
        upcomingEvents: upcomingCount || 0,
        contactsGrowth: 12.5, // 예시 데이터
        eventsGrowth: 8.3, // 예시 데이터
      })

      // 최근 활동 (예시 데이터)
      setRecentActivities([
        {
          id: '1',
          type: 'contact',
          action: '새 인맥 추가',
          timestamp: new Date().toISOString(),
          details: '김철수님을 인맥에 추가했습니다',
        },
        {
          id: '2',
          type: 'event',
          action: '행사 생성',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          details: '2024 신년 네트워킹 파티',
        },
        {
          id: '3',
          type: 'relationship',
          action: '관계 연결',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          details: '이영희님과 박민수님을 연결했습니다',
        },
      ])
    } catch (error) {
      console.error('대시보드 데이터 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    growth, 
    color 
  }: { 
    title: string
    value: number | string
    icon: any
    growth?: number
    color: string
  }) => (
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        {growth !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {growth > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(growth)}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-sm text-muted-foreground mt-1">{title}</p>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">대시보드</h1>
          <p className="text-muted-foreground mt-1">
            인맥관리 현황을 한눈에 확인하세요
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <CalendarPlus className="h-4 w-4 mr-2" />
            행사 추가
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            인맥 추가
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="전체 인맥"
          value={stats.totalContacts}
          icon={Users}
          growth={stats.contactsGrowth}
          color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        />
        <StatCard
          title="전체 행사"
          value={stats.totalEvents}
          icon={Calendar}
          growth={stats.eventsGrowth}
          color="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
        />
        <StatCard
          title="최근 인맥"
          value={stats.recentContacts}
          icon={TrendingUp}
          color="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
        />
        <StatCard
          title="예정 행사"
          value={stats.upcomingEvents}
          icon={Activity}
          color="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
        />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 최근 활동 */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">최근 활동</h2>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  activity.type === 'contact' 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    : activity.type === 'event'
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                }`}>
                  {activity.type === 'contact' && <Users className="h-4 w-4" />}
                  {activity.type === 'event' && <Calendar className="h-4 w-4" />}
                  {activity.type === 'relationship' && <Network className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {getRelativeTime(activity.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 빠른 작업 */}
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">빠른 작업</h2>
          </div>
          <div className="p-6 space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <UserPlus className="h-4 w-4 mr-2" />
              새 인맥 추가
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <CalendarPlus className="h-4 w-4 mr-2" />
              행사 일정 등록
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Network className="h-4 w-4 mr-2" />
              관계도 보기
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              인맥 검색
            </Button>
          </div>
        </div>
      </div>

      {/* 예정된 행사 */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">예정된 행사</h2>
            <Button variant="ghost" size="sm">
              전체보기
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">2024 신년 네트워킹 파티</h3>
                  <p className="text-sm text-muted-foreground">
                    2024년 1월 15일 • 서울 강남
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  상세보기
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}