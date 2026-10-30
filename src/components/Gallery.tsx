import { useState, useEffect, useRef, useCallback } from 'react'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import SafeImage from './SafeImage'

const galleryImages = [
  {
    src: '/images/gallery-1.jpg',
    thumb: '/images/gallery-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85&auto=format&fit=crop',
    alt: 'Romantic wedding stage with floral canopy and candlelight',
    cls: 'g-item-1',
  },
  {
    src: '/images/gallery-2.jpg',
    thumb: '/images/gallery-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=85&auto=format&fit=crop',
    alt: 'Elegant balloon arch and floral decoration for celebration',
    cls: 'g-item-2',
  },
  {
    src: '/images/gallery-3.jpg',
    thumb: '/images/gallery-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1000&q=85&auto=format&fit=crop',
    alt: 'Grand wedding mandap with flowers and lighting',
    cls: 'g-item-3',
  },
  {
    src: '/images/gallery-4.jpg',
    thumb: '/images/gallery-4.jpg',
    fallback: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&q=85&auto=format&fit=crop',
    alt: 'Beautifully lit event venue decoration',
    cls: 'g-item-4',
  },
  {
    src: '/images/gallery-5.jpg',
    thumb: '/images/gallery-5.jpg',
    fallback: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=800&q=85&auto=format&fit=crop',
    alt: 'Birthday event with colourful décor',
    cls: 'g-item-5',
  },
  {
    src: '/images/gallery-6.jpg',
    thumb: '/images/gallery-6.jpg',
    fallback: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&q=85&auto=format&fit=crop',
    alt: 'Traditional Indian floral stage arrangement',
    cls: 'g-item-6',
  },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-scale')
              .forEach((el) => el.classList.add('revealed'))
          }
        })
      },
      { threshold: 0.06 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevImage = useCallback(() => {
    setLightbox((prev) => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null)
  }, [])
  const nextImage = useCallback(() => {
    setLightbox((prev) => prev !== null ? (prev + 1) % galleryImages.length : null)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, prevImage, nextImage])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section id="gallery" ref={sectionRef} className="py-20 lg:py-36 bg-[#FFFDF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 reveal">
          <div className="ornament-divider mb-4 sm:mb-5">
            <span className="text-[#D6B46A] text-xs tracking-[0.2em] uppercase font-medium">Our Portfolio</span>
          </div>
          <h2
            className="font-serif text-[#27002F] leading-tight"
            style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.5rem)', fontWeight: 600 }}
          >
            Featured <span style={{ color: '#7200A8' }}>Event Gallery</span>
          </h2>
          <p className="text-[#4a3050]/75 mt-3 sm:mt-4 max-w-md mx-auto text-sm sm:text-base">
            A glimpse into the celebrations we love to create.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="gallery-grid">
          {galleryImages.map((img, i) => (
            <div
              key={img.src}
              className={`${img.cls} img-zoom reveal-scale relative overflow-hidden rounded-xl cursor-pointer group`}
              style={{ transitionDelay: `${i * 0.08}s` }}
              onClick={() => setLightbox(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightbox(i) }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View: ${img.alt}`}
            >
              <SafeImage
                src={img.thumb}
                fallbackSrc={img.fallback}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#27002F]/75 via-[#27002F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5">
                <div className="flex items-center gap-2 text-white">
                  <ZoomIn size={16} />
                  <span className="text-sm font-medium">View</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal text-center mt-10 sm:mt-14">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2.5 bg-[#7200A8] hover:bg-[#5a0085] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Planning Your Event
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="lightbox-overlay fixed inset-0 z-[100] bg-black/96 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 sm:p-2.5 transition-all z-10"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 sm:p-3 transition-all z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={galleryImages[lightbox].src}
            alt={galleryImages[lightbox].alt}
            className="max-w-full max-h-[82vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              const t = e.currentTarget
              if (t.src !== galleryImages[lightbox].fallback) t.src = galleryImages[lightbox].fallback
            }}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 sm:p-3 transition-all z-10"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightbox + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  )
}
