'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Video,
  Phone,
  Coffee,
  Briefcase
} from 'lucide-react';

export default function CalendarPage() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const events = [
    {
      id: 1,
      title: '김철수님과 미팅',
      date: '2024-01-20',
      time: '14:00',
      type: 'meeting',
      location: '강남 카페',
      attendees: ['김철수'],
    },
    {
      id: 2,
      title: '온라인 회의',
      date: '2024-01-22',
      time: '10:00',
      type: 'video',
      location: 'Zoom',
      attendees: ['이영희', '박민수'],
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: '팀 미팅',
      date: '오늘',
      time: '15:00',
      type: 'meeting',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: '비디오 콜',
      date: '내일',
      time: '10:00',
      type: 'video',
      icon: Video,
      color: 'bg-green-500',
    },
    {
      id: 3,
      title: '커피 미팅',
      date: '1월 25일',
      time: '14:00',
      type: 'coffee',
      icon: Coffee,
      color: 'bg-orange-500',
    },
  ];

  const stats = [
    { label: '이번 달 일정', value: events.length, icon: Calendar, color: 'text-blue-500' },
    { label: '이번 주 일정', value: 3, icon: Clock, color: 'text-green-500' },
    { label: '오늘 일정', value: 1, icon: Briefcase, color: 'text-purple-500' },
    { label: '참석자', value: 5, icon: Users, color: 'text-orange-500' },
  ];

  // 달력 날짜 생성
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

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
                일정 관리
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                미팅 및 이벤트 일정 관리
              </p>
            </div>
          </div>
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            새 일정
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 dark:bg-gray-800/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {currentMonth.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newMonth = new Date(currentMonth);
                        newMonth.setMonth(newMonth.getMonth() - 1);
                        setCurrentMonth(newMonth);
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentMonth(new Date())}
                    >
                      오늘
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newMonth = new Date(currentMonth);
                        newMonth.setMonth(newMonth.getMonth() + 1);
                        setCurrentMonth(newMonth);
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  {/* Week days header */}
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="bg-gray-50 dark:bg-gray-800 p-2 text-center text-sm font-semibold"
                    >
                      {day}
                    </div>
                  ))}
                  {/* Calendar days */}
                  {calendarDays.map((day, index) => {
                    const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                    const isToday = day.toDateString() === new Date().toDateString();
                    const dayEvents = events.filter(
                      (event) => event.date === day.toISOString().split('T')[0]
                    );
                    
                    return (
                      <div
                        key={index}
                        className={`
                          bg-white dark:bg-gray-900 p-2 min-h-[80px] cursor-pointer
                          hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                          ${!isCurrentMonth ? 'opacity-50' : ''}
                          ${isToday ? 'ring-2 ring-blue-500' : ''}
                        `}
                      >
                        <div className={`text-sm ${isToday ? 'font-bold text-blue-500' : ''}`}>
                          {day.getDate()}
                        </div>
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className="mt-1 text-xs p-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded truncate"
                          >
                            {event.time} {event.title}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div>
            <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle>다가오는 일정</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                    >
                      <div className={`${event.color} p-2 rounded-lg text-white`}>
                        <event.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {event.date} · {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  모든 일정 보기
                </Button>
              </CardContent>
            </Card>

            {/* Event Types */}
            <Card className="border-0 dark:bg-gray-800/50 backdrop-blur mt-6">
              <CardHeader>
                <CardTitle>일정 유형</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">미팅</span>
                    </div>
                    <span className="text-sm text-gray-500">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">화상 회의</span>
                    </div>
                    <span className="text-sm text-gray-500">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">커피 미팅</span>
                    </div>
                    <span className="text-sm text-gray-500">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">전화</span>
                    </div>
                    <span className="text-sm text-gray-500">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
