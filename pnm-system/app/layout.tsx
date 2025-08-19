'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Users, 
  Calendar, 
  Network, 
  Settings, 
  Menu, 
  X, 
  Home,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  UserCircle,
  Search,
  Bell,
  Plus
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

const menuItems = [
  { 
    href: '/dashboard', 
    label: '대시보드', 
    icon: Home,
    exact: true 
  },
  { 
    href: '/dashboard/contacts', 
    label: '인맥관리', 
    icon: Users 
  },
  { 
    href: '/dashboard/events', 
    label: '행사관리', 
    icon: Calendar 
  },
  { 
    href: '/dashboard/network', 
    label: '관계도', 
    icon: Network 
  },
  { 
    href: '/dashboard/settings', 
    label: '설정', 
    icon: Settings 
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('로그아웃 실패')
    } else {
      toast.success('로그아웃 되었습니다')
      router.push('/login')
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* 모바일 헤더 */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-40">
        <div className="flex items-center justify-between h-full px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">PNM</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* 데스크톱 사이드바 */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-30",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* 로고 영역 */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!sidebarCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">P</span>
              </div>
              <span className="text-xl font-bold">PNM</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={cn(sidebarCollapsed && "mx-auto")}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", sidebarCollapsed && "rotate-180")} />
          </Button>
        </div>

        {/* 검색바 */}
        {!sidebarCollapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="검색..."
                className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}

        {/* 메뉴 */}
        <nav className="flex-1 px-2 py-4">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href)
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mb-1",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground",
                  sidebarCollapsed && "justify-center"
                )}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* 빠른 추가 버튼 */}
        <div className="p-4 border-t border-border">
          <Button 
            className={cn("w-full", sidebarCollapsed && "px-0")}
            size={sidebarCollapsed ? "icon" : "default"}
          >
            <Plus className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">빠른 추가</span>}
          </Button>
        </div>

        {/* 사용자 정보 */}
        <div className="p-4 border-t border-border">
          <div className={cn(
            "flex items-center gap-3",
            sidebarCollapsed && "justify-center"
          )}>
            <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
              <UserCircle className="h-5 w-5" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.email?.split('@')[0] || '사용자'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="로그아웃"
              className={cn(sidebarCollapsed && "absolute bottom-20 left-1/2 -translate-x-1/2")}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 테마 토글 */}
        <div className="px-4 pb-4">
          <Button
            variant="outline"
            size={sidebarCollapsed ? "icon" : "default"}
            onClick={toggleTheme}
            className={cn("w-full", sidebarCollapsed && "px-0")}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4" />
                {!sidebarCollapsed && <span className="ml-2">라이트 모드</span>}
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                {!sidebarCollapsed && <span className="ml-2">다크 모드</span>}
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* 모바일 사이드바 */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      >
        <aside
          className={cn(
            "fixed left-0 top-0 h-full w-72 bg-card border-r border-border transition-transform",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 모바일 사이드바 헤더 */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">P</span>
              </div>
              <span className="text-xl font-bold">PNM</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* 모바일 메뉴 */}
          <nav className="px-2 py-4">
            {menuItems.map((item) => {
              const isActive = item.exact 
                ? pathname === item.href 
                : pathname.startsWith(item.href)
              const Icon = item.icon
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mb-1",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* 모바일 사용자 정보 */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <UserCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {user?.email?.split('@')[0] || '사용자'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </aside>
      </div>

      {/* 메인 콘텐츠 */}
      <main
        className={cn(
          "transition-all duration-300",
          "pt-16 lg:pt-0",
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}