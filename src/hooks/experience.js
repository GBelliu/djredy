import { createContext, useContext } from 'react'

export const ExperienceContext = createContext(null)

export function useExperience() {
  const context = useContext(ExperienceContext)
  if (!context) throw new Error('useExperience must be used inside <ExperienceProvider>')
  return context
}

/**
 * Detecta capacidades do dispositivo para desligar efeitos pesados
 * em aparelhos fracos, economia de dados ou movimento reduzido.
 */
export function detectEnvironment() {
  const matches = (query) => window.matchMedia(query).matches
  const reducedMotion = matches('(prefers-reduced-motion: reduce)')
  const isTouch = matches('(pointer: coarse)')
  const cores = navigator.hardwareConcurrency || 8
  const memory = navigator.deviceMemory || 8
  const saveData = navigator.connection?.saveData === true

  return {
    reducedMotion,
    isTouch,
    lowEnd: reducedMotion || saveData || cores <= 4 || memory <= 4,
  }
}
