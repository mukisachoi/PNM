'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  User,
  Bell,
  Shield,
  Database,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Download,
  Upload,
  Trash2,
  Key,
  Mail,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const settingsSections = [
    {
      title: '프로필 설정',
      icon: User,
      items: [
        { label: '이름', value: '사용자', type: 'text' },
        { label: '이메일', value: 'user@example.com', type: 'email' },
        { label: '전화번호', value: '010-0000-0000', type: 'tel' },
      ],
    },
    {
      title: '알림 설정',
      icon: Bell,
      items: [
        { label: '이메일 알림', value: true, type: 'switch' },
        { label: '푸시 알림', value: false, type: 'switch' },
        { label: '일정 리마인더', value: true, type: 'switch' },
      ],
    },
    {
      title: '개인정보 보호',
      icon: Shield,
      items: [
        { label: '프로필 공개', value: '친구만', type: 'select', options: ['전체 공개', '친구만', '비공개'] },
        { label: '활동 기록', value: true, type: 'switch' },
        { label: '데이터 수집', value: false, type: 'switch' },
      ],
    },
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
                설정
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                시스템 설정 및 환경 구성
              </p>
            </div>
          </div>
          <Button>
            <Save className="h-5 w-5 mr-2" />
            저장
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {settingsSections.map((section, index) => (
              <Card key={index} className="border-0 dark:bg-gray-800/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <section.icon className="h-5 w-5 text-gray-500" />
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between">
                        <label className="text-sm font-medium">
                          {item.label}
                        </label>
                        {item.type === 'text' || item.type === 'email' || item.type === 'tel' ? (
                          <input
                            type={item.type}
                            defaultValue={item.value as string}
                            className="w-1/2 px-3 py-1 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                          />
                        ) : item.type === 'switch' ? (
                          <button
                            className={`w-12 h-6 rounded-full transition-colors ${
                              item.value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                item.value ? 'translate-x-6' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        ) : item.type === 'select' ? (
                          <select className="px-3 py-1 border rounded-lg dark:bg-gray-900 dark:border-gray-700">
                            {item.options?.map((option) => (
                              <option key={option} selected={option === item.value}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Data Management */}
            <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-gray-500" />
                  <CardTitle>데이터 관리</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    데이터 내보내기
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    데이터 가져오기
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    모든 데이터 삭제
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Theme Settings */}
            <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle>테마 설정</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <button
                    onClick={() => setTheme('light')}
                    className={`w-full p-3 rounded-lg border flex items-center gap-3 transition-colors ${
                      theme === 'light'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Sun className="h-5 w-5" />
                    <span>라이트 모드</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`w-full p-3 rounded-lg border flex items-center gap-3 transition-colors ${
                      theme === 'dark'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Moon className="h-5 w-5" />
                    <span>다크 모드</span>
                  </button>
                  <button
                    onClick={() => setTheme('system')}
                    className={`w-full p-3 rounded-lg border flex items-center gap-3 transition-colors ${
                      theme === 'system'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Smartphone className="h-5 w-5" />
                    <span>시스템 설정</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle>계정 설정</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Key className="h-4 w-4 mr-2" />
                    비밀번호 변경
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    이메일 변경
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    2단계 인증
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Language Settings */}
            <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle>언어 설정</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <select className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700">
                    <option>한국어</option>
                    <option>English</option>
                    <option>日本語</option>
                    <option>中文</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle>정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">버전</span>
                    <span>2.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">업데이트</span>
                    <span>최신 버전</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">라이선스</span>
                    <span>MIT</span>
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
