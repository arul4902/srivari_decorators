// Srivari Decorators – AI Chat API Server
// Uses Express + @google/genai (Interactions API)
// Run: npm run server

import express from 'express'
import cors from 'cors'
import { processChat } from './chatCore.ts'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: '*' }))
app.use(express.json({ limit: '10kb' }))

// ── Chat endpoint ─────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  const { message, sessionId, apiKey } = req.body

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' })
  }
  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'sessionId is required' })
  }

  try {
    const result = await processChat({ message, sessionId, apiKey })
    return res.json(result)
  } catch (err: unknown) {
    console.error('[Chat API Error]', err)
    return res.status(500).json({ error: 'Server error processing request.' })
  }
})

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    hasKey: !!process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
  })
})

app.listen(PORT, () => {
  console.log(`\n🟣 Srivari AI API  →  http://localhost:${PORT}`)
  console.log(`   Model:  ${process.env.GEMINI_MODEL || 'gemini-3.8-flash'}`)
  console.log(`   Health: http://localhost:${PORT}/api/health\n`)
})
