import { useRef } from 'react'
import Picture from '../components/Picture'
import Magnetic from '../components/Magnetic'
import SocialIcon from '../components/SocialIcon'
import { gsap, useGSAP } from '../lib/gsap'
import { useExperience } from '../hooks/experience'
import { contact } from '../data/content'
import './Contact.css'

const YEAR = new Date().getFullYear()

export default function Contact() {
  const rootRef = useRef(null)
  const { scrollTo } = useExperience()

  useGSAP(
    () => {
      const root = rootRef.current

      gsap.fromTo(
        '.contact__marquee-text',
        { xPercent: 0 },
        {
          xPercent: -40,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      gsap.fromTo(
        '.contact__artist',
        { yPercent: 18, scale: 1.08 },
        {
          yPercent: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: true },
        },
      )
      gsap.fromTo(
        '.contact__ghost',
        { yPercent: 40 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: true },
        },
      )

      gsap
        .timeline({ defaults: { ease: 'expo.out' }, scrollTrigger: { trigger: '.contact__content', start: 'top 75%' } })
        .from('.contact__label', { opacity: 0, x: -20, duration: 1 })
        .from('.contact__email-text', { yPercent: 110, duration: 1.2, stagger: 0.12 }, 0.1)
        .from('.contact__rule', { scaleX: 0, duration: 1.4, stagger: 0.12 }, 0.2)
        .from('.contact__coords, .contact__social', { opacity: 0, y: 20, duration: 1, stagger: 0.06 }, 0.5)
    },
    { scope: rootRef },
  )

  return (
    <section id="contato" ref={rootRef} className="contact">
      <div className="contact__marquee t-condensed" aria-hidden="true">
        <span className="contact__marquee-text">{contact.marquee.repeat(4)}</span>
      </div>
      <span className="contact__ghost t-display" aria-hidden="true">
        REDY
      </span>

      <Picture name="cutout-11" alt="DJ Redy apontando para frente" className="contact__artist" />

      <div className="contact__content">
        <h2 className="contact__label t-label">{contact.label}</h2>

        <ul className="contact__emails">
          {contact.emails.map((email) => (
            <li key={email}>
              <a className="contact__email" href={`mailto:${email}`} data-cursor="mail">
                <span className="line-mask">
                  <span className="contact__email-text t-display">
                    <span className="contact__roll" data-text={email}>
                      {email}
                    </span>
                  </span>
                </span>
                <span className="contact__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
              <span className="contact__rule" aria-hidden="true" />
            </li>
          ))}
        </ul>

        <div className="contact__coords t-mono">
          <p className="contact__coords-label">{contact.coordinatesLabel}</p>
          {contact.coordinates.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <ul className="contact__social" aria-label="Redes sociais">
          {contact.socials.map((social) => (
            <li key={social.name}>
              <Magnetic strength={0.45}>
                <a
                  className="contact__social-link"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <SocialIcon name={social.icon} />
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </div>

      <footer className="contact__footer t-mono">
        <span>© {YEAR} DJ Redy. Todos os direitos reservados.</span>
        <button type="button" onClick={() => scrollTo(0)}>
          Voltar ao topo ↑
        </button>
      </footer>
    </section>
  )
}
