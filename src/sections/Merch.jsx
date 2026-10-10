import { useRef } from 'react'
import PixelCard from '../components/PixelCard'
import Picture from '../components/Picture'
import { gsap, useGSAP } from '../lib/gsap'
import { merch } from '../data/content'
import './Merch.css'

export default function Merch() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.merch__card', {
        y: 120,
        rotate: (index) => (index - 1) * 6,
        opacity: 0,
        stagger: 0.12,
        duration: 1.3,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.merch__grid', start: 'top 80%' },
      })
      gsap.to('.merch__bg-word', {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    },
    { scope: rootRef },
  )

  return (
    <section id="merch" ref={rootRef} className="merch">
      <span className="merch__bg-word t-condensed" aria-hidden="true">
        MERCH MERCH MERCH
      </span>

      <header className="merch__head">
        <span className="section-label t-label">Loja oficial</span>
        <h2 className="merch__title t-display">
          Veste <span className="chrome">o baile</span>
        </h2>
      </header>

      <ul className="merch__grid">
        {merch.map((item) => (
          <li key={item.name} className="merch__card">
            <PixelCard className="merch__pixel">
              <a className="merch__link" href="#contato" data-cursor="ver" aria-label={`${item.name} — ${item.status}`}>
                <Picture name={item.image} alt="" className="merch__image" />
                <span className="merch__badge t-mono">{item.status}</span>
                <span className="merch__info">
                  <span className="merch__name t-display">{item.name}</span>
                  <span className="merch__price t-mono">{item.price}</span>
                </span>
              </a>
            </PixelCard>
          </li>
        ))}
      </ul>
    </section>
  )
}
