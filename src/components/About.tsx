import { useEffect, useRef } from 'react'
import { ArrowRight, Star } from 'lucide-react'
import SafeImage from './SafeImage'

export default function About() {
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
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 bg-[#FFFDF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image Column — appears below text on mobile */}
          <div className="reveal-left relative order-2 lg:order-1 mt-8 sm:mt-0">
            {/* Main image */}
            <div className="img-zoom relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/5' }}>
              <SafeImage
                src="/images/about.jpg"
                fallbackSrc="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85&auto=format&fit=crop"
                alt="Beautifully decorated event stage with floral arrangements by Srivari Decorators"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#27002F]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating review card — positioned safely for all screens */}
            <div
              className="reveal-scale delay-300 absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-4 lg:-right-8 bg-white rounded-xl shadow-2xl p-4 sm:p-5"
              style={{ border: '1px solid rgba(214,180,106,0.3)', maxWidth: '185px', zIndex: 10 }}
            >
              <div className="flex items-center gap-1 mb-1.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={10} className="fill-[#D6B46A] text-[#D6B46A]" />
                ))}
              </div>
              <p className="text-[#27002F] text-xs font-semibold leading-snug">"They made our wedding day truly magical!"</p>
              <p className="text-[#7200A8] text-[10px] mt-1.5 font-medium">— Happy Client</p>
            </div>

            {/* Decorative glow */}
            <div
              className="absolute -top-8 -left-8 w-28 h-28 rounded-full opacity-15 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #7200A8, transparent)' }}
              aria-hidden="true"
            />
          </div>

          {/* Text Column */}
          <div className="order-1 lg:order-2 flex flex-col gap-5 sm:gap-6">
            <div className="reveal delay-100">
              <div className="ornament-divider justify-start mb-4 sm:mb-5">
                <span className="text-[#D6B46A] text-xs tracking-[0.2em] uppercase font-medium">Our Story</span>
              </div>
              <h2
                className="font-serif text-[#27002F] leading-[1.15] mb-3"
                style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', fontWeight: 600 }}
              >
                Creating Beautiful<br />
                <span style={{ color: '#7200A8' }}>Celebrations,</span> One<br />
                Moment at a Time.
              </h2>
            </div>

            <div className="reveal delay-200">
              <p className="text-[#4a3050] text-sm sm:text-base leading-relaxed">
                Based in the heart of Coimbatore, Srivari Decorators is a full-service event experience company bringing together <strong>creative event styling</strong>, professional sound and decor, and exceptional catering — all under one dedicated team.
              </p>
            </div>

            <div className="reveal delay-300">
              <p className="text-[#4a3050] text-sm sm:text-base leading-relaxed">
                Whether you're planning an intimate engagement ceremony, a grand wedding celebration, a festive birthday gathering, or a corporate event, we are committed to turning your vision into a breathtaking reality — with attention to every detail that makes your occasion truly yours.
              </p>
            </div>

            {/* Feature pills */}
            <div className="reveal delay-400 flex flex-wrap gap-2 sm:gap-3 mt-1">
              {['Event Planning', 'Stage Decorations', 'Sound & Lighting', 'Catering Services', 'Floral Design'].map((feat) => (
                <span
                  key={feat}
                  className="text-xs font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border"
                  style={{
                    borderColor: 'rgba(114,0,168,0.25)',
                    color: '#7200A8',
                    backgroundColor: 'rgba(114,0,168,0.06)',
                  }}
                >
                  {feat}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="reveal delay-500">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-3 text-[#7200A8] font-semibold text-sm transition-all duration-300 mt-1"
              >
                Discover Our Services
                <span className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#7200A8] group-hover:bg-[#7200A8] group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <ArrowRight size={15} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
