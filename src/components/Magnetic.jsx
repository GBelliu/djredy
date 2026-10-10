import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { useExperience } from '../hooks/experience'

/** Atrai o elemento filho em direção ao ponteiro (desktop apenas). */
export default function Magnetic({ children, strength = 0.4, className = '' }) {
  const ref = useRef(null)
  const { isTouch, reducedMotion } = useExperience()

  useGSAP(
    () => {
      if (isTouch || reducedMotion) return
      const element = ref.current
      const xTo = gsap.quickTo(element, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
      const yTo = gsap.quickTo(element, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })

      const onMove = (event) => {
        const rect = element.getBoundingClientRect()
        xTo((event.clientX - (rect.left + rect.width / 2)) * strength)
        yTo((event.clientY - (rect.top + rect.height / 2)) * strength)
      }
      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      element.addEventListener('pointermove', onMove)
      element.addEventListener('pointerleave', onLeave)
      return () => {
        element.removeEventListener('pointermove', onMove)
        element.removeEventListener('pointerleave', onLeave)
      }
    },
    { dependencies: [isTouch, reducedMotion, strength] },
  )

  return (
    <span ref={ref} className={`magnetic ${className}`} style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}
