'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Search, 
  UserPlus, 
  Filter,
  MoreVertical,
  Phone,
  Mail,
  Building,
  Tag,
  Calendar,
  Star,
  Grid,
  List
} from 'lucide-react';

export default function ContactsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // 임시 더미 데이터
  const contacts = [
    {
      id: 1,
      name: '김철수',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      company: '삼성전자',
      position: '과장',
      tags: ['비즈니스', '파트너'],
      importance: 'high',
      lastContact: '2024-01-15',
    },
    {
      id: 2,
      name: '이영희',
      email: 'lee@example.com',
      phone: '010-9876-5432',
      company: 'LG전자',
      position: '부장',
      tags: ['고객', 'VIP'],
      importance: 'high',
      lastContact: '2024-01-10',
    },
    {
      id: 3,
      name: '박민수',
      email: 'park@example.com',
      phone: '010-5555-5555',
      company: '네이버',
      position: '팀장',
      tags: ['동료', '프로젝트'],
      importance: 'medium',
      lastContact: '2024-01-08',
    },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

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
                연락처 관리
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                총 {filteredContacts.length}명의 연락처
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
            </Button>
            <Button
              onClick={() => router.push('/contacts/new')}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-5 w-5" />
              새 연락처
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="이름, 회사, 이메일로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            필터
          </Button>
        </div>

        {/* Contacts Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer dark:bg-gray-800/50 backdrop-blur border-0"
                onClick={() => router.push(`/contacts/${contact.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {contact.name[0]}
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {contact.name}
                          <Star className={`h-4 w-4 ${getImportanceColor(contact.importance)}`} />
                        </CardTitle>
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
                <CardContent className="space-y-2">
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
                  <div className="flex items-center gap-2 pt-2">
                    {contact.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pt-2">
                    <Calendar className="h-3 w-3" />
                    마지막 연락: {contact.lastContact}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer dark:bg-gray-800/50 backdrop-blur border-0"
                onClick={() => router.push(`/contacts/${contact.id}`)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {contact.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {contact.name}
                        </h3>
                        <Star className={`h-4 w-4 ${getImportanceColor(contact.importance)}`} />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {contact.position} · {contact.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {contact.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
              연락처가 없습니다
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              새로운 연락처를 추가하여 인맥 관리를 시작하세요
            </p>
            <Button onClick={() => router.push('/contacts/new')}>
              <UserPlus className="h-5 w-5 mr-2" />
              첫 연락처 추가하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
