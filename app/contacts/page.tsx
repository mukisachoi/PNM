'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  UserPlus, 
  Search, 
  Filter, 
  Grid, 
  List,
  Download,
  Upload,
  Users,
  Mail,
  Phone,
  Building,
  Calendar,
  MapPin,
  MoreVertical
} from 'lucide-react';

export default function ContactsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // 임시 연락처 데이터
  const contacts = [
    {
      id: 1,
      name: '홍길동',
      email: 'hong@example.com',
      phone: '010-1234-5678',
      company: 'ABC 회사',
      position: '대표이사',
      group: '비즈니스',
      lastContact: '2024-01-15',
    },
    {
      id: 2,
      name: '김철수',
      email: 'kim@example.com',
      phone: '010-2345-6789',
      company: 'XYZ 기업',
      position: '부장',
      group: '동료',
      lastContact: '2024-01-10',
    },
    {
      id: 3,
      name: '이영희',
      email: 'lee@example.com',
      phone: '010-3456-7890',
      company: '스타트업',
      position: 'CTO',
      group: '친구',
      lastContact: '2024-01-05',
    },
  ];

  const stats = [
    { label: '전체 연락처', value: contacts.length, icon: Users, color: 'text-blue-500' },
    { label: '이번 달 추가', value: 2, icon: UserPlus, color: 'text-green-500' },
    { label: '그룹', value: 3, icon: Grid, color: 'text-purple-500' },
    { label: '최근 연락', value: 5, icon: Calendar, color: 'text-orange-500' },
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
                인맥 관리
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                총 {contacts.length}명의 연락처
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
            </Button>
            <Button variant="outline">
              <Upload className="h-5 w-5 mr-2" />
              가져오기
            </Button>
            <Button variant="outline">
              <Download className="h-5 w-5 mr-2" />
              내보내기
            </Button>
            <Button onClick={() => router.push('/contacts/new')}>
              <UserPlus className="h-5 w-5 mr-2" />
              새 연락처
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

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="이름, 회사, 이메일로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-5 w-5 mr-2" />
            필터
          </Button>
        </div>

        {/* Contacts Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <Card
                key={contact.id}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-0 dark:bg-gray-800/50 backdrop-blur"
                onClick={() => router.push(`/contacts/${contact.id}`)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {contact.name[0]}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{contact.name}</CardTitle>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {contact.position}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Building className="h-4 w-4" />
                      {contact.company}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Mail className="h-4 w-4" />
                      {contact.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Phone className="h-4 w-4" />
                      {contact.phone}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded">
                        {contact.group}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        최근 연락: {contact.lastContact}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b dark:border-gray-700">
                    <tr>
                      <th className="text-left p-4">이름</th>
                      <th className="text-left p-4">회사</th>
                      <th className="text-left p-4">이메일</th>
                      <th className="text-left p-4">전화번호</th>
                      <th className="text-left p-4">그룹</th>
                      <th className="text-left p-4">최근 연락</th>
                      <th className="text-left p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr
                        key={contact.id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                        onClick={() => router.push(`/contacts/${contact.id}`)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {contact.name[0]}
                            </div>
                            <div>
                              <p className="font-semibold">{contact.name}</p>
                              <p className="text-sm text-gray-500">{contact.position}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">{contact.company}</td>
                        <td className="p-4">{contact.email}</td>
                        <td className="p-4">{contact.phone}</td>
                        <td className="p-4">
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded">
                            {contact.group}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">{contact.lastContact}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {contacts.length === 0 && (
          <Card className="border-0 dark:bg-gray-800/50 backdrop-blur">
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">연락처가 없습니다</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                첫 번째 연락처를 추가해보세요
              </p>
              <Button onClick={() => router.push('/contacts/new')}>
                <UserPlus className="h-5 w-5 mr-2" />
                새 연락처 추가
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
