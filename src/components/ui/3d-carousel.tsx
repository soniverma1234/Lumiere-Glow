"use client"

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion"
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react"
import "./3d-carousel.css"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = () =>
    IS_SERVER ? defaultValue : window.matchMedia(query).matches

  const [matches, setMatches] = useState<boolean>(() =>
    initializeWithValue ? getMatches() : defaultValue,
  )

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    const handleChange = () => setMatches(getMatches())

    handleChange()
    matchMedia.addEventListener("change", handleChange)
    return () => matchMedia.removeEventListener("change", handleChange)
  }, [query])

  return matches
}

export type CarouselCard = {
  id: string
  src: string
  alt: string
}

type ThreeDPhotoCarouselProps = {
  cards: CarouselCard[]
  className?: string
  label?: string
}

const spring = {
  type: "spring" as const,
  stiffness: 100,
  damping: 24,
  mass: 0.4,
}

function ThreeDPhotoCarousel({
  cards,
  className = "",
  label = "Featured beauty products",
}: ThreeDPhotoCarouselProps) {
  const isSmallScreen = useMediaQuery("(max-width: 640px)")
  const [activeImg, setActiveImg] = useState<CarouselCard | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const rotation = useMotionValue(0)
  const transform = useTransform(rotation, (value) => `rotateY(${value}deg)`)
  const drag = useRef({
    isDragging: false,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  })
  const didDrag = useRef(false)
  const inertia = useRef<AnimationPlaybackControls | null>(null)

  const cylinderWidth = isSmallScreen ? 1100 : 1440
  const faceWidth = cards.length > 0 ? (cylinderWidth / cards.length) * 0.86 : 0
  const radius = cylinderWidth / (2 * Math.PI)

  useEffect(() => {
    if (!activeImg) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveImg(null)
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [activeImg])

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (activeImg || cards.length < 2) return
    inertia.current?.stop()
    didDrag.current = false
    drag.current = {
      isDragging: true,
      startX: event.clientX,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.isDragging) return

    const now = performance.now()
    const distance = event.clientX - drag.current.startX
    const movement = event.clientX - drag.current.lastX
    const elapsed = Math.max(now - drag.current.lastTime, 1)

    didDrag.current = didDrag.current || Math.abs(distance) > 5
    drag.current.velocity = (event.clientX - drag.current.lastX) / elapsed
    drag.current.lastX = event.clientX
    drag.current.lastTime = now
    rotation.set(rotation.get() + movement * 0.18)
  }

  function handlePointerUp() {
    if (!drag.current.isDragging) return
    drag.current.isDragging = false
    if (didDrag.current) {
      inertia.current = animate(
        rotation,
        rotation.get() + drag.current.velocity * 180,
        spring,
      )
    }
  }

  function rotateToNext(direction: -1 | 1) {
    inertia.current?.stop()
    const nextIndex = (activeIndex + direction + cards.length) % cards.length
    setActiveIndex(nextIndex)
    inertia.current = animate(
      rotation,
      rotation.get() - direction * (360 / cards.length),
      spring,
    )
  }

  function handleCardClick(card: CarouselCard) {
    if (didDrag.current) return
    setActiveImg(card)
  }

  if (cards.length === 0) return null

  return (
    <div className={`three-d-carousel-root ${className}`}>
      <div
        className="three-d-carousel-stage flex h-full items-center justify-center"
        role="region"
        aria-label={label}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <motion.div
          className="three-d-carousel-cylinder relative flex h-full items-center justify-center"
          style={{
            transform,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="three-d-carousel-face absolute flex h-full origin-center items-center justify-center"
              style={{
                width: faceWidth,
                transform: `rotateY(${index * (360 / cards.length)}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.button
                type="button"
                className="three-d-carousel-card"
                aria-label={`View ${card.alt}`}
                onClick={() => handleCardClick(card)}
                whileHover={{ scale: 1.035, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.img
                  src={card.src}
                  alt={card.alt}
                  layoutId={`beauty-product-${card.id}`}
                  className="three-d-carousel-image aspect-square w-full rounded-xl object-cover"
                  style={{
                    objectPosition:
                      card.id === "featured-lumiere-noci" ? "72% center" : "center",
                  }}
                  initial={{ filter: "blur(5px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  draggable={false}
                />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {cards.length > 1 && (
        <div className="three-d-carousel-controls">
          <button
            type="button"
            className="three-d-carousel-arrow"
            aria-label="Previous product"
            onClick={() => rotateToNext(-1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <span className="three-d-carousel-count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(cards.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="three-d-carousel-arrow"
            aria-label="Next product"
            onClick={() => rotateToNext(1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {activeImg && (
          <motion.div
            className="three-d-carousel-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={activeImg.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImg(null)}
          >
            <motion.button
              type="button"
              className="three-d-carousel-close"
              aria-label="Close product preview"
              onClick={() => setActiveImg(null)}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              ×
            </motion.button>
            <motion.img
              layoutId={`beauty-product-${activeImg.id}`}
              src={activeImg.src}
              alt={activeImg.alt}
              className="three-d-carousel-preview"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { ThreeDPhotoCarousel }
