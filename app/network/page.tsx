'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Network, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Download,
  Settings,
  Users,
  Link,
  Activity,
  Globe
} from 'lucide-react';

export default function NetworkPage() {
  const router = useRouter();

  const stats = [
    { label: '총 연결', value: '0', icon: Link, color: 'text-blue-500' },
    { label: '활성 노드', value: '0', icon: Users, color: 'text-green-500' },
    { label: '그룹', value: '0', icon: Globe, color: 'text-purple-500' },
    { label: '관계 강도', value: '0%', icon: Activity, color: 'text-orange-500' },
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
                관계 네트워크
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                인맥 간의 관계를 시각적으로 표현
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-5 w-5 mr-2" />
              이미지 저장
            </Button>
            <Button variant="outline">
              <Settings className="h-5 w-5 mr-2" />
              설정
            </Button>
          </div>
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

        {/* Network Visualization Area */}
        <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>네트워크 시각화</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Network className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">네트워크가 비어있습니다</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  연락처를 추가하고 관계를 설정하면 여기에 표시됩니다
                </p>
                <Button onClick={() => router.push('/contacts')}>
                  연락처 관리로 이동
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">노드 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">크기</label>
                  <input type="range" className="w-full mt-1" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">색상 기준</label>
                  <select className="w-full mt-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
                    <option>그룹별</option>
                    <option>중요도별</option>
                    <option>활동별</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">엣지 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">두께</label>
                  <input type="range" className="w-full mt-1" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">스타일</label>
                  <select className="w-full mt-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
                    <option>실선</option>
                    <option>점선</option>
                    <option>화살표</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">레이아웃</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">알고리즘</label>
                  <select className="w-full mt-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700">
                    <option>Force-directed</option>
                    <option>Hierarchical</option>
                    <option>Circular</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">간격</label>
                  <input type="range" className="w-full mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
