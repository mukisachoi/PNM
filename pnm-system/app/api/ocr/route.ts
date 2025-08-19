import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// 이메일 패턴 추출
const extractEmail = (text: string): string | null => {
  const emailPattern = /[\w\.-]+@[\w\.-]+\.\w+/g
  const matches = text.match(emailPattern)
  return matches ? matches[0] : null
}

// 전화번호 패턴 추출
const extractPhone = (text: string): string | null => {
  // 한국 전화번호 패턴
  const phonePatterns = [
    /010[-\s]?\d{4}[-\s]?\d{4}/g,
    /01[1-9][-\s]?\d{3,4}[-\s]?\d{4}/g,
    /0\d{1,2}[-\s]?\d{3,4}[-\s]?\d{4}/g,
    /\+82[-\s]?\d{1,2}[-\s]?\d{3,4}[-\s]?\d{4}/g,
  ]
  
  for (const pattern of phonePatterns) {
    const matches = text.match(pattern)
    if (matches) {
      return matches[0].replace(/[-\s]/g, '-')
    }
  }
  
  return null
}

// 이름 추출 (간단한 휴리스틱)
const extractName = (text: string): string | null => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line)
  
  // 첫 번째 라인이 보통 이름인 경우가 많음
  // 한글 이름 패턴 체크
  const koreanNamePattern = /^[가-힣]{2,4}$/
  const englishNamePattern = /^[A-Za-z\s]{2,30}$/
  
  for (const line of lines.slice(0, 3)) {
    if (koreanNamePattern.test(line) || englishNamePattern.test(line)) {
      return line
    }
  }
  
  return lines[0] || null
}

// 회사명 추출
const extractCompany = (text: string): string | null => {
  const companyKeywords = ['(주)', '주식회사', 'Inc.', 'Corp.', 'Ltd.', 'LLC', '회사']
  const lines = text.split('\n').map(line => line.trim()).filter(line => line)
  
  for (const line of lines) {
    for (const keyword of companyKeywords) {
      if (line.includes(keyword)) {
        return line
      }
    }
  }
  
  return null
}

// 주소 추출
const extractAddress = (text: string): string | null => {
  const addressKeywords = ['시', '구', '동', '로', '길', '번지', '층']
  const lines = text.split('\n').map(line => line.trim()).filter(line => line)
  
  for (const line of lines) {
    let keywordCount = 0
    for (const keyword of addressKeywords) {
      if (line.includes(keyword)) {
        keywordCount++
      }
    }
    if (keywordCount >= 2) {
      return line
    }
  }
  
  return null
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const image = formData.get('image') as File
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // 이미지를 base64로 변환
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    
    // 여기서는 Tesseract.js를 사용하지 않고 클라이언트에서 처리하도록 함
    // 실제 서버 사이드 OCR을 원한다면 node-tesseract-ocr 패키지 사용
    
    // 클라이언트에 base64 이미지 반환
    return NextResponse.json({
      imageData: `data:${image.type};base64,${base64}`,
      message: 'Process this image with Tesseract.js on the client side'
    })
    
  } catch (error) {
    console.error('OCR Error:', error)
    return NextResponse.json(
      { error: 'OCR processing failed' },
      { status: 500 }
    )
  }
}

// OCR 텍스트 파싱 엔드포인트
export async function PUT(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { text } = await request.json()
    
    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      )
    }

    // OCR 텍스트에서 정보 추출
    const extractedData = {
      name: extractName(text),
      email: extractEmail(text),
      phone: extractPhone(text),
      company: extractCompany(text),
      address: extractAddress(text),
      raw_text: text
    }

    return NextResponse.json(extractedData)
    
  } catch (error) {
    console.error('Text parsing error:', error)
    return NextResponse.json(
      { error: 'Text parsing failed' },
      { status: 500 }
    )
  }
}