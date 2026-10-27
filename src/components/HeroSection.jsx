import heroImage from '../assets/Images/hero-campaign.png'
import HeroBenefits from './HeroBenefits.jsx'
import HeroCopy from './HeroCopy.jsx'
import heroBenefitsData from './heroBenefitsData.jsx'

const defaultActions = [
  { label: 'Shop Now', href: '#shop', variant: 'dark', showArrow: true },
  { label: 'Explore Collection', href: '#collections', variant: 'outline' },
]

function HeroSection({
  id = 'home',
  className = '',
  image = heroImage,
  imageAlt = 'Lumière skincare and makeup collection arranged on marble displays',
  eyebrow = 'NEW COLLECTION',
  heading = (
    <>
      Your Beauty,
      <br />
      <em>Your Glow</em>
    </>
  ),
  description = 'Thoughtful skincare and feel-good color, crafted with care for your everyday glow-up.',
  actions = defaultActions,
  benefits = heroBenefitsData,
  benefitsLabel = 'Lumière benefits',
}) {
  return (
    <section className={`hero ${className}`.trim()} id={id}>
      <img className="hero-product-image" src={image} alt={imageAlt} />
      <HeroCopy
        eyebrow={eyebrow}
        heading={heading}
        description={description}
        actions={actions}
      />
      {benefits.length > 0 && (
        <HeroBenefits benefits={benefits} ariaLabel={benefitsLabel} />
      )}
    </section>
  )
}

export default HeroSection
