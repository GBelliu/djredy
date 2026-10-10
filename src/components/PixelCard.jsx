import { useEffect, useRef } from 'react'
import { useExperience } from '../hooks/experience'
import './PixelCard.css'

const GAP = 6
const COLORS = ['#f4f4f4', '#bdbdbd', '#7a7a7a', '#3a3a3a']

function buildPixels(width, height) {
  const pixels = []
  const centerX = width / 2
  const centerY = height / 2
  for (let x = 0; x < width; x += GAP) {
    for (let y = 0; y < height; y += GAP) {
      pixels.push({
        x,
        y,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        max: GAP * (0.35 + Math.random() * 0.4),
        size: 0,
        delay: Math.hypot(x - centerX, y - centerY) * 1.6,
        speed: 1.5 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
      })
    }
  }
  return pixels
}

/**
 * Card com efeito de pixels/glitch em Canvas que se espalham do centro no hover.
 * O loop de desenho só roda enquanto há animação.
 */
export default function PixelCard({ children, className = '' }) {
  const cardRef = useRef(null)
  const canvasRef = useRef(null)
  const { lowEnd } = useExperience()

  useEffect(() => {
    if (lowEnd) return
    const card = cardRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    let pixels = []
    let frame = 0
    let hovering = false
    let hoverStart = 0

    const resize = () => {
      const { width, height } = card.getBoundingClientRect()
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      pixels = buildPixels(width, height)
    }

    const draw = (now) => {
      const elapsed = now - hoverStart
      let active = false
      context.clearRect(0, 0, canvas.width, canvas.height)

      for (const pixel of pixels) {
        if (hovering) {
          if (elapsed > pixel.delay) {
            const shimmer = 0.55 + 0.45 * Math.sin(pixel.phase + now * 0.001 * pixel.speed)
            pixel.size += (pixel.max * shimmer - pixel.size) * 0.12
          }
          active = true
        } else if (pixel.size > 0.05) {
          pixel.size *= 0.86
          active = true
        } else {
          pixel.size = 0
        }
        if (pixel.size > 0.05) {
          const offset = (GAP - pixel.size) / 2
          context.fillStyle = pixel.color
          context.fillRect(pixel.x + offset, pixel.y + offset, pixel.size, pixel.size)
        }
      }
      frame = active ? requestAnimationFrame(draw) : 0
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }
    const onEnter = () => {
      hovering = true
      hoverStart = performance.now()
      start()
    }
    const onLeave = () => {
      hovering = false
      start()
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(card)
    card.addEventListener('pointerenter', onEnter)
    card.addEventListener('pointerleave', onLeave)
    card.addEventListener('focusin', onEnter)
    card.addEventListener('focusout', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      card.removeEventListener('pointerenter', onEnter)
      card.removeEventListener('pointerleave', onLeave)
      card.removeEventListener('focusin', onEnter)
      card.removeEventListener('focusout', onLeave)
    }
  }, [lowEnd])

  return (
    <div ref={cardRef} className={`pixel-card ${className}`}>
      {!lowEnd && <canvas ref={canvasRef} className="pixel-card__canvas" aria-hidden="true" />}
      <div className="pixel-card__content">{children}</div>
    </div>
  )
}
