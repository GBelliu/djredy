const PATHS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
    </>
  ),
  spotify: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M7 9.6c3.4-1 7-.7 10 .9M7.6 12.6c2.8-.8 5.7-.5 8.2.8M8.2 15.4c2.2-.6 4.4-.4 6.4.6" strokeLinecap="round" />
    </>
  ),
}

export default function SocialIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      {PATHS[name]}
    </svg>
  )
}
