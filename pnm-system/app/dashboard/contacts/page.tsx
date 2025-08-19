'use client'

import { useEffect, useState } from 'react'
import { 
  Search, 
  Plus, 
  Filter,
  Download,
  Upload,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  FileSpreadsheet,
  Camera
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { formatDate, formatPhoneNumber } from '@/lib/utils'
import { Contact } from '@/types/database'
import toast from 'react-hot-toast'
import { ContactForm } from '@/components/contacts/contact-form'
import { ContactDetail } from '@/components/contacts/contact-detail'

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const supabase = createClient()

  useEffect(() => {
    fetchContacts()
  }, [])

  useEffect(() => {
    // 검색 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = contacts.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.email?.toLowerCase().includes(query) ||
        contact.phone?.includes(query) ||
        contact.relationship?.toLowerCase().includes(query)
      )
      setFilteredContacts(filtered)
    } else {
      setFilteredContacts(contacts)
    }
  }, [searchQuery, contacts])

  const fetchContacts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setContacts(data || [])
      setFilteredContacts(data || [])
    } catch (error) {
      console.error('인맥 목록 로딩 실패:', error)
      toast.error('인맥 목록을 불러오는데 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (contactId: number) => {
    if (!confirm('정말 이 인맥을 삭제하시겠습니까?')) return

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('contact_id', contactId)

      if (error) throw error

      toast.success('인맥이 삭제되었습니다')
      fetchContacts()
    } catch (error) {
      toast.error('삭제 중 오류가 발생했습니다')
    }
  }

  const ContactCard = ({ contact }: { contact: Contact }) => (
    <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {contact.profile_img ? (
            <img 
              src={contact.profile_img} 
              alt={contact.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {contact.name[0]}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-semibold">{contact.name}</h3>
            {contact.relationship && (
              <span className="text-xs text-muted-foreground">
                {contact.relationship}
              </span>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2 text-sm">
        {contact.email && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="truncate">{contact.email}</span>
          </div>
        )}
        {contact.phone && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{formatPhoneNumber(contact.phone)}</span>
          </div>
        )}
        {contact.address && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{contact.address}</span>
          </div>
        )}
        {contact.first_met_at && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>첫 만남: {formatDate(contact.first_met_at, 'short')}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1"
          onClick={() => {
            setSelectedContact(contact)
            setShowDetail(true)
          }}
        >
          <Eye className="h-3 w-3 mr-1" />
          상세
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1"
          onClick={() => {
            setSelectedContact(contact)
            setShowAddForm(true)
          }}
        >
          <Edit className="h-3 w-3 mr-1" />
          수정
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1"
          onClick={() => handleDelete(contact.contact_id)}
        >
          <Trash2 className="h-3 w-3 mr-1" />
          삭제
        </Button>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">인맥 관리</h1>
          <p className="text-muted-foreground mt-1">
            총 {filteredContacts.length}명의 인맥
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            내보내기
          </Button>
          <Button
            onClick={() => {
              setSelectedContact(null)
              setShowAddForm(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            인맥 추가
          </Button>
        </div>
      </div>

      {/* 검색 및 필터 바 */}
      <div className="bg-card p-4 rounded-lg border border-border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="이름, 이메일, 전화번호로 검색..."
              className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              명함 스캔
            </Button>
            <Button variant="outline">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              엑셀 업로드
            </Button>
            <Button variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              일괄 등록
            </Button>
          </div>
        </div>
      </div>

      {/* 인맥 목록 */}
      {filteredContacts.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">인맥이 없습니다</h3>
          <p className="text-muted-foreground mb-4">
            새로운 인맥을 추가하여 관리를 시작하세요
          </p>
          <Button
            onClick={() => {
              setSelectedContact(null)
              setShowAddForm(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            첫 인맥 추가하기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredContacts.map((contact) => (
            <ContactCard key={contact.contact_id} contact={contact} />
          ))}
        </div>
      )}

      {/* 인맥 추가/수정 모달 */}
      {showAddForm && (
        <ContactForm
          contact={selectedContact}
          onClose={() => {
            setShowAddForm(false)
            setSelectedContact(null)
          }}
          onSuccess={() => {
            setShowAddForm(false)
            setSelectedContact(null)
            fetchContacts()
          }}
        />
      )}

      {/* 인맥 상세 모달 */}
      {showDetail && selectedContact && (
        <ContactDetail
          contact={selectedContact}
          onClose={() => {
            setShowDetail(false)
            setSelectedContact(null)
          }}
          onEdit={() => {
            setShowDetail(false)
            setShowAddForm(true)
          }}
        />
      )}
    </div>
  )
}

// Users 아이콘이 없어서 임시로 추가
const Users = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)