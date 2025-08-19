'use client'

import { useEffect, useState } from 'react'
import { 
  Calendar,
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  Edit,
  Trash2,
  Eye,
  CalendarDays,
  Tag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { formatDate } from '@/lib/utils'
import { Event } from '@/types/database'
import toast from 'react-hot-toast'

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'past'>('all')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [searchQuery, filterType, events])

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: false })

      if (error) throw error

      setEvents(data || [])
    } catch (error) {
      console.error('행사 목록 로딩 실패:', error)
      toast.error('행사 목록을 불러오는데 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  const filterEvents = () => {
    let filtered = [...events]
    
    // 검색 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.place?.toLowerCase().includes(query) ||
        event.theme?.toLowerCase().includes(query)
      )
    }

    // 시간 필터
    const today = new Date().toISOString().split('T')[0]
    if (filterType === 'upcoming') {
      filtered = filtered.filter(event => 
        event.start_date && event.start_date >= today
      )
    } else if (filterType === 'past') {
      filtered = filtered.filter(event => 
        event.end_date && event.end_date < today
      )
    }

    setFilteredEvents(filtered)
  }

  const handleDelete = async (eventId: number) => {
    if (!confirm('정말 이 행사를 삭제하시겠습니까?')) return

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('event_id', eventId)

      if (error) throw error

      toast.success('행사가 삭제되었습니다')
      fetchEvents()
    } catch (error) {
      toast.error('삭제 중 오류가 발생했습니다')
    }
  }

  const EventCard = ({ event }: { event: Event }) => {
    const isUpcoming = event.start_date && new Date(event.start_date) >= new Date()
    
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
        {event.poster_img && (
          <div className="h-48 bg-muted">
            <img 
              src={event.poster_img} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
              {event.theme && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Tag className="h-3 w-3" />
                  {event.theme}
                </div>
              )}
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              isUpcoming 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
            }`}>
              {isUpcoming ? '예정' : '종료'}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            {(event.start_date || event.end_date) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {event.start_date && formatDate(event.start_date, 'short')}
                {event.end_date && event.start_date !== event.end_date && (
                  <> ~ {formatDate(event.end_date, 'short')}</>
                )}
              </div>
            )}
            
            {event.place && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {event.place}
              </div>
            )}
          </div>

          {event.summary && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {event.summary}
            </p>
          )}

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Eye className="h-3 w-3 mr-1" />
              상세
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Edit className="h-3 w-3 mr-1" />
              수정
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => handleDelete(event.event_id)}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              삭제
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
          <h1 className="text-3xl font-bold">행사 관리</h1>
          <p className="text-muted-foreground mt-1">
            총 {filteredEvents.length}개의 행사
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          행사 추가
        </Button>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-card p-4 rounded-lg border border-border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="행사명, 장소, 주제로 검색..."
              className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterType('all')}
            >
              전체
            </Button>
            <Button
              variant={filterType === 'upcoming' ? 'default' : 'outline'}
              onClick={() => setFilterType('upcoming')}
            >
              예정된 행사
            </Button>
            <Button
              variant={filterType === 'past' ? 'default' : 'outline'}
              onClick={() => setFilterType('past')}
            >
              지난 행사
            </Button>
          </div>
        </div>
      </div>

      {/* 행사 목록 */}
      {filteredEvents.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">행사가 없습니다</h3>
          <p className="text-muted-foreground mb-4">
            새로운 행사를 추가하여 관리를 시작하세요
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            첫 행사 추가하기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}