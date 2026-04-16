'use client'

import { useEffect, useRef } from 'react'
import { primary100 } from "@/lib/variables"

const LINE_WIDTH = 12
const FADE_SPEED = 0.008 // уменьшение alpha за кадр

interface Segment {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  alpha: number
}

export default function LinesSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const lastPos = useRef<{ x: number; y: number } | null>(null)
  const segments = useRef<Segment[]>([])
  const animationFrameRef = useRef<number>(0)
  const hue = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      canvas.width = parent ? parent.clientWidth : window.innerWidth
      canvas.height = parent ? parent.clientHeight : window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const toCanvasCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      return { x: clientX - rect.left, y: clientY - rect.top }
    }

    const addSegment = (x1: number, y1: number, x2: number, y2: number) => {
      hue.current = (hue.current + 0.5) % 360
      segments.current.push({
        x1, y1, x2, y2,
        color: `hsl(${hue.current}, 70%, 65%)`,
        alpha: 1,
      })
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing.current = true
      lastPos.current = toCanvasCoords(e.clientX, e.clientY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing.current || !lastPos.current) return
      const pos = toCanvasCoords(e.clientX, e.clientY)
      addSegment(lastPos.current.x, lastPos.current.y, pos.x, pos.y)
      lastPos.current = pos
    }

    const handleMouseUp = () => {
      isDrawing.current = false
      lastPos.current = null
    }

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      isDrawing.current = true
      lastPos.current = toCanvasCoords(e.touches[0].clientX, e.touches[0].clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (!isDrawing.current || !lastPos.current) return
      const pos = toCanvasCoords(e.touches[0].clientX, e.touches[0].clientY)
      addSegment(lastPos.current.x, lastPos.current.y, pos.x, pos.y)
      lastPos.current = pos
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      isDrawing.current = false
      lastPos.current = null
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseUp)
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd)

    const animate = () => {
      // Уменьшаем alpha и удаляем полностью угасшие сегменты
      for (const seg of segments.current) {
        seg.alpha -= FADE_SPEED
      }
      segments.current = segments.current.filter(seg => seg.alpha > 0)

      // Полная очистка холста — никакого остатка
      ctx.fillStyle = primary100
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (const seg of segments.current) {
        ctx.beginPath()
        ctx.globalAlpha = seg.alpha
        ctx.strokeStyle = seg.color
        ctx.lineWidth = LINE_WIDTH
        ctx.lineCap = 'round'
        ctx.moveTo(seg.x1, seg.y1)
        ctx.lineTo(seg.x2, seg.y2)
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    ctx.fillStyle = primary100
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseUp)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="block"
      style={{ touchAction: 'none' }}
    />
  )
}
