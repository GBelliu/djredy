import { useCallback, useState } from 'react'
import ExperienceProvider from './components/ExperienceProvider'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Header from './components/Header'
import Grain from './components/Grain'
import SmokeTransition from './components/SmokeTransition'
import Hero from './sections/Hero'
import About from './sections/About'
import Discography from './sections/Discography'
import Bands from './sections/Bands'
import Shows from './sections/Shows'
import Gallery from './sections/Gallery'
import Merch from './sections/Merch'
import Contact from './sections/Contact'
import { transition } from './data/content'

export default function App() {
  const [ready, setReady] = useState(false)
  const handleLoaded = useCallback(() => setReady(true), [])

  return (
    <ExperienceProvider ready={ready}>
      <Preloader onComplete={handleLoaded} />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <About />
        <SmokeTransition lines={transition} />
        <Discography />
        <Bands />
        <Shows />
        <Gallery />
        <Merch />
        <Contact />
      </main>
      <Grain />
    </ExperienceProvider>
  )
}
