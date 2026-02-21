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
    // Send emails sequentially to stay within Resend's 2 req/sec rate limit
    // 1. Notify you
    const notifyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FineMe <team@fineme.io>',
        to: 'team@fineme.io',
        subject: `New waitlist signup: ${email}`,
        html: `<div style="font-family: monospace; background: #000; color: #fff; padding: 32px;"><p style="color: #bef264; font-weight: 900; font-size: 18px; margin: 0 0 16px;">New waitlist signup</p><p style="color: #a1a1aa; margin: 0;">Email: <span style="color: #fff;">${email}</span></p><p style="color: #71717a; font-size: 12px; margin: 16px 0 0;">${new Date().toUTCString()}</p></div>`,
      }),
    });

    // 2. Confirm to the user
    const confirmRes = await fetch('https://api.resend.com/emails', {
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
            <!DOCTYPE html>
            <html lang="en">
            <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
            <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f5; padding: 40px 16px;">
                <tr>
                  <td align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 480px; background-color: #ffffff; border-radius: 16px; overflow: hidden;">

                      <!-- Black header banner with logo -->
                      <tr>
                        <td style="background-color: #000000; padding: 24px 32px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <!-- Circle: using border-radius div since SVG is stripped by Gmail -->
                              <td style="padding-right: 8px; vertical-align: middle; line-height: 1;">
                                <div style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid #bef264; display: inline-block; vertical-align: middle; font-size: 0; line-height: 20px;">&#8203;</div>
                              </td>
                              <!-- Fine (bold) Me (light) wordmark -->
                              <td style="vertical-align: middle; line-height: 1;">
                                <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 19px; font-weight: 900; color: #ffffff; letter-spacing: -1px; vertical-align: middle;">Fine</span><span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 19px; font-weight: 300; color: #ffffff; letter-spacing: -1px; padding-left: 2px; vertical-align: middle;">Me</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- White body -->
                      <tr>
                        <td style="background-color: #ffffff; padding: 40px 32px 32px;">
                          <h1 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 26px; font-weight: 900; color: #000000; letter-spacing: -0.5px; margin: 0 0 16px; line-height: 1.2;">You're on the list.</h1>
                          <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 16px; color: #3f3f46; line-height: 1.7; margin: 0;">
                            We'll email you the moment FineMe launches. No spam, just one email when we're live.
                          </p>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #ffffff; padding: 0 32px 36px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="border-top: 1px solid #e4e4e7; padding-top: 20px;">
                                <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #71717a; margin: 0;">
                                  In the meantime, your laziness is still untaxed. That changes soon.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        }),
    });

    // Log responses for debugging
    const notifyBody = await notifyRes.json().catch(() => ({}));
    const confirmBody = await confirmRes.json().catch(() => ({}));
    console.log('Notify response:', notifyRes.status, JSON.stringify(notifyBody));
    console.log('Confirm response:', confirmRes.status, JSON.stringify(confirmBody));

    if (!notifyRes.ok || !confirmRes.ok) {
      return res.status(500).json({
        error: 'Email send failed',
        notify: notifyBody,
        confirm: confirmBody,
      });
    }

    // Save contact after emails succeed (delayed to respect rate limit)
    setTimeout(() => {
      fetch('https://api.resend.com/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      }).catch((err) => console.error('Contact save failed (non-fatal):', err));
    }, 1500);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email', detail: String(err) });
  }
}
