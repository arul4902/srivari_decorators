import { useEffect, useRef } from 'react'
import { Phone } from 'lucide-react'

const WA_NUMBER = '919003607680'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal')
              .forEach((el) => el.classList.add('revealed'))
          }
        })
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Hello Srivari Decorators! I'd like to plan an event with you. Could you please share more details?")
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  const handleCall = () => {
    window.location.href = 'tel:+919003607680'
  }

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/cta-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
          loading="lazy"
          onError={(e) => {
            const t = e.currentTarget
            if (!t.dataset.fallback) {
              t.dataset.fallback = '1'
              t.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80&auto=format&fit=crop'
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#27002F]/90 via-[#27002F]/80 to-[#7200A8]/75" />
      </div>

      {/* Decorative border */}
      <div className="absolute inset-x-4 sm:inset-x-8 md:inset-x-16 inset-y-6 sm:inset-y-8 border border-[#D6B46A]/20 rounded-2xl sm:rounded-3xl pointer-events-none z-10" aria-hidden="true" />

      <div className="relative z-20 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <div className="reveal">
          <div className="ornament-divider mb-6">
            <span className="text-[#D6B46A] text-xs tracking-[0.2em] uppercase">Let's Celebrate Together</span>
          </div>
          <h2
            className="font-serif text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 600 }}
          >
            Let's Make Your Next Celebration{' '}
            <span className="text-shimmer">Unforgettable.</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Tell us about your special occasion. Let's create something beautiful together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="group inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-8 py-4 rounded-full text-sm tracking-wide transition-all duration-400 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </button>

            {/* Call */}
            <button
              onClick={handleCall}
              className="group inline-flex items-center justify-center gap-3 border-2 border-white/50 text-white hover:bg-white hover:text-[#27002F] font-semibold px-8 py-4 rounded-full text-sm tracking-wide transition-all duration-400 hover:scale-105"
            >
              <Phone size={18} className="group-hover:rotate-6 transition-transform" />
              Call Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

