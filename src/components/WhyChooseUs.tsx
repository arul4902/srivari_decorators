import { useEffect, useRef } from 'react'
import { Palette, Speaker, UtensilsCrossed, MessageCircle } from 'lucide-react'

const benefits = [
  {
    icon: Palette,
    title: 'Creative Event Styling',
    description:
      'Every event gets a unique visual identity. We translate your ideas into stunning, personalised décor that leaves guests in awe.',
    accent: '#7200A8',
  },
  {
    icon: Speaker,
    title: 'Decoration & Sound',
    description:
      'Professional audio systems and beautiful ambient décor, together — so your event looks stunning and sounds perfect.',
    accent: '#E50065',
  },
  {
    icon: UtensilsCrossed,
    title: 'Catering Services',
    description:
      'Exceptional food crafted with care. Our catering team serves a range of traditional and contemporary menus, beautifully presented.',
    accent: '#D6B46A',
  },
  {
    icon: MessageCircle,
    title: 'Personalised Enquiries',
    description:
      'Your event, your vision. We listen, advise and plan around your unique needs — every enquiry receives personal attention.',
    accent: '#7200A8',
  },
]

export default function WhyChooseUs() {
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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFFDF8 0%, rgba(114,0,168,0.04) 50%, #FFFDF8 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="ornament-divider mb-5">
            <span className="text-[#D6B46A] text-xs tracking-[0.2em] uppercase font-medium">Why Srivari</span>
          </div>
          <h2
            className="font-serif text-[#27002F] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 600 }}
          >
            Why Choose<br />
            <span style={{ color: '#7200A8' }}>Srivari Decorators?</span>
          </h2>
          <p className="text-[#4a3050]/70 mt-5 max-w-xl mx-auto text-base leading-relaxed">
            From planning to presentation, we handle every detail — so you can simply enjoy your celebration.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <div
                key={b.title}
                className="reveal-scale group relative bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[#7200A8]/15"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                {/* Accent line */}
                <div
                  className="absolute top-0 left-8 right-8 h-0.5 rounded-b-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${b.accent}, transparent)` }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${b.accent}15` }}
                >
                  <Icon size={26} style={{ color: b.accent }} strokeWidth={1.5} />
                </div>

                <h3 className="font-serif text-[#27002F] text-xl font-semibold mb-3 leading-snug">
                  {b.title}
                </h3>
                <p className="text-[#4a3050]/70 text-sm leading-relaxed">
                  {b.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

