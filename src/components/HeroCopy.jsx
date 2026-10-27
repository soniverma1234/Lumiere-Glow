import HeroActions from './HeroActions.jsx'

function HeroCopy({ eyebrow, heading, description, actions }) {
  return (
    <div className="hero-copy">
      {eyebrow && (
        <p className="eyebrow hero-eyebrow">
          <span className="hero-eyebrow-mark" aria-hidden="true">✦</span>
          {eyebrow}
        </p>
      )}
      <h1>{heading}</h1>
      {description && <p className="hero-description">{description}</p>}
      {actions.length > 0 && <HeroActions actions={actions} />}
    </div>
  )
}

export default HeroCopy
