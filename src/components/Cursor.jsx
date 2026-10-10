import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useExperience } from '../hooks/experience'
import './Cursor.css'

const INTERACTIVE = 'a, button, [data-cursor]'

/** Cursor customizado: ponto preciso + anel com rastro. */
export default function Cursor() {
  const { isTouch } = useExperience()
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useGSAP(
    () => {
      if (isTouch) return
      const dot = dotRef.current
      const ring = ringRef.current
      const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' })
      const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' })
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' })
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' })

      const onMove = (event) => {
        dotX(event.clientX)
        dotY(event.clientY)
        ringX(event.clientX)
        ringY(event.clientY)
        ring.classList.add('is-visible')
        dot.classList.add('is-visible')
      }
      const onOver = (event) => {
        const target = event.target.closest?.(INTERACTIVE)
        ring.classList.toggle('is-hover', Boolean(target))
        ring.dataset.label = target?.dataset.cursor ?? ''
      }
      const onDown = () => ring.classList.add('is-down')
      const onUp = () => ring.classList.remove('is-down')
      const onLeave = () => {
        ring.classList.remove('is-visible')
        dot.classList.remove('is-visible')
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerover', onOver)
      window.addEventListener('pointerdown', onDown)
      window.addEventListener('pointerup', onUp)
      document.documentElement.addEventListener('pointerleave', onLeave)
      return () => {
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerover', onOver)
        window.removeEventListener('pointerdown', onDown)
        window.removeEventListener('pointerup', onUp)
        document.documentElement.removeEventListener('pointerleave', onLeave)
      }
    },
    { dependencies: [isTouch] },
  )

  if (isTouch) return null

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor__ring" />
      <div ref={dotRef} className="cursor__dot" />
    </div>
  )
}
