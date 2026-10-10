import { useRef } from 'react'
import Picture from '../components/Picture'
import { gsap, useGSAP } from '../lib/gsap'
import { gallery } from '../data/content'
import './Gallery.css'

export default function Gallery() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      // Desktop/tablet: scroll vertical vira trilho horizontal fixado
      media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const track = rootRef.current.querySelector('.gallery__track')
        const distance = () => track.scrollWidth - window.innerWidth

        const horizontal = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.utils.toArray('.gallery__item img').forEach((image) => {
          gsap.fromTo(
            image,
            { xPercent: -12 },
            {
              xPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: image.closest('.gallery__item'),
                containerAnimation: horizontal,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })

        gsap.to('.gallery__progress span', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      })

      return () => media.revert()
    },
    { scope: rootRef },
  )

  return (
    <section id="galeria" ref={rootRef} className="gallery">
      <div className="gallery__track">
        <div className="gallery__intro">
          <span className="section-label t-label">Galeria</span>
          <h2 className="gallery__title t-condensed">
            Por trás <br />
            <span className="chrome-outline">do grave</span>
          </h2>
          <p className="t-mono gallery__hint">Role para explorar →</p>
        </div>

        {gallery.map((item, index) => (
          <figure key={item.image} className={`gallery__item gallery__item--${index % 3}`}>
            <div className="gallery__frame" data-cursor="ver">
              <Picture name={item.image} alt={item.caption} />
            </div>
            <figcaption className="gallery__caption t-mono">
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="gallery__progress" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
