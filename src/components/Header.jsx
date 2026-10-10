import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import Magnetic from './Magnetic'
import { nav, contact } from '../data/content'
import { useExperience } from '../hooks/experience'
import './Header.css'

const EASE = [0.76, 0, 0.24, 1]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { lenis, scrollTo } = useExperience()

  useEffect(() => {
    if (!open) return
    lenis?.stop()
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open, lenis])

  const go = (event, id) => {
    event.preventDefault()
    setOpen(false)
    scrollTo(`#${id}`)
  }

  return (
    <>
      <header className={`header ${open ? 'is-open' : ''}`}>
        <a href="#inicio" className="header__logo" aria-label="DJ Redy — início" onClick={(e) => go(e, 'inicio')}>
          <Logo loading="eager" />
        </a>
        <Magnetic strength={0.5}>
          <button
            type="button"
            className="burger"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </Magnetic>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu"
            className="menu"
            aria-label="Navegação principal"
            initial={{ clipPath: 'circle(0% at calc(100% - 60px) 50px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 60px) 50px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 60px) 50px)' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <ul className="menu__list">
              {nav.map((item, index) => (
                <li key={item.id} className="line-mask">
                  <motion.a
                    href={`#${item.id}`}
                    className="menu__link t-display chrome"
                    onClick={(e) => go(e, item.id)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 + index * 0.05 }}
                  >
                    <span className="menu__index t-mono">0{index + 1}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="menu__footer t-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7 } }}
              exit={{ opacity: 0 }}
            >
              <a href={`mailto:${contact.emails[1]}`}>{contact.emails[1]}</a>
              <span>{contact.coordinates.join(' / ')}</span>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
