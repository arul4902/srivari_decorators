import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import WhyChooseUs from './components/WhyChooseUs'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Chatbot from './components/Chatbot'

function App() {
  useEffect(() => {
    // Global scroll-reveal observer – targets root-level reveal elements
    const revealClasses = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale']

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )

    const selector = revealClasses.map((c) => `.${c}`).join(', ')
    const attach = () => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains('revealed')) observer.observe(el)
      })
    }

    // Initial attach after mount
    attach()

    // Re-attach on any DOM changes (dynamic content)
    const mutationObs = new MutationObserver(attach)
    mutationObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObs.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#FFFDF8' }}>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <WhyChooseUs />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </div>
  )
}

export default App
