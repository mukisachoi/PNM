'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Network, ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';

export default function NetworkPage() {
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
                관계 네트워크
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                인맥 간의 관계를 시각적으로 확인하세요
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ZoomIn className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <ZoomOut className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Maximize2 className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Network Visualization Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 min-h-[600px] flex items-center justify-center">
          <div className="text-center">
            <Network className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              네트워크 시각화 준비 중
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              연락처를 추가하면 관계 네트워크가 표시됩니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
