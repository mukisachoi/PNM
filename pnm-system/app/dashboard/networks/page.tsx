'use client'

import { useEffect, useState, useRef } from 'react'
import { 
  Network,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  RefreshCw,
  Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

// D3.js를 동적으로 import
import dynamic from 'next/dynamic'

export default function NetworkPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [relationships, setRelationships] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const svgRef = useRef<SVGSVGElement>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchNetworkData()
  }, [])

  useEffect(() => {
    if (contacts.length > 0 && !loading) {
      drawNetwork()
    }
  }, [contacts, relationships, loading])

  const fetchNetworkData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 인맥 데이터
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select('*')
        .eq('owner_id', user.id)

      if (contactsError) throw contactsError

      // 관계 데이터
      const { data: relationshipsData, error: relError } = await supabase
        .from('relationships')
        .select('*')

      if (relError) throw relError

      setContacts(contactsData || [])
      setRelationships(relationshipsData || [])
    } catch (error) {
      console.error('네트워크 데이터 로딩 실패:', error)
      toast.error('네트워크 데이터를 불러오는데 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  const drawNetwork = async () => {
    if (!svgRef.current) return

    // D3.js 동적 import
    const d3 = await import('d3')
    
    const svg = d3.select(svgRef.current)
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // 기존 내용 제거
    svg.selectAll('*').remove()

    // 노드와 링크 데이터 준비
    const nodes = contacts.map(contact => ({
      id: contact.contact_id,
      name: contact.name,
      group: contact.relationship || 'default'
    }))

    const links = relationships.map(rel => ({
      source: rel.source_id,
      target: rel.target_id,
      value: rel.strength || 1
    }))

    // 색상 스케일
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // 시뮬레이션 생성
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))

    // 줌 기능
    const g = svg.append('g')
    
    const zoom = d3.zoom()
      .scaleExtent([0.1, 10])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
        setZoomLevel(event.transform.k)
      })

    svg.call(zoom as any)

    // 링크 그리기
    const link = g.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke-width', (d: any) => Math.sqrt(d.value))

    // 노드 그리기
    const node = g.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', 8)
      .attr('fill', (d: any) => color(d.group))
      .call(drag(simulation) as any)

    // 라벨 추가
    const label = g.append('g')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
      .text((d: any) => d.name)
      .attr('font-size', 12)
      .attr('dx', 12)
      .attr('dy', 4)

    // 툴팁
    node.append('title')
      .text((d: any) => d.name)

    // 시뮬레이션 업데이트
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)

      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y)
    })

    // 드래그 기능
    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event: any) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    }
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.2, 10))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev * 0.8, 0.1))
  }

  const handleReset = () => {
    setZoomLevel(1)
    drawNetwork()
  }

  const handleExport = () => {
    if (!svgRef.current) return
    
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = 'network.svg'
    a.click()
    
    URL.revokeObjectURL(url)
  }

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
          <h1 className="text-3xl font-bold">네트워크 관계도</h1>
          <p className="text-muted-foreground mt-1">
            {contacts.length}명의 인맥, {relationships.length}개의 관계
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            내보내기
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            설정
          </Button>
        </div>
      </div>

      {/* 네트워크 시각화 영역 */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* 툴바 */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleReset}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground ml-2">
              확대: {Math.round(zoomLevel * 100)}%
            </span>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            필터
          </Button>
        </div>

        {/* SVG 영역 */}
        <div className="relative" style={{ height: '600px' }}>
          {contacts.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Network className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">관계도를 표시할 데이터가 없습니다</h3>
                <p className="text-muted-foreground">
                  인맥과 관계를 추가하면 여기에 표시됩니다
                </p>
              </div>
            </div>
          ) : (
            <svg
              ref={svgRef}
              className="w-full h-full"
              style={{ cursor: 'move' }}
            />
          )}
        </div>
      </div>

      {/* 범례 */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-sm font-medium mb-3">범례</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-sm">친구</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm">동료</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="text-sm">거래처</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span className="text-sm">가족</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
            <span className="text-sm">기타</span>
          </div>
        </div>
      </div>
    </div>
  )
}