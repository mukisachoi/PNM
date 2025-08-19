'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPage() {
  const router = useRouter();

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
                미팅 및 이벤트를 관리하세요
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            새 일정
          </Button>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              2024년 1월
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline">오늘</Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 min-h-[500px] flex items-center justify-center">
          <div className="text-center">
            <Calendar className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              일정이 없습니다
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              새로운 일정을 추가하여 스케줄을 관리하세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
