import { useRef } from 'react'
import Picture from '../components/Picture'
import Logo from '../components/Logo'
import { gsap, useGSAP } from '../lib/gsap'
import { useExperience } from '../hooks/experience'
import { hero } from '../data/content'
import './Hero.css'

export default function Hero() {
  const rootRef = useRef(null)
  const { ready, isTouch, lowEnd, scrollTo } = useExperience()

  // Intro após o preloader
  useGSAP(
    () => {
      if (!ready) return
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero__grid', { opacity: 0, scale: 1.15, duration: 2 }, 0)
        .from('.hero__back-char', { yPercent: 115, duration: 1.4, stagger: 0.06 }, 0.15)
        .from('.hero__artist img', { yPercent: 18, opacity: 0, scale: 1.08, duration: 1.8 }, 0.35)
        .from('.hero__front-logo', { scale: 0.4, rotate: -12, opacity: 0, filter: 'blur(12px)', duration: 1.4 }, 0.8)
        .from('.hero__meta > *', { y: 20, opacity: 0, duration: 1, stagger: 0.08 }, 1.1)
    },
    { scope: rootRef, dependencies: [ready] },
  )

  // Parallax no scroll
  useGSAP(
    () => {
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        .to('.hero__back', { yPercent: -35, scale: 0.92 }, 0)
        .to('.hero__artist', { yPercent: 12, scale: 1.06 }, 0)
        .to('.hero__front', { yPercent: 60, scale: 1.25 }, 0)
        .to('.hero__shade', { opacity: 1 }, 0)
    },
    { scope: rootRef },
  )

  // Parallax pelo mouse em camadas (somente desktop potente)
  useGSAP(
    () => {
      if (isTouch || lowEnd) return
      const layers = gsap.utils.toArray('[data-depth]').map((element) => ({
        depth: Number(element.dataset.depth),
        x: gsap.quickTo(element, 'x', { duration: 1.2, ease: 'power3' }),
        y: gsap.quickTo(element, 'y', { duration: 1.2, ease: 'power3' }),
      }))
      const onMove = (event) => {
        const nx = event.clientX / window.innerWidth - 0.5
        const ny = event.clientY / window.innerHeight - 0.5
        layers.forEach((layer) => {
          layer.x(nx * layer.depth)
          layer.y(ny * layer.depth)
        })
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      return () => window.removeEventListener('pointermove', onMove)
    },
    { scope: rootRef, dependencies: [isTouch, lowEnd] },
  )

  return (
    <section id="inicio" ref={rootRef} className="hero">
      <h1 className="sr-only">DJ Redy — {hero.tagline}</h1>
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__layer hero__layer--back" data-depth="-24" aria-hidden="true">
        <div className="hero__back t-condensed">
          {[...hero.back].map((char, index) => (
            <span key={index} className="hero__back-mask">
              <span className="hero__back-char">{char === ' ' ? ' ' : char}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="hero__layer" data-depth="14">
        <Picture
          name="cutout-8"
          alt="DJ Redy com camisa preta e mãos no boné"
          className="hero__artist"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="hero__layer" data-depth="38" aria-hidden="true">
        <div className="hero__front">
          <Logo variant="branco-com-relevo" className="hero__front-logo" loading="eager" />
        </div>
      </div>

      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__meta">
        <span className="t-mono">{hero.tagline}</span>
        <button type="button" className="hero__scroll t-mono" onClick={() => scrollTo('#sobre')}>
          Role <span aria-hidden="true">↓</span>
        </button>
      </div>
    </section>
  )
}
