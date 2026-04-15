import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a scam detection assistant. Return "likely_scam" or "not_scam".',
        },
        {
          role: 'user',
          content: `Message: "${message}". Is this a scam?`,
        },
      ],
    });

    const reply = completion.choices[0].message.content || '';

    const isScam = reply.toLowerCase().includes('likely') || reply.toLowerCase().includes('scam');

    res.status(200).json({ result: isScam ? 'likely_scam' : 'not_scam' });
  } catch (error) {
    res.status(500).json({ error: 'AI detection failed.' });
  }
}
