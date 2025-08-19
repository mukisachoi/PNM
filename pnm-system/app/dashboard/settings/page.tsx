'use client'

import { useState, useEffect } from 'react'
import { 
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Loader2,
  Moon,
  Sun,
  Monitor,
  Lock,
  Unlock,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useTheme } from 'next-themes'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const { theme, setTheme } = useTheme()
  const supabase = createClient()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single()

      if (!error && data) {
        setUserData(data)
      }
    } catch (error) {
      console.error('사용자 데이터 로딩 실패:', error)
    }
  }

  const tabs = [
    { id: 'profile', label: '프로필', icon: User },
    { id: 'privacy', label: '프라이버시', icon: Shield },
    { id: 'notifications', label: '알림', icon: Bell },
    { id: 'appearance', label: '테마', icon: Palette },
    { id: 'data', label: '데이터', icon: Database },
    { id: 'security', label: '보안', icon: Key },
  ]

  const ProfileSettings = () => {
    const [formData, setFormData] = useState({
      name: userData?.name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      address: userData?.address || '',
    })

    const handleSave = async () => {
      setIsLoading(true)
      try {
        const { error } = await supabase
          .from('users')
          .update(formData)
          .eq('user_id', userData.user_id)

        if (error) throw error
        toast.success('프로필이 업데이트되었습니다')
      } catch (error) {
        toast.error('프로필 업데이트 실패')
      } finally {
        setIsLoading(false)
      }
    }

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">프로필 정보</h3>
          
          {/* 프로필 이미지 */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              {userData?.profile_img ? (
                <img src={userData.profile_img} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-primary" />
              )}
            </div>
            <div>
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                사진 변경
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG 또는 GIF (최대 2MB)
              </p>
            </div>
          </div>

          {/* 폼 필드 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">이름</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                이메일은 변경할 수 없습니다
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">전화번호</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="010-1234-5678"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">주소</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="서울시 강남구..."
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSave} disabled={isLoading} className="mt-6">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                저장 중...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                변경사항 저장
              </>
            )}
          </Button>
        </div>
      </div>
    )
  }

  const PrivacySettings = () => {
    const [privacy, setPrivacy] = useState({
      profilePublic: userData?.is_public || false,
      showEmail: false,
      showPhone: false,
      allowSearch: true,
    })

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">프라이버시 설정</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-3">
                {privacy.profilePublic ? <Unlock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                <div>
                  <p className="font-medium">공개 프로필</p>
                  <p className="text-sm text-muted-foreground">
                    다른 사용자가 내 프로필을 볼 수 있습니다
                  </p>
                </div>
              </div>
              <Button
                variant={privacy.profilePublic ? "default" : "outline"}
                size="sm"
                onClick={() => setPrivacy({ ...privacy, profilePublic: !privacy.profilePublic })}
              >
                {privacy.profilePublic ? "공개" : "비공개"}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <div>
                  <p className="font-medium">이메일 공개</p>
                  <p className="text-sm text-muted-foreground">
                    프로필에 이메일 주소를 표시합니다
                  </p>
                </div>
              </div>
              <Button
                variant={privacy.showEmail ? "default" : "outline"}
                size="sm"
                onClick={() => setPrivacy({ ...privacy, showEmail: !privacy.showEmail })}
              >
                {privacy.showEmail ? "공개" : "비공개"}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <div>
                  <p className="font-medium">전화번호 공개</p>
                  <p className="text-sm text-muted-foreground">
                    프로필에 전화번호를 표시합니다
                  </p>
                </div>
              </div>
              <Button
                variant={privacy.showPhone ? "default" : "outline"}
                size="sm"
                onClick={() => setPrivacy({ ...privacy, showPhone: !privacy.showPhone })}
              >
                {privacy.showPhone ? "공개" : "비공개"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AppearanceSettings = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">테마 설정</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                theme === 'light' ? 'border-primary bg-primary/10' : 'border-border'
              }`}
            >
              <Sun className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">라이트</p>
            </button>
            
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                theme === 'dark' ? 'border-primary bg-primary/10' : 'border-border'
              }`}
            >
              <Moon className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">다크</p>
            </button>
            
            <button
              onClick={() => setTheme('system')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                theme === 'system' ? 'border-primary bg-primary/10' : 'border-border'
              }`}
            >
              <Monitor className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">시스템</p>
            </button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            시스템 설정을 선택하면 기기의 테마 설정에 따라 자동으로 변경됩니다
          </p>
        </div>
      </div>
    )
  }

  const DataSettings = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">데이터 관리</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5" />
                  <div>
                    <p className="font-medium">데이터 내보내기</p>
                    <p className="text-sm text-muted-foreground">
                      모든 데이터를 Excel 파일로 다운로드합니다
                    </p>
                  </div>
                </div>
                <Button variant="outline">
                  내보내기
                </Button>
              </div>
            </div>

            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5" />
                  <div>
                    <p className="font-medium">데이터 가져오기</p>
                    <p className="text-sm text-muted-foreground">
                      Excel 파일에서 데이터를 가져옵니다
                    </p>
                  </div>
                </div>
                <Button variant="outline">
                  가져오기
                </Button>
              </div>
            </div>

            <div className="p-4 bg-card rounded-lg border border-destructive/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">계정 삭제</p>
                    <p className="text-sm text-muted-foreground">
                      모든 데이터가 영구적으로 삭제됩니다
                    </p>
                  </div>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  계정 삭제
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const SecuritySettings = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">보안 설정</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5" />
                  <div>
                    <p className="font-medium">비밀번호 변경</p>
                    <p className="text-sm text-muted-foreground">
                      정기적으로 비밀번호를 변경하는 것을 권장합니다
                    </p>
                  </div>
                </div>
                <Button variant="outline">
                  변경하기
                </Button>
              </div>
            </div>

            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5" />
                  <div>
                    <p className="font-medium">2단계 인증</p>
                    <p className="text-sm text-muted-foreground">
                      계정 보안을 강화합니다
                    </p>
                  </div>
                </div>
                <Button variant="outline">
                  설정하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const NotificationSettings = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">알림 설정</h3>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-card rounded-lg border cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5" />
                <div>
                  <p className="font-medium">이메일 알림</p>
                  <p className="text-sm text-muted-foreground">
                    중요한 업데이트를 이메일로 받습니다
                  </p>
                </div>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </label>

            <label className="flex items-center justify-between p-4 bg-card rounded-lg border cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5" />
                <div>
                  <p className="font-medium">행사 알림</p>
                  <p className="text-sm text-muted-foreground">
                    예정된 행사 전에 알림을 받습니다
                  </p>
                </div>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </label>

            <label className="flex items-center justify-between p-4 bg-card rounded-lg border cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5" />
                <div>
                  <p className="font-medium">인맥 알림</p>
                  <p className="text-sm text-muted-foreground">
                    새로운 인맥 추가 시 알림을 받습니다
                  </p>
                </div>
              </div>
              <input type="checkbox" className="rounded" />
            </label>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-3xl font-bold">설정</h1>
        <p className="text-muted-foreground mt-1">
          계정 및 애플리케이션 설정을 관리합니다
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 탭 메뉴 */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="flex-1 bg-card rounded-lg border border-border p-6">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'data' && <DataSettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  )
}