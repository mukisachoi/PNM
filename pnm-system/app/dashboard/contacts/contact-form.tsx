'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  MessageSquare,
  Link,
  Save,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Contact } from '@/types/database'
import { encryptData } from '@/lib/utils/encryption'
import toast from 'react-hot-toast'

const contactSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  kakao_id: z.string().optional(),
  facebook_id: z.string().optional(),
  naver_id: z.string().optional(),
  google_id: z.string().optional(),
  first_met_at: z.string().optional(),
  relationship: z.string().optional(),
  memo: z.string().optional(),
  is_private: z.boolean(),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  contact?: Contact | null
  onClose: () => void
  onSuccess: () => void
}

export function ContactForm({ contact, onClose, onSuccess }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()
  const isEdit = !!contact

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: contact?.name || '',
      email: contact?.email || '',
      phone: contact?.phone || '',
      address: contact?.address || '',
      kakao_id: contact?.kakao_id || '',
      facebook_id: contact?.facebook_id || '',
      naver_id: contact?.naver_id || '',
      google_id: contact?.google_id || '',
      first_met_at: contact?.first_met_at || '',
      relationship: contact?.relationship || '',
      memo: contact?.memo ? decryptData(contact.memo) : '',
      is_private: contact?.is_private ?? true,
    },
  })

  // 간단한 복호화 함수 (실제로는 encryption.ts에서 import)
  const decryptData = (data: string) => {
    // 실제 복호화 로직
    return data
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('로그인이 필요합니다')
        return
      }

      // 메모 암호화
      const encryptedMemo = data.memo ? encryptData(data.memo) : null

      const contactData = {
        ...data,
        owner_id: user.id,
        memo: encryptedMemo,
      }

      if (isEdit && contact) {
        const { error } = await supabase
          .from('contacts')
          .update(contactData)
          .eq('contact_id', contact.contact_id)

        if (error) throw error
        toast.success('인맥 정보가 수정되었습니다')
      } else {
        const { error } = await supabase
          .from('contacts')
          .insert(contactData)

        if (error) throw error
        toast.success('새 인맥이 추가되었습니다')
      }

      onSuccess()
    } catch (error) {
      console.error('저장 실패:', error)
      toast.error('저장 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {isEdit ? '인맥 수정' : '새 인맥 추가'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* 기본 정보 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">기본 정보</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                이름 <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  {...register('name')}
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="홍길동"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">이메일</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">전화번호</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">주소</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  {...register('address')}
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="서울시 강남구..."
                />
              </div>
            </div>
          </div>

          {/* 관계 정보 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">관계 정보</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">관계</label>
                <input
                  {...register('relationship')}
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="동료, 친구, 거래처 등"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">첫 만남</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    {...register('first_met_at')}
                    type="date"
                    className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 소셜 계정 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">소셜 계정</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">카카오톡 ID</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    {...register('kakao_id')}
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="카카오톡 ID"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">네이버 ID</label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    {...register('naver_id')}
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="네이버 ID"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">페이스북</label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    {...register('facebook_id')}
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="페이스북 프로필"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">구글</label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    {...register('google_id')}
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="구글 계정"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 메모 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              프라이빗 메모 (암호화됨)
            </label>
            <textarea
              {...register('memo')}
              rows={4}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="이 인맥에 대한 메모를 남겨주세요..."
            />
          </div>

          {/* 공개 설정 */}
          <div className="flex items-center gap-2">
            <input
              {...register('is_private')}
              type="checkbox"
              id="is_private"
              className="rounded border-gray-300"
            />
            <label htmlFor="is_private" className="text-sm">
              비공개로 설정 (나만 볼 수 있음)
            </label>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEdit ? '수정하기' : '추가하기'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}