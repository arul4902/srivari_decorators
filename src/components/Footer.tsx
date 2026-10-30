import { MapPin, Phone, ArrowRight } from 'lucide-react'
import Logo from './Logo'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  'Event Planning',
  'Stage Decorations',
  'Floral Design',
  'Sound & Lighting',
  'Catering Services',
]

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  const handleNavClick = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ backgroundColor: '#0f0015' }} role="contentinfo">
      {/* Gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D6B46A] to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <a href="#home" className="inline-flex items-center group">
              <Logo size="md" />
            </a>
            <p className="text-white/45 text-sm leading-relaxed max-w-[220px]">
              Coimbatore's trusted event planning, decoration, sound and catering specialists.
            </p>
            <a
              href="https://www.instagram.com/srivari_decorators/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#D6B46A] text-sm hover:text-white transition-colors group"
              aria-label="Follow us on Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <span>@srivari_decorators</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-white/70 text-xs tracking-[0.2em] uppercase mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-3" role="list">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(l.href) }}
                    className="text-white/45 text-sm hover:text-[#D6B46A] transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="text-white/70 text-xs tracking-[0.2em] uppercase mb-5">Our Services</h3>
            <ul className="flex flex-col gap-3" role="list">
              {services.map((s) => (
                <li key={s} className="text-white/45 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/70 text-xs tracking-[0.2em] uppercase mb-5">Contact</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#D6B46A] flex-shrink-0 mt-0.5" />
                <p className="text-white/45 text-sm leading-relaxed">
                  Thiruvalluvar Nagar, Thadagam Road,<br />Coimbatore – 641108
                </p>
              </div>
              <a
                href="tel:+919003607680"
                className="flex items-center gap-3 text-white/45 hover:text-[#D6B46A] text-sm transition-colors"
                aria-label="Call +91 90036 07680"
              >
                <Phone size={15} className="text-[#D6B46A] flex-shrink-0" />
                +91 90036 07680
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs text-center sm:text-left">
            © {CURRENT_YEAR} Srivari Decorators. All rights reserved.
          </p>
          <p className="text-white/15 text-xs">
            Coimbatore, Tamil Nadu, India
          </p>
        </div>
      </div>
    </footer>
  )
}
