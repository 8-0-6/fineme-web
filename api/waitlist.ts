import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Basic validation
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  try {
    // Send both emails in parallel
    await Promise.all([
      // 1. Notify you
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'FineMe <team@fineme.io>',
          to: 'team@fineme.io',
          subject: `New waitlist signup: ${email}`,
          html: `
            <div style="font-family: monospace; background: #000; color: #fff; padding: 32px; border-radius: 12px;">
              <p style="color: #bef264; font-weight: 900; font-size: 18px; margin: 0 0 16px;">New waitlist signup</p>
              <p style="color: #a1a1aa; margin: 0;">Email: <span style="color: #fff;">${email}</span></p>
              <p style="color: #71717a; font-size: 12px; margin: 16px 0 0;">${new Date().toUTCString()}</p>
            </div>
          `,
        }),
      }),

      // 2. Confirm to the user
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'FineMe <team@fineme.io>',
          to: email,
          subject: "You're on the FineMe waitlist.",
          html: `
            <div style="font-family: -apple-system, sans-serif; background: #000; color: #fff; padding: 48px 32px; max-width: 480px; margin: 0 auto;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 40px;">
                <div style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #bef264;"></div>
                <span style="font-weight: 900; font-size: 18px; letter-spacing: -1px;">Fine<span style="font-weight: 300;">Me</span></span>
              </div>

              <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -0.5px; margin: 0 0 12px;">You're on the list.</h1>
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 32px;">
                We'll email you the moment FineMe launches. No spam, just one email when we're live.
              </p>

              <div style="border-top: 1px solid #27272a; padding-top: 24px;">
                <p style="color: #71717a; font-size: 13px; margin: 0;">
                  In the meantime, your laziness is still untaxed. That changes soon.
                </p>
              </div>
            </div>
          `,
        }),
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
