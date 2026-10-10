import { useEffect, useMemo, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { ExperienceContext, detectEnvironment } from '../hooks/experience'

export default function ExperienceProvider({ ready, children }) {
  const [environment] = useState(detectEnvironment)
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('perf-low', environment.lowEnd)
    root.classList.toggle('has-cursor', !environment.isTouch)
  }, [environment])

  useEffect(() => {
    if (environment.reducedMotion) return

    const instance = new Lenis({ lerp: environment.lowEnd ? 0.16 : 0.085, wheelMultiplier: 0.9 })
    const tick = (time) => instance.raf(time * 1000)

    instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [environment])

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !ready)
    if (lenis) {
      if (ready) lenis.start()
      else lenis.stop()
    }
    if (ready) ScrollTrigger.refresh()
  }, [lenis, ready])

  const value = useMemo(() => {
    const scrollTo = (target) => {
      if (lenis) return lenis.scrollTo(target, { duration: 1.6, force: true })
      const element = typeof target === 'string' ? document.querySelector(target) : null
      if (element) element.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return { ...environment, ready, lenis, scrollTo }
  }, [environment, ready, lenis])

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}
