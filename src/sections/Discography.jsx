import { useRef } from 'react'
import Picture from '../components/Picture'
import { gsap, useGSAP } from '../lib/gsap'
import { useExperience } from '../hooks/experience'
import { releases, moreReleases, spotifyUrl } from '../data/content'
import './Discography.css'

export default function Discography() {
  const rootRef = useRef(null)
  const { reducedMotion } = useExperience()

  useGSAP(
    () => {
      gsap.fromTo(
        '.disco__title',
        { rotateX: 70, yPercent: 60, opacity: 0 },
        {
          rotateX: 28,
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top 90%', end: 'top 20%', scrub: true },
        },
      )

      if (reducedMotion) return
      const cards = gsap.utils.toArray('.disco-card')

      gsap.set(cards.slice(1), { yPercent: 140, rotate: 6 })
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.disco__stage',
          start: 'top top',
          end: () => `+=${window.innerHeight * (cards.length - 0.4)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, index) => {
        if (index === 0) return
        timeline.to(card, { yPercent: 0, rotate: 0, duration: 1 }, index - 1)
        cards.slice(0, index).forEach((previous, previousIndex) => {
          const depth = index - previousIndex
          timeline.to(
            previous,
            { y: -depth * 22, scale: 1 - depth * 0.05, '--shade': Math.min(depth * 0.18, 0.6), duration: 1 },
            index - 1,
          )
        })
      })
      timeline.to({}, { duration: 0.4 })

      gsap.from('.disco__more-item', {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.disco__more', start: 'top 80%' },
      })
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  )

  return (
    <section id="discografia" ref={rootRef} className="disco">
      <div className="disco__stage">
        <h2 className="disco__title t-display">Discografia</h2>

        <div className="disco__deck">
          <div className="disco__tilt">
            {releases.map((release, index) => (
              <article
                key={release.title}
                className="disco-card"
                style={{ '--accent': release.accent, zIndex: index + 1 }}
                aria-label={`${release.title} (${release.year})`}
              >
                <header className="disco-card__head">
                  <h3 className="disco-card__title t-display">{release.title}</h3>
                  <span className="disco-card__year t-display">{release.year}</span>
                </header>

                <div className="disco-card__body">
                  <div className="disco-card__col disco-card__col--desc">
                    <h4 className="disco-card__label t-display">Sobre</h4>
                    <p>{release.description}</p>
                  </div>

                  <Picture name={release.cover} alt={`Capa de ${release.title}`} className="disco-card__cover" />

                  <div className="disco-card__col">
                    <h4 className="disco-card__label t-display">Créditos</h4>
                    <ul className="disco-card__tracks">
                      {release.credits.map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                    <dl className="disco-card__meta t-mono">
                      {release.plays && (
                        <div>
                          <dt>Plays</dt>
                          <dd>{release.plays}</dd>
                        </div>
                      )}
                      {release.duration && (
                        <div>
                          <dt>Duração</dt>
                          <dd>{release.duration}</dd>
                        </div>
                      )}
                    </dl>
                    <a className="disco-card__listen t-label" href={release.url} target="_blank" rel="noopener noreferrer">
                      Ouvir no Spotify <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="disco__more">
        <div className="disco__more-head">
          <h3 className="t-display">Mais lançamentos</h3>
          <a className="t-label" href={spotifyUrl} target="_blank" rel="noopener noreferrer">
            Ver tudo no Spotify <span aria-hidden="true">↗</span>
          </a>
        </div>
        <ul className="disco__more-grid">
          {moreReleases.map((release) => (
            <li key={release.title}>
              <a className="disco__more-item" href={release.url} target="_blank" rel="noopener noreferrer" data-cursor="play">
                <Picture name={release.cover} alt={`Capa de ${release.title}`} />
                <span className="t-display">{release.title}</span>
                <span className="t-mono">{release.year}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
