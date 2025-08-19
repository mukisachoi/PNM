'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database,
  Moon,
  Sun,
  Monitor,
  Download,
  Upload,
  Trash2
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
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
              설정
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              시스템 설정을 관리합니다
            </p>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="dark:bg-gray-800/50 backdrop-blur border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                프로필 설정
              </CardTitle>
              <CardDescription>
                사용자 정보를 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">이름</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">사용자</p>
                </div>
                <Button variant="outline" size="sm">수정</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">이메일</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">user@example.com</p>
                </div>
                <Button variant="outline" size="sm">수정</Button>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="dark:bg-gray-800/50 backdrop-blur border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                테마 설정
              </CardTitle>
              <CardDescription>
                화면 테마를 선택합니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                  className="flex items-center gap-2"
                >
                  <Sun className="h-4 w-4" />
                  라이트
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                  className="flex items-center gap-2"
                >
                  <Moon className="h-4 w-4" />
                  다크
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  onClick={() => setTheme('system')}
                  className="flex items-center gap-2"
                >
                  <Monitor className="h-4 w-4" />
                  시스템
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="dark:bg-gray-800/50 backdrop-blur border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                알림 설정
              </CardTitle>
              <CardDescription>
                알림을 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">이메일 알림</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">중요한 업데이트를 이메일로 받기</p>
                </div>
                <Button variant="outline" size="sm">설정</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">푸시 알림</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">브라우저 푸시 알림 받기</p>
                </div>
                <Button variant="outline" size="sm">설정</Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="dark:bg-gray-800/50 backdrop-blur border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                데이터 관리
              </CardTitle>
              <CardDescription>
                데이터를 가져오거나 내보냅니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  데이터 내보내기
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  데이터 가져오기
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="dark:bg-gray-800/50 backdrop-blur border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                보안 설정
              </CardTitle>
              <CardDescription>
                계정 보안을 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">비밀번호 변경</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">계정 비밀번호를 변경합니다</p>
                </div>
                <Button variant="outline" size="sm">변경</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">2단계 인증</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">추가 보안을 위한 2단계 인증</p>
                </div>
                <Button variant="outline" size="sm">설정</Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-900 dark:bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <Trash2 className="h-5 w-5" />
                위험 구역
              </CardTitle>
              <CardDescription>
                복구할 수 없는 작업입니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                계정 삭제
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
