import Marquee from '../components/Marquee'
import { marquee } from '../data/content'
import './Bands.css'

/** Duas faixas cruzadas que fazem a passagem do claro para o escuro. */
export default function Bands() {
  return (
    <div className="bands">
      <Marquee items={marquee} className="band band--light t-display" duration={26} reverse />
      <Marquee items={marquee} className="band band--dark t-display" duration={20} />
    </div>
  )
}
