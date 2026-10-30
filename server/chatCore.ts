import { GoogleGenAI } from '@google/genai'

export const SYSTEM_INSTRUCTION = `You are "Srivari AI Assistant", the official expert virtual event designer and planning assistant for Srivari Decorators, located in Thiruvalluvar Nagar, Thadagam Road, Coimbatore – 641108, Tamil Nadu.

BUSINESS CONTEXT:
- Business: Srivari Decorators
- Location: Thiruvalluvar Nagar, Thadagam Road, Coimbatore – 641108
- Phone / WhatsApp: +91 95851 70410
- Instagram: @srivari_decorators (https://www.instagram.com/srivari_decorators/)
- Core Divisions:
  1. Event Planning & Decorations (Stage styling, floral backdrops, theme arches, mandap decoration, entrance decor)
  2. Srivari Sounds & Decors (Professional JBL/line-array sound, wireless mics, stage wash lighting, sharpies, DJ consoles)
  3. Srivari Caterings (Traditional banana-leaf South Indian feasts, vegetarian & non-vegetarian spreads, buffet counters, welcome drinks, live dessert stalls)

COMMUNICATION STYLE:
- Warm, celebratory, professional, authentic to Coimbatore culture
- Keep answers concise (2-4 sentences max), conversational, and actionable
- End with a natural next step or question to help them plan
- Greet gracefully in English or Tamil ("Vanakkam", "Namaste")
- Never quote rigid prices or guarantee calendar slots without team confirmation. Always invite them to WhatsApp/call (+91 95851 70410) for exact quotes.

PROGRESSIVE INQUIRY CAPTURE:
When the visitor mentions an event, help gather:
- Client Name
- Event Type (Wedding, Engagement, Birthday, Baby Shower, Corporate, etc.)
- Preferred Date
- Venue or Location in Coimbatore
- Estimated Guest Count
- Services required (Decorations, Sound, Catering, or All-in-one)`

export const sessions = new Map<string, string>()

export function sanitizeInput(text: string): string {
  return text.trim().slice(0, 800)
}

// ── Comprehensive Coimbatore Event Planning NLP Brain ────────────────────────
export function generateIntelligentEventReply(message: string): string {
  const lower = message.toLowerCase()

  // Greetings
  if (/^(hi|hello|hey|vanakkam|namaste|good\s*(morning|evening|afternoon)|hola)\b/i.test(lower.trim())) {
    return "Vanakkam & Welcome to Srivari Decorators! ✨ I'm your dedicated event planning assistant in Coimbatore. Are you planning a wedding, engagement, birthday, or another celebration?"
  }

  // Weddings & Mandap
  if (lower.includes('wedding') || lower.includes('marriage') || lower.includes('mandap') || lower.includes('kalyanam') || lower.includes('reception')) {
    return "For weddings in Coimbatore, we craft bespoke floral mandaps, grand stage backdrops, entrance pathways, and romantic lighting tailored to your venue. Could you share your tentative wedding date, venue, and approximate guest count?"
  }

  // Engagements
  if (lower.includes('engagement') || lower.includes('nichayathartham') || lower.includes('ring')) {
    return "Engagements are deeply special milestones! We specialize in elegant pastel floral arches, circular ring backdrops, and intimate ambient lighting. Do you have a specific theme or color palette in mind?"
  }

  // Birthdays & Anniversaries
  if (lower.includes('birthday') || lower.includes('bday') || lower.includes('anniversary') || lower.includes('balloon') || lower.includes('baby shower') || lower.includes('seemantham')) {
    return "We create joyous celebrations with themed stage setups, balloon artistry, personalized backdrops, and complete party sound! What theme and date do you have in mind for the occasion?"
  }

  // Sound & Lighting
  if (lower.includes('sound') || lower.includes('audio') || lower.includes('speaker') || lower.includes('light') || lower.includes('dj') || lower.includes('mic')) {
    return "Srivari Sounds & Decors provides crystal-clear acoustics, line-array speakers, wireless microphones, and dynamic stage lighting (sharpies, LED par cans, and serial lights). How many guests and what type of venue are you planning for?"
  }

  // Catering & Food
  if (lower.includes('cater') || lower.includes('food') || lower.includes('lunch') || lower.includes('dinner') || lower.includes('breakfast') || lower.includes('menu') || lower.includes('feast') || lower.includes('veg') || lower.includes('non-veg')) {
    return "Srivari Caterings delivers authentic traditional South Indian banana-leaf feasts as well as multi-cuisine buffets, welcome beverages, and live dessert counters with uncompromising hygiene. Approximately how many guests will you be hosting?"
  }

  // Pricing & Budget
  if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('package') || lower.includes('budget') || lower.includes('how much') || lower.includes('charge')) {
    return "Every event is custom-designed according to your stage dimensions, floral selections, lighting requirements, and guest count. Our team provides fast, transparent customized quotes! You can chat with us directly on WhatsApp at +91 95851 70410 to discuss your budget."
  }

  // Contact / Address / Location
  if (lower.includes('contact') || lower.includes('phone') || lower.includes('number') || lower.includes('address') || lower.includes('location') || lower.includes('where') || lower.includes('office') || lower.includes('thadagam') || lower.includes('coimbatore')) {
    return "You can reach Srivari Decorators directly:\n📍 Thiruvalluvar Nagar, Thadagam Road, Coimbatore – 641108\n📞 Phone & WhatsApp: +91 95851 70410\n📸 Instagram: @srivari_decorators\nWould you like to speak with our planner right away?"
  }

  // Dates & Availability
  if (/\b(january|february|march|april|may|june|july|august|september|october|november|december|date|dates|availab|slot)\b/i.test(lower)) {
    return "Thank you for sharing your date! Popular auspicious dates book quickly in Coimbatore. Please click below to send your details directly via WhatsApp at +91 95851 70410 so our team can immediately check and reserve your slot."
  }

  // Name or Contact details given
  if (/\b[6-9]\d{9}\b/.test(lower) || lower.includes('my name is') || lower.includes('i am')) {
    return "Thank you so much! I have captured your details in your Event Card. Click the WhatsApp button below to instantly connect with our lead designer at +91 95851 70410 and finalize your decor plan."
  }

  return "Thank you for reaching out! Srivari Decorators provides complete Event Planning & Styling, Sound & Lighting, and Catering across Coimbatore. Could you tell me a little about the celebration you're planning?"
}

export async function processChat({
  message,
  sessionId,
  apiKey,
}: {
  message: string
  sessionId: string
  apiKey?: string
}): Promise<{ reply: string; liveAI: boolean }> {
  const clean = sanitizeInput(message)
  if (!clean) {
    throw new Error('Message cannot be empty')
  }

  const effectiveKey = apiKey || process.env.GEMINI_API_KEY

  if (effectiveKey) {
    try {
      const client = new GoogleGenAI({ apiKey: effectiveKey })
      const prevId = sessions.get(sessionId)
      const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash'

      const interaction = await client.interactions.create({
        model,
        input: clean,
        system_instruction: SYSTEM_INSTRUCTION,
        store: true,
        ...(prevId ? { previous_interaction_id: prevId } : {}),
      })

      const reply = interaction.output_text ?? generateIntelligentEventReply(clean)

      if (interaction.id) {
        sessions.set(sessionId, interaction.id)
        if (sessions.size > 500) {
          const firstKey = sessions.keys().next().value
          if (firstKey) sessions.delete(firstKey)
        }
      }

      return { reply, liveAI: true }
    } catch (err) {
      console.warn('[Gemini API call warning, falling back to Coimbatore Event NLP]', err)
    }
  }

  // Natural Coimbatore Event Planning NLP
  return {
    reply: generateIntelligentEventReply(clean),
    liveAI: false,
  }
}
