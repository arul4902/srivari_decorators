import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { processChat } from './server/chatCore.ts'

function aiChatDevPlugin(): Plugin {
  return {
    name: 'ai-chat-dev-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/health' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            ok: true,
            hasKey: !!process.env.GEMINI_API_KEY,
            model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
          }))
          return
        }

        if (req.url === '/api/chat' && req.method === 'POST') {
          let bodyData = ''
          req.on('data', (chunk: Buffer) => { bodyData += chunk.toString() })
          req.on('end', async () => {
            try {
              const body = JSON.parse(bodyData || '{}')
              const { message, sessionId, apiKey } = body
              if (!message || !sessionId) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'message and sessionId are required' }))
                return
              }
              const result = await processChat({ message, sessionId, apiKey })
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(result))
            } catch (err: unknown) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              const msg = err instanceof Error ? err.message : 'Server error'
              res.end(JSON.stringify({ error: msg }))
            }
          })
          return
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    aiChatDevPlugin(),
  ],
})
