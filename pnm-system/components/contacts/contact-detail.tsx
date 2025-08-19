'use client'

import { 
  X, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  MessageSquare,
  Link,
  Edit,
  Share2,
  User,
  Globe,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Contact } from '@/types/database'
import { formatDate, formatPhoneNumber } from '@/lib/utils'
import { decryptData } from '@/lib/utils/encryption'

interface ContactDetailProps {
  contact: Contact
  onClose: () => void
  onEdit: () => void
}

export function ContactDetail({ contact, onClose, onEdit }: ContactDetailProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: contact.name,
        text: `${contact.name}의 연락처`,
        url: window.location.href,
      })
    } else {
      // 클립보드에 복사
      const text = `${contact.name}\n${contact.email || ''}\n${contact.phone || ''}`
      navigator.clipboard.writeText(text)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {contact.profile_img ? (
                <img 
                  src={contact.profile_img} 
                  alt={contact.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-primary">
                    {contact.name[0]}
                  </span>
                </div>
              )}
              <div>
                <h2 className="text-2xl font-semibold">{contact.name}</h2>
                {contact.relationship && (
                  <p className="text-muted-foreground">{contact.relationship}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  {contact.is_private ? (
                    <span className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                      <Lock className="h-3 w-3" />
                      비공개
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      <Globe className="h-3 w-3" />
                      공개
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 내용 */}
        <div className="p-6 space-y-6">
          {/* 연락처 정보 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">연락처 정보</h3>
            
            {contact.email && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">이메일</p>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-sm hover:text-primary hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            )}

            {contact.phone && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">전화번호</p>
                  <a 
                    href={`tel:${contact.phone}`}
                    className="text-sm hover:text-primary hover:underline"
                  >
                    {formatPhoneNumber(contact.phone)}
                  </a>
                </div>
              </div>
            )}

            {contact.address && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">주소</p>
                  <p className="text-sm">{contact.address}</p>
                </div>
              </div>
            )}
          </div>

          {/* 소셜 계정 */}
          {(contact.kakao_id || contact.naver_id || contact.facebook_id || contact.google_id) && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">소셜 계정</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {contact.kakao_id && (
                  <div className="flex items-center gap-3 p-3 bg-[#FEE500]/10 rounded-lg">
                    <MessageSquare className="h-4 w-4" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">카카오톡</p>
                      <p className="text-sm font-medium">{contact.kakao_id}</p>
                    </div>
                  </div>
                )}

                {contact.naver_id && (
                  <div className="flex items-center gap-3 p-3 bg-[#03C75A]/10 rounded-lg">
                    <div className="w-4 h-4 bg-[#03C75A] text-white rounded flex items-center justify-center text-xs font-bold">
                      N
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">네이버</p>
                      <p className="text-sm font-medium">{contact.naver_id}</p>
                    </div>
                  </div>
                )}

                {contact.facebook_id && (
                  <div className="flex items-center gap-3 p-3 bg-[#1877F2]/10 rounded-lg">
                    <div className="w-4 h-4 bg-[#1877F2] text-white rounded flex items-center justify-center text-xs font-bold">
                      f
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">페이스북</p>
                      <p className="text-sm font-medium">{contact.facebook_id}</p>
                    </div>
                  </div>
                )}

                {contact.google_id && (
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                    <div className="w-4 h-4 bg-primary text-primary-foreground rounded flex items-center justify-center text-xs font-bold">
                      G
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">구글</p>
                      <p className="text-sm font-medium">{contact.google_id}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 추가 정보 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">추가 정보</h3>
            
            {contact.first_met_at && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">첫 만남</p>
                  <p className="text-sm">{formatDate(contact.first_met_at, 'long')}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">등록일</p>
                <p className="text-sm">{formatDate(contact.created_at, 'long')}</p>
              </div>
            </div>
          </div>

          {/* 메모 */}
          {contact.memo && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">프라이빗 메모</h3>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">
                  {decryptData(contact.memo)}
                </p>
              </div>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              정보 수정
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              공유하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}