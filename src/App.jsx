import { useState } from 'react'
import HeroSection from './components/HeroSection.jsx'
import brandLogo from './assets/Images/glow-beauty-logo.webp'
import roseRadianceImage from './assets/Images/rose-radiance-face-cream.png'
import moodboardGlowImage from './assets/Images/beauty-moodboard-glow.png'
import skinEditImage from './assets/Images/skin-edit-routine.png'

const products = [
  {
    name: 'Lumière Renewal Serum',
    category: 'SKINCARE · 30 ML',
    price: '$48',
    label: 'BEST SELLER',
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85',
    tone: 'rose',
    id: 'skincare',
    shelf: 'Best Sellers',
  },
  {
    name: 'The Daily Dew Moisturizer',
    category: 'SKINCARE · 50 ML',
    price: '$36',
    label: 'LOVED BY YOU',
    image:
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85',
    tone: 'sand',
    shelf: 'Best Sellers',
  },
  {
    name: 'Rose Radiance Face Cream',
    category: 'SKINCARE · 50 ML',
    price: '$39',
    label: 'LOVED BY YOU',
    image: roseRadianceImage,
    tone: 'rose',
    id: 'face-cream',
    shelf: 'Best Sellers',
  },
  {
    name: 'Soft Focus Blush',
    category: 'MAKEUP · PETAL',
    price: '$29',
    label: 'NEW ARRIVAL',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85',
    tone: 'peach',
    id: 'makeup',
    shelf: 'New Arrivals',
  },
  {
    name: 'Golden Hour Face Oil',
    category: 'SKINCARE · 30 ML',
    price: '$42',
    label: 'JUST DROPPED',
    image:
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85',
    tone: 'olive',
    shelf: 'Trending Products',
  },
  {
    name: 'Petal Soft Lipstick',
    category: 'MAKEUP · ROSE',
    price: '$24',
    label: 'BEST SELLER',
    image:
      'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=900',
    tone: 'peach',
    shelf: 'Best Sellers',
  },
  {
    name: 'Cloud Kiss Cream Blush',
    category: 'MAKEUP · SOFT CORAL',
    price: '$27',
    label: 'JUST DROPPED',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85',
    tone: 'rose',
    shelf: 'New Arrivals',
  },
]

const shelves = ['Best Sellers', 'Trending Products', 'New Arrivals']

const makeupCategories = [
  {
    name: 'Face',
    detail: 'Your fresh-faced favorites',
    image:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=85',
    id: 'makeup',
  },
  {
    name: 'Eyes',
    detail: 'A little look, a lot of you',
    image:
      'https://images.unsplash.com/photo-1512207846876-bb54ef5056fe?auto=format&fit=crop&w=700&q=85',
    id: 'makeup',
  },
  {
    name: 'Lips',
    detail: 'Your shade, your rules',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=85',
    id: 'makeup',
  },
  {
    name: 'Skin',
    detail: 'The glow starts here',
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85',
    id: 'skincare',
  },
]

const beautyTrends = [
  {
    title: 'The soft sculpt',
    detail: 'A little definition, all you.',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Color outside the lines',
    detail: 'Meet your new favorite eye.',
    image:
      'https://images.unsplash.com/photo-1512207846876-bb54ef5056fe?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Barely-there glow',
    detail: 'Fresh skin, no filter needed.',
    image: moodboardGlowImage,
  },
]

const collections = [
  {
    name: 'The skin edit',
    detail: 'Rituals for your most radiant skin.',
    image: skinEditImage,
    id: 'skincare',
  },
  {
    name: 'The makeup edit',
    detail: 'A little color, a lot of you.',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85',
    id: 'makeup',
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.5 8.5h13l1 12h-15l1-12Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  )
}

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [activeShelf, setActiveShelf] = useState('Best Sellers')

  function handleSubscribe(event) {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
  }

  return (
    <>
      <div className="announcement">
        A little glow, on us — complimentary shipping on orders over $90
      </div>
      <header className="site-header">
        <a className="brand-logo" href="#home" aria-label="Glow Beauty home">
          <img src={brandLogo} alt="Glow Beauty — Your daily beauty ritual" />
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#skincare">Skincare</a>
          <a href="#makeup">Makeup</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="cart-link" href="#shop" aria-label={`Shopping bag, ${cartCount} items`}>
          <BagIcon />
          <span>Bag</span>
          <span className="cart-count">{cartCount}</span>
        </a>
      </header>

      <main>
        <HeroSection />

        <section className="summer-promo">
          <div className="summer-promo-copy">
            <p className="eyebrow">A SUNNY LITTLE SOMETHING</p>
            <h2>50% off your<br /><em>summer favorites.</em></h2>
            <p>Fresh color, feel-good formulas, and one very good reason to treat yourself.</p>
            <a className="button button-dark" href="#shop">
              Shop the sale <ArrowIcon />
            </a>
          </div>
          <div
            className="summer-promo-art"
            role="img"
            aria-label="Lumière rose-gold serum, moisturizer, and lipstick"
          />
          <span className="promo-discount">50%<br /><small>OFF</small></span>
        </section>

        <section className="section collection-section" id="collections">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR FEEL-GOOD</p>
              <h2>A little something <em>for you.</em></h2>
            </div>
            <a className="text-link" href="#shop">
              Explore all <ArrowIcon />
            </a>
          </div>
          <div className="collection-grid">
            {collections.map((collection, index) => (
              <a
                className={`collection-card collection-card-${index + 1}`}
                href={`#${collection.id}`}
                key={collection.id}
                style={{ '--collection-image': `url("${collection.image}")` }}
              >
                <div className="collection-card-content">
                  <span className="collection-number">0{index + 1} / EDIT</span>
                  <div>
                    <h3>{collection.name}</h3>
                    <p>{collection.detail}</p>
                  </div>
                  <span className="round-arrow">
                    <ArrowIcon />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section category-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR ROUTINE, YOUR RULES</p>
              <h2>Browse by <em>category.</em></h2>
            </div>
          </div>
          <div className="category-grid">
            {makeupCategories.map((category, index) => (
              <a
                className="category-card"
                href={`#${category.id}`}
                key={category.name}
              >
                <img src={category.image} alt="" loading="lazy" />
                <div className="category-overlay">
                  <span className="category-index">0{index + 1} / 04</span>
                  <h3>{category.name}</h3>
                  <p>{category.detail}</p>
                  <span className="category-shop">SHOP NOW <ArrowIcon /></span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section products-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A GOOD PLACE TO START</p>
              <h2>Meet your <em>new favorites.</em></h2>
            </div>
            <a className="text-link" href="#shop">
              Shop all products <ArrowIcon />
            </a>
          </div>
          <div className="shelf-tabs" role="tablist" aria-label="Shop product collections">
            {shelves.map((shelf) => (
              <button
                className={activeShelf === shelf ? 'shelf-tab active' : 'shelf-tab'}
                type="button"
                role="tab"
                aria-selected={activeShelf === shelf}
                key={shelf}
                onClick={() => setActiveShelf(shelf)}
              >
                {shelf}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {products.filter((product) => product.shelf === activeShelf).map((product) => (
              <article className="product-card" id={product.id} key={product.name}>
                <div className={`product-image product-${product.tone}`}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="product-label">{product.label}</span>
                  <button
                    className="add-button"
                    type="button"
                    onClick={() => setCartCount((count) => count + 1)}
                    aria-label={`Add ${product.name} to bag`}
                  >
                    +
                  </button>
                </div>
                <div className="product-info">
                  <div>
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <span className="product-price">{product.price}</span>
                </div>
                <div className="product-rating">
                  <span>★★★★★</span> <span>(128)</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section trends-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A LITTLE INSPIRATION</p>
              <h2>On our <em>beauty moodboard.</em></h2>
            </div>
            <a className="text-link" href="#makeup">
              Explore makeup <ArrowIcon />
            </a>
          </div>
          <div className="trends-grid">
            {beautyTrends.map((trend, index) => (
              <a className="trend-card" href="#makeup" key={trend.title}>
                <div className="trend-image">
                  <img src={trend.image} alt={trend.title} loading="lazy" />
                  <span>0{index + 1}</span>
                </div>
                <div className="trend-info">
                  <div>
                    <h3>{trend.title}</h3>
                    <p>{trend.detail}</p>
                  </div>
                  <ArrowIcon />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="about-banner" id="about">
          <div className="about-mark" aria-hidden="true">L.</div>
          <div className="about-copy">
            <p className="eyebrow">A NOTE FROM US</p>
            <h2>Beauty should feel like <em>you.</em></h2>
            <p>
              We believe the best routine is the one that feels like yours.
              So we make the good stuff: considered ingredients, comforting
              textures, and a little moment of joy in every jar.
            </p>
            <a className="text-link" href="#contact">
              Our story <ArrowIcon />
            </a>
          </div>
          <div className="about-aside">
            <span>01</span>
            <span className="aside-rule" />
            <span>MADE WITH CARE<br />WORN YOUR WAY</span>
          </div>
        </section>

        <section className="review-section">
          <p className="eyebrow">KIND WORDS, REAL GLOW</p>
          <div className="review-stars">★★★★★</div>
          <blockquote>
            “My skin, but on a really good day. I finally look forward to my
            evening routine.”
          </blockquote>
          <p className="review-author">JAMIE R. <span>· VERIFIED CUSTOMER</span></p>
          <div className="review-dots" aria-label="Review 1 of 3">
            <span className="active" />
            <span />
            <span />
          </div>
        </section>

        <section className="offer-section">
          <div className="offer-content">
            <p className="eyebrow">A LITTLE TREAT, ON US</p>
            <h2>Your first glow-up<br />is <em>10% off.</em></h2>
            <p>Join our list for 10% off your first order, plus good things in your inbox.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <label className="visually-hidden" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setSubscribed(false)
                }}
                placeholder="Your email address"
                required
              />
              <button type="submit" aria-label="Subscribe to newsletter">
                <ArrowIcon />
              </button>
            </form>
            <p
              className={`newsletter-message${subscribed ? ' newsletter-message-success' : ''}`}
              role="status"
              aria-live="polite"
            >
              {subscribed
                ? 'You’re subscribed! Keep an eye on your inbox for your 10% off.'
                : 'By subscribing, you agree to receive a little lovely from us.'}
            </p>
          </div>
          <div className="offer-stamp" aria-hidden="true">
            <span>GLOW<br />GOODS</span>
            <i>✳</i>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-top">
          <div className="footer-brand">
            <p>For the love of your own lovely.</p>
            <span>Thoughtful beauty for your everyday glow.</span>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <h2>Explore</h2>
            <div className="footer-links">
              <a href="#shop">Shop all</a>
              <a href="#collections">Collections</a>
              <a href="#makeup">Makeup</a>
              <a href="#about">Our story</a>
            </div>
          </nav>
          <div className="footer-contact">
            <h2>Get in touch</h2>
            <a href="mailto:soni123@gmail.com">soni123@gmail.com</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 LUMIÈRE BEAUTY</span>
          <span>MADE FOR YOUR EVERYDAY GLOW</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}

export default App
