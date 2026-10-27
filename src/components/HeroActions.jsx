function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  )
}

function HeroActions({ actions }) {
  return (
    <div className="hero-actions">
      {actions.map(({ label, href, variant = 'dark', showArrow = false, className = '' }) => (
        <a
          className={`button button-${variant} ${className}`.trim()}
          href={href}
          key={`${label}-${href}`}
        >
          {label}
          {showArrow && <ArrowIcon />}
        </a>
      ))}
    </div>
  )
}

export default HeroActions
