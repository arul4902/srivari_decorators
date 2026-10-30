import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Sparkles, Phone } from 'lucide-react'
import SafeImage from './SafeImage'

// Local verified high-resolution images with online CDN fallbacks
const heroImages = [
  {
    src: '/images/hero-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85&auto=format&fit=crop',
    alt: 'Grand wedding stage decoration by Srivari Decorators',
  },
  {
    src: '/images/hero-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=85&auto=format&fit=crop',
    alt: 'Celebration lighting and event setup in Coimbatore',
  },
  {
    src: '/images/hero-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=85&auto=format&fit=crop',
    alt: 'Traditional Indian wedding mandap decoration',
  },
]

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [fading, setFading] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = (idx: number) => {
    if (idx === currentImage) return
    setFading(true)
    setTimeout(() => {
      setCurrentImage(idx)
      setFading(false)
    }, 500)
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % heroImages.length)
        setFading(false)
      }, 500)
    }, 6000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* Background images */}
      {heroImages.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === currentImage && !fading ? 1 : 0 }}
          aria-hidden="true"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover object-center"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : undefined}
            onError={(e) => {
              const t = e.currentTarget
              if (t.src !== img.fallback) t.src = img.fallback
            }}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#27002F]/60 via-[#27002F]/40 to-[#27002F]/85 z-10" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#27002F]/20 via-transparent to-transparent z-10" aria-hidden="true" />

      {/* Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7200A8] via-[#D6B46A] to-[#E50065] z-20" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col items-center text-center pt-28 pb-24 sm:pt-32 sm:pb-28">

        {/* Eyebrow */}
        <div
          className="animate-fade-down mb-5 sm:mb-6 inline-flex items-center gap-2 border border-[#D6B46A]/40 text-[#D6B46A] text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(214,180,106,0.08)', animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Sparkles size={10} />
          <span>Coimbatore's Premier Event Designers</span>
          <Sparkles size={10} />
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up font-serif text-white leading-[1.1] mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(2.1rem, 7vw, 5.5rem)',
            fontWeight: 600,
            animationDelay: '0.4s',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          Every Celebration<br />
          <span className="text-shimmer">Deserves to Be</span><br />
          Extraordinary.
        </h1>

        {/* Subheading */}
        <p
          className="animate-fade-up text-white/75 max-w-lg text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 font-light px-2"
          style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}
        >
          From beautiful decorations to unforgettable celebrations, we bring your special moments to life.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center"
          style={{ animationDelay: '0.95s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <button
            onClick={() => scrollTo('gallery')}
            className="group inline-flex items-center justify-center gap-2.5 border-2 border-[#D6B46A] text-[#D6B46A] hover:bg-[#D6B46A] hover:text-[#27002F] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
          >
            <Sparkles size={15} className="group-hover:rotate-12 transition-transform flex-shrink-0" />
            Explore Our Work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="group inline-flex items-center justify-center gap-2.5 bg-[#E50065] hover:bg-[#c2004f] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl w-full sm:w-auto"
          >
            <Phone size={15} className="flex-shrink-0" />
            Plan Your Event
          </button>
        </div>

        {/* Slide dots */}
        <div
          className="animate-fade-up flex gap-2.5 mt-12 sm:mt-14"
          style={{ animationDelay: '1.2s', opacity: 0, animationFillMode: 'forwards' }}
          role="tablist"
          aria-label="Hero image selection"
        >
          {heroImages.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentImage}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-500 ${
                i === currentImage ? 'w-8 h-2 bg-[#D6B46A]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll arrow */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/55 hover:text-white/90 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce-subtle" />
      </button>

      {/* Preload next image invisibly */}
      <div className="hidden" aria-hidden="true">
        <SafeImage src={heroImages[(currentImage + 1) % heroImages.length].src} alt="" />
      </div>
    </section>
  )
}
