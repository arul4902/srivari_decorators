import { useState, useEffect, useRef, type FormEvent } from 'react'
import { MapPin, Phone, Send, CheckCircle } from 'lucide-react'

const WA_NUMBER = '919003607680'

const eventTypes = [
  'Wedding',
  'Engagement',
  'Birthday',
  'Baby Shower',
  'Corporate Event',
  'Anniversary',
  'Other',
]

interface FormData {
  name: string
  phone: string
  eventType: string
  eventDate: string
  message: string
}

function getTodayDateString(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right')
              .forEach((el) => el.classList.add('revealed'))
          }
        })
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const todayStr = getTodayDateString()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setErrorMsg(null)
    const { name, value } = e.target

    if (name === 'eventDate' && value) {
      if (value < todayStr) {
        setErrorMsg('Please select a current or upcoming date for your event.')
        setForm((prev) => ({ ...prev, eventDate: '' }))
        return
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setErrorMsg('Please enter your name.')
      return
    }
    if (!form.phone.trim() || !/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) {
      setErrorMsg('Please enter a valid phone number.')
      return
    }
    if (!form.eventType) {
      setErrorMsg('Please select an event type.')
      return
    }
    if (form.eventDate && form.eventDate < todayStr) {
      setErrorMsg('Event date cannot be in the past. Please select an upcoming date.')
      return
    }

    const msg = encodeURIComponent(
      `Hello Srivari Decorators! I'd like to enquire about an event.\n\n` +
      `*Name:* ${form.name.trim()}\n` +
      `*Phone:* ${form.phone.trim()}\n` +
      `*Event Type:* ${form.eventType}\n` +
      (form.eventDate ? `*Event Date:* ${form.eventDate}\n` : '') +
      (form.message ? `*Message:* ${form.message.trim()}` : '')
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    setErrorMsg(null)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', phone: '', eventType: '', eventDate: '', message: '' })
    }, 5000)
  }

  const inputClass = `w-full bg-white/5 border border-white/15 text-white placeholder:text-white/35 px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#D6B46A]/60 focus:ring-1 focus:ring-[#D6B46A]/30 transition-all duration-300 text-sm`

  return (
    <section id="contact" ref={sectionRef} className="py-24 lg:py-36 overflow-hidden" style={{ backgroundColor: '#1c0025' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="ornament-divider mb-5">
            <span className="text-[#D6B46A] text-xs tracking-[0.2em] uppercase">Get In Touch</span>
          </div>
          <h2
            className="font-serif text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 600 }}
          >
            Plan Your <span className="text-shimmer">Special Event</span>
          </h2>
          <p className="text-white/55 mt-4 max-w-md mx-auto">
            Share your vision with us and we'll help you bring it to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Contact Info Column */}
          <div className="reveal-left flex flex-col gap-8">

            {/* Info cards */}
            <div className="flex flex-col gap-5">
              {/* Address */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D6B46A]/30 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-[#7200A8]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7200A8]/50 transition-colors">
                  <MapPin size={20} className="text-[#D6B46A]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Our Location</p>
                  <p className="text-white font-medium text-sm leading-relaxed">
                    Thiruvalluvar Nagar, Thadagam Road,<br />Coimbatore – 641108
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Thiruvalluvar+Nagar+Thadagam+Road+Coimbatore+641108"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D6B46A] text-xs mt-1.5 inline-block hover:underline"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              {/* Phone */}
              <a
                href="tel:+919003607680"
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D6B46A]/30 transition-all duration-300 group"
                aria-label="Call Srivari Decorators"
              >
                <div className="w-11 h-11 rounded-xl bg-[#E50065]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E50065]/40 transition-colors">
                  <Phone size={20} className="text-[#E50065]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                  <p className="text-white font-semibold">+91 90036 07680</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/srivari_decorators/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D6B46A]/30 transition-all duration-300 group"
                aria-label="Visit Srivari Decorators on Instagram"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center flex-shrink-0 group-hover:from-purple-600/50 group-hover:to-pink-600/50 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Instagram</p>
                  <p className="text-white font-semibold">@srivari_decorators</p>
                </div>
              </a>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-white/10" style={{ height: '240px' }}>
              <iframe
                title="Srivari Decorators location map"
                src="https://www.google.com/maps?q=Thiruvalluvar+Nagar,+Thadagam+Road,+Coimbatore+641108&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Form Column */}
          <div className="reveal-right">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 sm:p-9">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-5">
                  <CheckCircle size={56} className="text-[#25D366]" />
                  <div>
                    <h3 className="text-white font-serif text-2xl font-semibold mb-2">Enquiry Sent!</h3>
                    <p className="text-white/60 text-sm">We've opened WhatsApp with your details. We'll respond shortly!</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <h3 className="font-serif text-white text-2xl font-semibold mb-1">Send an Enquiry</h3>
                  <p className="text-white/45 text-sm mb-2">Fill in the form and we'll connect you via WhatsApp.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Phone *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="eventType" className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Event Type *</label>
                      <select
                        id="eventType"
                        name="eventType"
                        required
                        value={form.eventType}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none cursor-pointer`}
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="" disabled>Select event type</option>
                        {eventTypes.map((t) => (
                          <option key={t} value={t} style={{ background: '#27002F' }}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="eventDate" className="block text-white/60 text-xs uppercase tracking-wider">
                          Event Date
                        </label>
                        <span className="text-[#D6B46A]/80 text-[10px] tracking-wider uppercase font-medium">
                          Upcoming dates
                        </span>
                      </div>
                      <input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        min={todayStr}
                        value={form.eventDate}
                        onChange={handleChange}
                        className={inputClass}
                        style={{ colorScheme: 'dark' }}
                        aria-label="Event Date (current or future dates only)"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your event vision, guest count, venue..."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {errorMsg && (
                    <div className="bg-red-500/20 border border-red-500/40 text-red-200 text-xs px-3.5 py-2 rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-400 hover:scale-[1.02] shadow-lg hover:shadow-xl mt-1"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send Enquiry via WhatsApp
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
