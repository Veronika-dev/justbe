'use client'

import { useEffect, useRef } from 'react'
import {primary100} from "@/lib/variables";

const CELL_SIZE = 4
const BRUSH_RADIUS = 3

export default function SandSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const gridRef = useRef<number[][]>([])
  const colorsRef = useRef<string[][]>([])
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Установка размера canvas
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      canvas.width = parent ? parent.clientWidth : window.innerWidth
      canvas.height = parent ? parent.clientHeight : window.innerHeight

      const cols = Math.floor(canvas.width / CELL_SIZE)
      const rows = Math.floor(canvas.height / CELL_SIZE)

      // Инициализация сетки
      gridRef.current = Array.from({ length: rows }, () => Array(cols).fill(0))
      colorsRef.current = Array.from({ length: rows }, () => Array(cols).fill(''))
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Перевод координат viewport → canvas
    const toCanvasCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      return { x: clientX - rect.left, y: clientY - rect.top }
    }

    // Генерация случайного цвета песка
    const getRandomSandColor = () => {
      const hue = 30 + Math.random() * 20 // 30-50
      const saturation = 60 + Math.random() * 20 // 60-80%
      const lightness = 50 + Math.random() * 20 // 50-70%
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }

    // Добавление песка в точке
    const addSand = (x: number, y: number) => {
      const grid = gridRef.current
      const colors = colorsRef.current
      const cols = grid[0]?.length || 0
      const rows = grid.length

      const cellX = Math.floor(x / CELL_SIZE)
      const cellY = Math.floor(y / CELL_SIZE)

      for (let dy = -BRUSH_RADIUS; dy <= BRUSH_RADIUS; dy++) {
        for (let dx = -BRUSH_RADIUS; dx <= BRUSH_RADIUS; dx++) {
          if (dx * dx + dy * dy > BRUSH_RADIUS * BRUSH_RADIUS) continue

          const nx = cellX + dx
          const ny = cellY + dy

          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            if (grid[ny][nx] === 0 && Math.random() > 0.3) {
              grid[ny][nx] = 1
              colors[ny][nx] = getRandomSandColor()
            }
          }
        }
      }
    }

    // Обработка мыши
    const handleMouseDown = (e: MouseEvent) => {
      isDrawing.current = true
      const pos = toCanvasCoords(e.clientX, e.clientY)
      mousePos.current = pos
      addSand(pos.x, pos.y)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const pos = toCanvasCoords(e.clientX, e.clientY)
      mousePos.current = pos
      if (isDrawing.current) {
        addSand(pos.x, pos.y)
      }
    }

    const handleMouseUp = () => {
      isDrawing.current = false
    }

    // Обработка тача
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      isDrawing.current = true
      const pos = toCanvasCoords(touch.clientX, touch.clientY)
      mousePos.current = pos
      addSand(pos.x, pos.y)
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      const pos = toCanvasCoords(touch.clientX, touch.clientY)
      mousePos.current = pos
      if (isDrawing.current) {
        addSand(pos.x, pos.y)
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      isDrawing.current = false
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseUp)
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchmove', handleTouchMove)
    canvas.addEventListener('touchend', handleTouchEnd)

    // Симуляция физики
    const updateGrid = () => {
      const grid = gridRef.current
      const colors = colorsRef.current
      const cols = grid[0]?.length || 0
      const rows = grid.length

      // Создаём новую сетку
      const newGrid = grid.map(row => [...row])
      const newColors = colors.map(row => [...row])

      // Случайный порядок колонок
      const colOrder = Array.from({ length: cols }, (_, i) => i)
      for (let i = colOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[colOrder[i], colOrder[j]] = [colOrder[j], colOrder[i]]
      }

      // Обновление снизу вверх
      for (let y = rows - 2; y >= 0; y--) {
        for (const x of colOrder) {
          if (grid[y][x] === 1) {
            // Пробуем упасть вниз
            if (newGrid[y + 1][x] === 0) {
              newGrid[y][x] = 0
              newGrid[y + 1][x] = 1
              newColors[y + 1][x] = colors[y][x]
              newColors[y][x] = ''
            }
            // Пробуем по диагонали влево
            else if (x > 0 && newGrid[y + 1][x - 1] === 0) {
              newGrid[y][x] = 0
              newGrid[y + 1][x - 1] = 1
              newColors[y + 1][x - 1] = colors[y][x]
              newColors[y][x] = ''
            }
            // Пробуем по диагонали вправо
            else if (x < cols - 1 && newGrid[y + 1][x + 1] === 0) {
              newGrid[y][x] = 0
              newGrid[y + 1][x + 1] = 1
              newColors[y + 1][x + 1] = colors[y][x]
              newColors[y][x] = ''
            }
          }
        }
      }

      gridRef.current = newGrid
      colorsRef.current = newColors
    }

    // Рендер
    const render = () => {
      const grid = gridRef.current
      const colors = colorsRef.current
      const cols = grid[0]?.length || 0
      const rows = grid.length

      ctx.fillStyle = primary100
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (grid[y][x] === 1) {
            ctx.fillStyle = colors[y][x]
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
          }
        }
      }
    }

    // Главный цикл
    const animate = () => {
      if (isDrawing.current) {
        addSand(mousePos.current.x, mousePos.current.y)
      }
      updateGrid()
      render()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="block bg-primary-100"
      style={{ touchAction: 'none' }}
    />
  )
}
