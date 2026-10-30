import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Send, Sparkles, ChevronDown, Phone, Calendar, MapPin, Users, User, Tag } from 'lucide-react'

const WA_NUMBER = '919003607680'

type Role = 'user' | 'assistant'

interface Message {
  id: string
  role: Role
  text: string
  ts: Date
  isTyping?: boolean
}

interface EnquiryData {
  name?: string
  eventType?: string
  eventDate?: string
  location?: string
  guestCount?: string
  services?: string
  phone?: string
}

const SUGGESTED_CHIPS = [
  'Wedding Decorations',
  'Birthday Decorations',
  'Engagement Events',
  'Sound & Decor Services',
  'Catering Enquiries',
  'Contact Srivari',
]

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  text: `Vanakkam & Welcome to Srivari Decorators! ✨\n\nI'm your virtual event designer for Coimbatore celebrations. Whether you're planning a grand wedding, an intimate engagement, or a birthday, I'm here to assist with decor, sound, and catering.\n\nWhat kind of celebration are you planning?`,
  ts: new Date(),
}

function genId() {
  return Math.random().toString(36).slice(2, 10)
}

function formatTime(d: Date) {
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

const SESSION_ID = `sd_${Date.now()}_${Math.random().toString(36).slice(2)}`

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [minimised, setMinimised] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [enquiry, setEnquiry] = useState<EnquiryData>({})
  const [showEnquiryCard, setShowEnquiryCard] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  // Show badge hint after 3.5s
  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 3500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 250)
    }
  }, [open, minimised])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const addMessage = useCallback((role: Role, text: string): string => {
    const id = genId()
    setMessages((prev) => [...prev, { id, role, text, ts: new Date() }])
    return id
  }, [])

  const updateMessage = useCallback((id: string, text: string) => {
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, text, isTyping: false } : m))
  }, [])

  // Smart Entity Extractor for the Enquiry Card
  const extractEntities = (text: string) => {
    const lower = text.toLowerCase()
    const updates: Partial<EnquiryData> = {}

    // Event type
    if (lower.includes('wedding') || lower.includes('marriage') || lower.includes('mandap') || lower.includes('kalyanam')) {
      updates.eventType = 'Wedding'
    } else if (lower.includes('engagement') || lower.includes('nichayathartham')) {
      updates.eventType = 'Engagement'
    } else if (lower.includes('birthday') || lower.includes('bday')) {
      updates.eventType = 'Birthday'
    } else if (lower.includes('baby shower') || lower.includes('seemantham')) {
      updates.eventType = 'Baby Shower'
    } else if (lower.includes('corporate') || lower.includes('conference')) {
      updates.eventType = 'Corporate Event'
    }

    // Phone number
    const phoneMatch = text.match(/\b[6-9]\d{9}\b/)
    if (phoneMatch) updates.phone = phoneMatch[0]

    // Guests
    const guestMatch = text.match(/(\d{2,5})\s*(guests?|people|pax|members?)/i)
    if (guestMatch) updates.guestCount = guestMatch[1]

    // Location
    const coimbatoreLocations = ['thadagam', 'rs puram', 'peelamedu', 'gandhipuram', 'saibaba colony', 'saravanampatti', 'ramanathapuram', 'singanallur', 'vadavalli', 'pollachi', 'mettupalayam', 'coimbatore']
    for (const loc of coimbatoreLocations) {
      if (lower.includes(loc)) {
        updates.location = loc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        break
      }
    }

    // Date
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    for (const m of months) {
      if (lower.includes(m)) {
        const dateMatch = text.match(new RegExp(`(\\d{1,2})?(st|nd|rd|th)?\\s*(${m})\\s*(\\d{4})?`, 'i'))
        if (dateMatch) updates.eventDate = dateMatch[0]
        break
      }
    }

    // Name
    const nameMatch = text.match(/(?:my name is|i am|this is|call me)\s+([A-Za-z]{2,20})/i)
    if (nameMatch) updates.name = nameMatch[1]

    if (Object.keys(updates).length > 0) {
      setEnquiry(prev => ({ ...prev, ...updates }))
      setShowEnquiryCard(true)
    }
  }

  const sendToAPI = useCallback(async (userMessage: string) => {
    setLoading(true)
    const typingId = genId()
    setMessages((prev) => [...prev, { id: typingId, role: 'assistant', text: '...', ts: new Date(), isTyping: true }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId: SESSION_ID,
        }),
        signal: AbortSignal.timeout(20000),
      })

      const data = await res.json()
      if (res.ok && data.reply) {
        updateMessage(typingId, data.reply)
      } else {
        // Natural fallback
        updateMessage(typingId, data.error || "Thank you for sharing! Could you let me know your preferred event date and approximate guest count?")
      }
    } catch {
      // Local natural response
      const lower = userMessage.toLowerCase()
      let fallbackText = "Thank you for reaching out! Srivari Decorators provides complete Event Planning & Styling, Sound & Lighting, and Catering across Coimbatore. Could you share your expected date and guest count?"
      if (lower.includes('wedding') || lower.includes('mandap')) {
        fallbackText = "We craft grand floral mandaps, entrance pathways, and romantic lighting tailored to your venue! Could you share your tentative wedding date and approximate guest count?"
      } else if (lower.includes('birthday')) {
        fallbackText = "We create themed stage setups, balloon arches, customized backdrops, and party sound! What theme and date do you have in mind?"
      } else if (lower.includes('cater') || lower.includes('food')) {
        fallbackText = "Srivari Caterings delivers authentic traditional South Indian banana-leaf feasts as well as multi-cuisine buffets. Approximately how many guests will you be hosting?"
      } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('address')) {
        fallbackText = "You can reach Srivari Decorators directly:\n📍 Thiruvalluvar Nagar, Thadagam Road, Coimbatore – 641108\n📞 Phone & WhatsApp: +91 90036 07680\n📸 Instagram: @srivari_decorators"
      }
      updateMessage(typingId, fallbackText)
    } finally {
      setLoading(false)
    }
  }, [updateMessage])

  const handleSend = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || loading) return

    setInput('')
    addMessage('user', msg)
    extractEntities(msg)
    await sendToAPI(msg)
  }, [input, loading, addMessage, sendToAPI])

  const handleChip = (chip: string) => handleSend(chip)

  const handleWhatsAppEnquiry = () => {
    const parts = [
      `Hello Srivari Decorators! I would like to plan an event:`,
      enquiry.eventType ? `• Event Type: ${enquiry.eventType}` : '',
      enquiry.name ? `• Name: ${enquiry.name}` : '',
      enquiry.eventDate ? `• Preferred Date: ${enquiry.eventDate}` : '',
      enquiry.location ? `• Location: ${enquiry.location}` : '',
      enquiry.guestCount ? `• Approximate Guests: ${enquiry.guestCount}` : '',
      enquiry.phone ? `• Contact: ${enquiry.phone}` : '',
    ].filter(Boolean).join('\n')

    const msg = encodeURIComponent(parts || "Hello Srivari Decorators! I would like to plan an event with your team.")
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  const isOpen = open && !minimised

  return (
    <>
      {/* ── Chat Window ───────────────────────────────────────────────────── */}
      <div
        ref={chatRef}
        className={`fixed z-[70] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{
          bottom: '16px',
          right: '16px',
          width: 'min(400px, calc(100vw - 32px))',
          maxHeight: 'calc(100dvh - 32px)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Srivari AI Assistant"
      >
        <div
          className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border"
          style={{
            background: '#190022',
            borderColor: 'rgba(214,180,106,0.3)',
            maxHeight: 'calc(100dvh - 32px)',
            height: 'min(620px, calc(100dvh - 32px))',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #27002F 0%, #3e0052 100%)',
              borderBottom: '1px solid rgba(214,180,106,0.2)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7200A8] to-[#E50065] flex items-center justify-center flex-shrink-0 shadow-md">
                <Sparkles size={16} className="text-[#D6B46A]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight flex items-center gap-1.5">
                  Srivari AI Assistant
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[#D6B46A] text-[10px] tracking-wide font-medium">
                    Online · Event Specialist
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimised(true)}
                className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Minimise"
              >
                <ChevronDown size={17} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Interactive Live Event Details Card */}
          {showEnquiryCard && Object.values(enquiry).some(Boolean) && (
            <div
              className="px-3.5 py-2.5 mx-3 mt-2 rounded-xl flex flex-col gap-2 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(114,0,168,0.25) 0%, rgba(39,0,47,0.5) 100%)',
                border: '1px solid rgba(214,180,106,0.3)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#D6B46A] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={12} /> Event Planning Summary
                </span>
                <button
                  onClick={() => setEnquiry({})}
                  className="text-[10px] text-white/40 hover:text-white"
                >
                  Clear
                </button>
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-white/80">
                {enquiry.eventType && (
                  <div className="flex items-center gap-1 truncate">
                    <Tag size={11} className="text-[#D6B46A] flex-shrink-0" />
                    <span className="truncate">{enquiry.eventType}</span>
                  </div>
                )}
                {enquiry.name && (
                  <div className="flex items-center gap-1 truncate">
                    <User size={11} className="text-[#D6B46A] flex-shrink-0" />
                    <span className="truncate">{enquiry.name}</span>
                  </div>
                )}
                {enquiry.eventDate && (
                  <div className="flex items-center gap-1 truncate">
                    <Calendar size={11} className="text-[#D6B46A] flex-shrink-0" />
                    <span className="truncate">{enquiry.eventDate}</span>
                  </div>
                )}
                {enquiry.location && (
                  <div className="flex items-center gap-1 truncate">
                    <MapPin size={11} className="text-[#D6B46A] flex-shrink-0" />
                    <span className="truncate">{enquiry.location}</span>
                  </div>
                )}
                {enquiry.guestCount && (
                  <div className="flex items-center gap-1 truncate">
                    <Users size={11} className="text-[#D6B46A] flex-shrink-0" />
                    <span>{enquiry.guestCount} Guests</span>
                  </div>
                )}
                {enquiry.phone && (
                  <div className="flex items-center gap-1 truncate col-span-2">
                    <Phone size={11} className="text-[#25D366] flex-shrink-0" />
                    <span>{enquiry.phone}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full mt-1 bg-[#25D366] hover:bg-[#1fa952] text-white font-medium py-1.5 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow transition-all hover:scale-[1.01]"
              >
                Send to Srivari on WhatsApp →
              </button>
            </div>
          )}

          {/* Messages stream */}
          <div className="flex-1 overflow-y-auto px-4 py-3.5 flex flex-col gap-3 min-h-0" style={{ scrollbarWidth: 'thin' }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7200A8] to-[#E50065] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 shadow-sm">
                    <Sparkles size={11} className="text-[#D6B46A]" />
                  </div>
                )}
                <div style={{ maxWidth: '82%' }}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      msg.role === 'user'
                        ? 'rounded-tr-sm text-white'
                        : 'rounded-tl-sm text-white/95'
                    } ${msg.isTyping ? 'animate-pulse' : ''}`}
                    style={{
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg, #7200A8, #E50065)'
                        : 'rgba(255,255,255,0.08)',
                      border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.09)' : 'none',
                    }}
                  >
                    {msg.isTyping ? (
                      <span className="flex gap-1.5 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6B46A] animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6B46A] animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6B46A] animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    ) : (
                      msg.text
                    )}
                  </div>
                  <p className={`text-[10px] mt-1 text-white/35 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {formatTime(msg.ts)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick chip queries */}
          {messages.filter(m => m.role === 'user').length === 0 && (
            <div className="px-3.5 pb-2.5 flex flex-wrap gap-1.5 flex-shrink-0">
              {SUGGESTED_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChip(chip)}
                  disabled={loading}
                  className="text-xs px-2.5 py-1 rounded-full border transition-all duration-200 hover:scale-105 disabled:opacity-50"
                  style={{
                    borderColor: 'rgba(214,180,106,0.3)',
                    color: '#D6B46A',
                    background: 'rgba(214,180,106,0.08)',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Direct call & WhatsApp bar */}
          <div className="px-3.5 pb-2.5 flex gap-2 flex-shrink-0">
            <a
              href="tel:+919003607680"
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all"
            >
              <Phone size={12} className="text-[#D6B46A]" /> Call +91 90036 07680
            </a>
            <button
              onClick={handleWhatsAppEnquiry}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: 'rgba(37,211,102,0.18)', color: '#25D366', border: '1px solid rgba(37,211,102,0.3)' }}
            >
              WhatsApp Us
            </button>
          </div>

          {/* Input Box */}
          <div
            className="px-3.5 py-3 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Ask about weddings, decor, catering, dates..."
                maxLength={500}
                disabled={loading}
                className="flex-1 bg-white/5 border border-white/15 text-white text-sm px-3.5 py-2.5 rounded-xl placeholder:text-white/35 focus:outline-none focus:border-[#D6B46A]/50 transition-all min-w-0"
                aria-label="Your message"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-105 disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #7200A8, #E50065)' }}
                aria-label="Send"
              >
                <Send size={15} className="text-white" />
              </button>
            </div>
            <p className="text-[9px] text-white/30 text-center mt-2">
              Srivari Decorators · Coimbatore Event Planning
            </p>
          </div>
        </div>
      </div>

      {/* ── Minimised Floating Bar ────────────────────────────────────────── */}
      {open && minimised && (
        <button
          onClick={() => setMinimised(false)}
          className="fixed z-[60] flex items-center gap-2.5 px-4 py-2 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
          style={{
            bottom: '76px',
            right: '20px',
            background: 'linear-gradient(135deg, #27002F, #3e0052)',
            border: '1px solid rgba(214,180,106,0.3)',
          }}
          aria-label="Expand Chat"
        >
          <Sparkles size={14} className="text-[#D6B46A]" />
          <span className="text-white text-xs font-medium">Srivari AI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
        </button>
      )}

      {/* ── Floating Action Button (FAB) ──────────────────────────────────── */}
      {!open && (
        <div className="fixed z-[60] flex flex-col items-end gap-2 bottom-[76px] sm:bottom-[88px] right-5 sm:right-6">
          {showBadge && (
            <div
              className="animate-fade-up hidden sm:block px-3 py-1.5 rounded-full text-[11px] font-medium text-white shadow-xl whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #27002F, #3e0052)',
                border: '1px solid rgba(214,180,106,0.3)',
                animationFillMode: 'forwards',
              }}
            >
              Plan Your Celebration ✨
            </div>
          )}
          <button
            onClick={() => {
              setOpen(true)
              setMinimised(false)
              setShowBadge(false)
            }}
            className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none"
            style={{
              background: 'linear-gradient(135deg, #7200A8 0%, #E50065 100%)',
              boxShadow: '0 8px 30px rgba(114,0,168,0.5)',
            }}
            aria-label="Open Srivari AI Assistant"
          >
            <Sparkles size={20} className="sm:w-[22px] sm:h-[22px] text-[#D6B46A]" />
          </button>
        </div>
      )}
    </>
  )
}
