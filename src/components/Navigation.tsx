import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Track active section
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'gallery', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-solid' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
          className="flex items-center gap-2.5 group"
          aria-label="Srivari Decorators – Home"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7200A8] to-[#E50065] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Sparkles size={18} className="text-[#D6B46A]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-white font-semibold text-lg tracking-wide">Srivari</span>
            <span className="text-[#D6B46A] text-[10px] tracking-[0.2em] uppercase font-light">Decorators</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className={`text-sm tracking-wide transition-colors duration-300 relative pb-0.5 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-[#D6B46A]'
                    : 'text-white/80 hover:text-white'
                } after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[#D6B46A] after:transition-all after:duration-300 ${
                  activeSection === link.href.replace('#', '') ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            className="hidden sm:inline-flex items-center gap-2 bg-[#E50065] hover:bg-[#c2004f] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Sparkles size={14} />
            Plan Your Event
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-[-1] backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? 'max-h-[500px] opacity-100 shadow-2xl' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(39,0,47,0.98)', backdropFilter: 'blur(20px)' }}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <ul className="px-6 py-6 flex flex-col gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-[#7200A8]/30 text-[#D6B46A]'
                    : 'text-white/85 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
              className="flex items-center justify-center gap-2 bg-[#E50065] text-white py-3.5 px-6 rounded-full font-medium hover:bg-[#c2004f] transition-colors"
            >
              <Sparkles size={15} />
              Plan Your Event
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

