import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import './Preloader.css'

const BOOT_LINES = [
  'REDY.SYS v2.6 — inicializando',
  'carregando bruxaria .......... OK',
  'sincronizando BPM [130] ...... OK',
  'aquecendo o paredão .......... OK',
  'to com saudade vida .......... OK',
]
const CRITICAL_IMAGES = ['/img/cutout-8.avif', '/img/logo-branco-com-relevo.avif', '/img/logo-branco.avif']
const MIN_DURATION = 2200

function preload() {
  const images = CRITICAL_IMAGES.map((src) => {
    const image = new Image()
    image.src = src
    return image.decode().catch(() => {})
  })
  return Promise.all([...images, document.fonts?.ready]).catch(() => {})
}

/** Preloader estilo "boot de sistema": aguarda fontes + imagem do hero. */
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let assetsReady = false
    let frame
    const start = performance.now()
    preload().then(() => {
      assetsReady = true
    })

    const loop = (now) => {
      const elapsed = Math.min((now - start) / MIN_DURATION, 1)
      const target = assetsReady ? elapsed : Math.min(elapsed, 0.92)
      setProgress((value) => Math.max(value, target))
      if (elapsed >= 1 && assetsReady) {
        setDone(true)
        onComplete()
        return
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [onComplete])

  const percent = Math.round(progress * 100)
  const visibleLines = Math.ceil(progress * BOOT_LINES.length)

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          role="status"
          aria-label={`Carregando ${percent}%`}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader__top">
            <Logo className="preloader__logo" loading="eager" />
            <span className="t-mono">Booting // DJ REDY</span>
          </div>

          <ul className="preloader__log t-mono" aria-hidden="true">
            {BOOT_LINES.slice(0, visibleLines).map((line) => (
              <li key={line}>
                <span className="preloader__caret">&gt;</span> {line}
              </li>
            ))}
            <li className="preloader__cursor">_</li>
          </ul>

          <div className="preloader__bottom">
            <span className="preloader__count t-condensed" aria-hidden="true">
              {String(percent).padStart(3, '0')}
            </span>
            <div className="preloader__bar">
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
