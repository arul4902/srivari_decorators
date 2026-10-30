import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import SafeImage from './SafeImage'

const services = [
  {
    number: '01',
    title: 'Event Planning & Decorations',
    description:
      'From grand wedding stages adorned with flowers and fabric to intimate birthday setups — every event is treated as a unique canvas. We craft immersive visual environments that reflect your personal style.',
    image: '/images/service-decor.jpg',
    fallback: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Elegant wedding stage decoration with floral arch and fairy lights',
    ctaText: 'Enquire for Events',
  },
  {
    number: '02',
    title: 'Srivari Sounds & Decors',
    description:
      'Crystal-clear professional sound systems paired with stunning ambient décor and lighting transform any venue into a sensory experience. Perfect acoustics and beautiful aesthetics, together.',
    image: '/images/service-sound.jpg',
    fallback: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Professional event lighting and sound setup at an Indian celebration',
    ctaText: 'Enquire for Sound & Decor',
  },
  {
    number: '03',
    title: 'Srivari Caterings',
    description:
      'An exquisite celebration is complemented by exceptional food. Our catering team curates menus with care, serving traditional favourites and contemporary dishes with impeccable presentation.',
    image: '/images/service-catering.jpg',
    fallback: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=85&auto=format&fit=crop',
    imageAlt: 'Elegantly presented catering spread for an event',
    ctaText: 'Enquire for Catering',
  },
]

const WA_NUMBER = '919585170410'

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
              .forEach((el) => el.classList.add('revealed'))
          }
        })
      },
      { threshold: 0.06 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleEnquire = (service: string) => {
    const msg = encodeURIComponent(
      `Hello Srivari Decorators! I'm interested in your ${service}. Could you please share more details?`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:py-36 overflow-hidden" style={{ backgroundColor: '#27002F' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="text-center mb-14 sm:mb-20 reveal">
          <div className="ornament-divider mb-4 sm:mb-5">
            <span className="text-[#D6B46A] text-xs tracking-[0.2em] uppercase font-medium">What We Offer</span>
          </div>
          <h2
            className="font-serif text-white leading-tight"
            style={{ fontSize: 'clamp(1.9rem, 5vw, 3.5rem)', fontWeight: 600 }}
          >
            Our <span className="text-shimmer">Services</span>
          </h2>
          <p className="text-white/55 mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Three integrated services — one seamless event experience.
          </p>
        </div>

        {/* Service panels */}
        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-28">
          {services.map((svc, idx) => {
            const isReversed = idx % 2 === 1
            return (
              <article key={svc.number} className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

                {/* Image — always first on mobile, alternates on desktop */}
                <div
                  className={`img-zoom reveal-${isReversed ? 'right' : 'left'} relative rounded-2xl overflow-hidden shadow-2xl ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                  style={{ aspectRatio: '4/3' }}
                >
                  <SafeImage
                    src={svc.image}
                    fallbackSrc={svc.fallback}
                    alt={svc.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#27002F]/50 to-transparent pointer-events-none" />
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 font-serif text-[#D6B46A] text-4xl sm:text-5xl font-bold opacity-60 select-none">
                    {svc.number}
                  </div>
                </div>

                {/* Text */}
                <div
                  className={`reveal-${isReversed ? 'left' : 'right'} flex flex-col gap-4 sm:gap-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <span className="text-[#D6B46A] text-xs tracking-[0.2em] uppercase font-medium">{`0${idx + 1} / 03`}</span>
                    <h3
                      className="font-serif text-white mt-2 sm:mt-3 leading-tight"
                      style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 600 }}
                    >
                      {svc.title}
                    </h3>
                  </div>
                  <p className="text-white/65 leading-relaxed text-sm sm:text-base">
                    {svc.description}
                  </p>
                  <button
                    onClick={() => handleEnquire(svc.title)}
                    className="group self-start inline-flex items-center gap-3 mt-1 border border-[#D6B46A]/50 text-[#D6B46A] hover:bg-[#D6B46A] hover:text-[#27002F] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105"
                  >
                    {svc.ctaText}
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
