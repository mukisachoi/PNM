import CryptoJS from 'crypto-js'

// 환경 변수에서 암호화 키를 가져오거나 기본값 사용
const getEncryptionKey = () => {
  const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY
  if (!key) {
    console.warn('암호화 키가 설정되지 않았습니다. 기본 키를 사용합니다.')
    return 'PNM-DEFAULT-ENCRYPTION-KEY-2024'
  }
  return key
}

/**
 * 텍스트를 AES로 암호화
 * @param text 암호화할 텍스트
 * @param userKey 사용자별 추가 키 (선택)
 * @returns 암호화된 문자열
 */
export function encryptData(text: string, userKey?: string): string {
  try {
    if (!text) return ''
    
    const secretKey = getEncryptionKey() + (userKey || '')
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString()
    
    // Base64로 추가 인코딩하여 DB 저장 시 문제 방지
    return btoa(encrypted)
  } catch (error) {
    console.error('암호화 실패:', error)
    throw new Error('데이터 암호화에 실패했습니다.')
  }
}

/**
 * AES로 암호화된 텍스트를 복호화
 * @param encryptedText 암호화된 텍스트
 * @param userKey 사용자별 추가 키 (선택)
 * @returns 복호화된 문자열
 */
export function decryptData(encryptedText: string, userKey?: string): string {
  try {
    if (!encryptedText) return ''
    
    const secretKey = getEncryptionKey() + (userKey || '')
    
    // Base64 디코딩
    const decoded = atob(encryptedText)
    
    const bytes = CryptoJS.AES.decrypt(decoded, secretKey)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    
    if (!decrypted) {
      throw new Error('복호화 실패')
    }
    
    return decrypted
  } catch (error) {
    console.error('복호화 실패:', error)
    return '' // 복호화 실패 시 빈 문자열 반환
  }
}

/**
 * 해시 생성 (비밀번호 등)
 * @param text 해시할 텍스트
 * @returns SHA256 해시 문자열
 */
export function hashData(text: string): string {
  return CryptoJS.SHA256(text).toString()
}

/**
 * 랜덤 키 생성
 * @param length 키 길이
 * @returns 랜덤 키 문자열
 */
export function generateRandomKey(length: number = 32): string {
  const array = new Uint8Array(length)
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array)
  } else {
    // 서버사이드 또는 crypto API 미지원 환경
    for (let i = 0; i < length; i++) {
      array[i] = Math.floor(Math.random() * 256)
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * 민감한 데이터 마스킹
 * @param text 마스킹할 텍스트
 * @param showLength 보여줄 문자 수
 * @returns 마스킹된 문자열
 */
export function maskSensitiveData(text: string, showLength: number = 3): string {
  if (!text || text.length <= showLength) return text
  
  const visiblePart = text.slice(0, showLength)
  const maskedPart = '*'.repeat(Math.min(text.length - showLength, 10))
  
  return visiblePart + maskedPart
}

/**
 * 이메일 마스킹
 * @param email 이메일 주소
 * @returns 마스킹된 이메일
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email
  
  const [localPart, domain] = email.split('@')
  const maskedLocal = maskSensitiveData(localPart, 2)
  
  return `${maskedLocal}@${domain}`
}

/**
 * 전화번호 마스킹
 * @param phone 전화번호
 * @returns 마스킹된 전화번호
 */
export function maskPhone(phone: string): string {
  if (!phone) return phone
  
  // 숫자만 추출
  const numbers = phone.replace(/\D/g, '')
  
  if (numbers.length < 7) return phone
  
  // 뒤 4자리를 제외하고 마스킹
  const visiblePart = numbers.slice(0, -4)
  const maskedPart = '****'
  
  return visiblePart + maskedPart
}

/**
 * 데이터 무결성 검증을 위한 체크섬 생성
 * @param data 검증할 데이터
 * @returns MD5 체크섬
 */
export function generateChecksum(data: string): string {
  return CryptoJS.MD5(data).toString()
}

/**
 * 데이터 무결성 검증
 * @param data 원본 데이터
 * @param checksum 체크섬
 * @returns 검증 결과
 */
export function verifyChecksum(data: string, checksum: string): boolean {
  return generateChecksum(data) === checksum
}