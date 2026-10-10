/** Imagem com AVIF + fallback WebP (gerados por scripts/optimize-images.mjs). */
export default function Picture({ name, alt = '', className, imgClassName, loading = 'lazy', ...rest }) {
  return (
    <picture className={className}>
      <source srcSet={`/img/${name}.avif`} type="image/avif" />
      <img
        className={imgClassName}
        src={`/img/${name}.webp`}
        alt={alt}
        loading={loading}
        decoding="async"
        draggable="false"
        {...rest}
      />
    </picture>
  )
}
