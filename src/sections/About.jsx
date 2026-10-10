import { useRef } from 'react'
import Picture from '../components/Picture'
import { gsap, useGSAP } from '../lib/gsap'
import { about } from '../data/content'
import './About.css'

export default function About() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const root = rootRef.current

      gsap.fromTo(
        '.about__title',
        { letterSpacing: '0.35em', opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          letterSpacing: '-0.01em',
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 85%', end: 'top 25%', scrub: true },
        },
      )

      gsap.fromTo(
        '.about__word',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.about__quote', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      )

      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '.about__figure', start: 'top 85%', end: 'bottom 70%', scrub: true },
        })
        .fromTo('.about__photo', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)' })
        .fromTo('.about__scan', { top: '100%' }, { top: '0%' }, 0)
        .to('.about__scan', { opacity: 0, duration: 0.1 })

      gsap.utils.toArray('.about__stat-value').forEach((element) => {
        const target = Number(element.dataset.value)
        const counter = { value: 0 }
        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          onUpdate: () => {
            element.textContent = Math.round(counter.value)
          },
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <section id="sobre" ref={rootRef} className="about">
      <div className="about__inner">
        <h2 className="about__title t-display chrome-outline">{about.title}</h2>

        <p className="about__quote">
          {about.quote.split(' ').map((word, index) => (
            <span key={index} className="about__word">
              {word}{' '}
            </span>
          ))}
        </p>

        <ul className="about__stats">
          {about.stats.map((stat) => (
            <li key={stat.label} className="about__stat">
              <span className="about__stat-number t-condensed">
                <span className="about__stat-value" data-value={stat.value}>
                  {stat.value}
                </span>
                {stat.suffix}
              </span>
              <span className="t-mono">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="about__figure">
        <Picture name="cutout-7" className="about__silhouette" />
        <Picture name="cutout-7" alt="DJ Redy de capuz" className="about__photo" />
        <span className="about__scan" aria-hidden="true" />
      </div>
    </section>
  )
}
