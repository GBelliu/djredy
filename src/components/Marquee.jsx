import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import './Marquee.css'

/** Faixa infinita cuja velocidade e direção reagem ao scroll. */
export default function Marquee({ items, reverse = false, duration = 22, className = '' }) {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const track = rootRef.current.querySelector('.marquee__track')
      const loop = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration, ease: 'none', repeat: -1 },
      )
      // avança o loop para permitir timeScale negativo (scroll para cima) sem travar no início
      loop.totalTime(duration * 1000)

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 5)
          gsap.to(loop, { timeScale: self.direction * boost, duration: 0.2, overwrite: true })
          gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.2 })
        },
        onToggle: ({ isActive }) => (isActive ? loop.play() : loop.pause()),
      })
    },
    { scope: rootRef },
  )

  const sequence = items.map((item) => (
    <span key={item} className="marquee__item">
      {item}
      <span className="marquee__star" aria-hidden="true">
        ✦
      </span>
    </span>
  ))

  return (
    <div ref={rootRef} className={`marquee ${className}`} aria-label={items.join(', ')}>
      <div className="marquee__track" aria-hidden="true">
        <div className="marquee__group">{sequence}</div>
        <div className="marquee__group">{sequence}</div>
      </div>
    </div>
  )
}
