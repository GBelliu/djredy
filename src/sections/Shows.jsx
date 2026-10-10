import { useRef, useState } from 'react'
import Picture from '../components/Picture'
import { gsap, useGSAP } from '../lib/gsap'
import { useExperience } from '../hooks/experience'
import { shows } from '../data/content'
import './Shows.css'

const STATUS = {
  tickets: 'Ingressos',
  soldout: 'Esgotado',
  soon: 'Em breve',
}

const dayMonth = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' })
const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'short', timeZone: 'UTC' })

export default function Shows() {
  const rootRef = useRef(null)
  const previewRef = useRef(null)
  const [active, setActive] = useState(-1)
  const { isTouch } = useExperience()

  useGSAP(
    () => {
      gsap.from('.show', {
        yPercent: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.shows__list', start: 'top 80%' },
      })
      gsap.from('.shows__title-char', {
        yPercent: 110,
        stagger: 0.04,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.shows__title', start: 'top 85%' },
      })

      if (isTouch) return
      const preview = previewRef.current
      const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' })
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' })
      const onMove = (event) => {
        xTo(event.clientX)
        yTo(event.clientY)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      return () => window.removeEventListener('pointermove', onMove)
    },
    { scope: rootRef, dependencies: [isTouch] },
  )

  return (
    <section id="agenda" ref={rootRef} className="shows">
      <header className="shows__head">
        <span className="section-label t-label">Agenda / Tour 2026</span>
        <h2 className="shows__title t-condensed" aria-label="Próximos bailes">
          {[...'PRÓXIMOS BAILES'].map((char, index) => (
            <span key={index} className="line-mask shows__title-mask" aria-hidden="true">
              <span className="shows__title-char">{char === ' ' ? ' ' : char}</span>
            </span>
          ))}
        </h2>
      </header>

      <ul className="shows__list" onPointerLeave={() => setActive(-1)}>
        {shows.map((show, index) => {
          const date = new Date(show.date)
          const available = show.status === 'tickets'
          return (
            <li key={show.date + show.venue} className="show" onPointerEnter={() => setActive(index)}>
              <time className="show__date t-condensed" dateTime={show.date}>
                {dayMonth.format(date).replace('/', '.')}
                <small className="t-mono">{weekday.format(date).replace('.', '')}</small>
              </time>
              <span className="show__city t-display">{show.city}</span>
              <span className="show__venue t-mono">{show.venue}</span>
              {available ? (
                <a className="show__cta t-label" href="#contato" data-cursor="ir">
                  {STATUS[show.status]} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className={`show__cta show__cta--${show.status} t-label`}>{STATUS[show.status]}</span>
              )}
            </li>
          )
        })}
      </ul>

      {!isTouch && (
        <div ref={previewRef} className={`shows__preview ${active >= 0 ? 'is-visible' : ''}`} aria-hidden="true">
          {shows.map((show, index) => (
            <Picture
              key={show.image + index}
              name={show.image}
              className={`shows__preview-img ${index === active ? 'is-active' : ''}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
