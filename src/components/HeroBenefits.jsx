function HeroBenefits({ benefits, ariaLabel = 'Benefits' }) {
  return (
    <div className="hero-benefits" aria-label={ariaLabel}>
      {benefits.map(({ title, detail, icon }) => (
        <div className="hero-benefit" key={title}>
          <svg
            className="hero-benefit-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.35"
            aria-hidden="true"
          >
            {icon}
          </svg>
          <span>
            <strong>{title}</strong>
            <small>{detail}</small>
          </span>
        </div>
      ))}
    </div>
  )
}

export default HeroBenefits
