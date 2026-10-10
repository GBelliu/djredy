import Picture from './Picture'

/** Logo oficial "DJ Redy — Deita ou Respeita". Variantes geradas em public/img/logo-*. */
export default function Logo({ variant = 'branco', className, alt = '', ...rest }) {
  return <Picture name={`logo-${variant}`} alt={alt} className={className} {...rest} />
}
