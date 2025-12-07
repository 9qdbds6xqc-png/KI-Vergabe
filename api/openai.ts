import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;

const allowOrigin = (origin?: string): string => {
  if (!origin) return '*';
  const normalized = origin.replace(/\/$/, '');
  if (
    normalized.includes('praetorium.tech') ||
    normalized.includes('ki-vergabe.de') ||
    normalized.includes('trafosanf-remake.vercel.app') ||
    normalized.includes('localhost') ||
    normalized.includes('github.io')
  ) {
    return normalized;
  }
  return '*';
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin =
    (Array.isArray(req.headers.origin) ? req.headers.origin[0] : req.headers.origin) ||
    (Array.isArray(req.headers.referer) ? req.headers.referer[0] : req.headers.referer);

  res.setHeader('Access-Control-Allow-Origin', allowOrigin(origin));
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { question, context, chatHistory = [], sourceUrl } = body || {};

    if (!question || !context) {
      return res.status(400).json({ error: 'question and context are required.' });
    }

    const urlDescriptor = sourceUrl ? `Website URL: ${sourceUrl}` : 'Website URL: nicht angegeben';
    const systemPrompt = `You are a precise assistant that answers questions STRICTLY based on the provided website content.

${urlDescriptor}

CRITICAL RULES:
1. ONLY use facts from the provided website content.
2. If the user asks anything outside of this content, respond with: "Ich kann nur Informationen aus der angegebenen Website wiedergeben."
3. Do NOT invent or infer details that are not explicitly present in the website text.
4. Keep answers clear, structured, and under 300 words while mirroring the user's language (German/English).
5. If pricing is requested and the website text does not include pricing, answer with: "Preisinformationen können Sie über unser Kontaktformular anfordern."`;

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt },
    ];

    if (chatHistory.length > 0) {
      const trimmed = chatHistory.slice(-4);
      messages.push(
        ...trimmed.map((entry: ChatMessage) => ({
          role: entry.role,
          content: entry.content,
        })),
      );
    }

    messages.push({
      role: 'user',
      content: `Website content:\n\n${context}\n\n\nQuestion: ${question}`,
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      return res.status(response.status).json({
        error: errorText || 'OpenAI request failed',
      });
    }

    const data = await response.json();
    const answer =
      data.choices?.[0]?.message?.content ||
      'Entschuldigung, ich konnte keine Antwort generieren.';

    return res.status(200).json({ answer });
  } catch (error) {
    console.error('OpenAI proxy error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

