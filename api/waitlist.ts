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
            <!DOCTYPE html>
            <html lang="en">
            <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
            <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f5; padding: 40px 16px;">
                <tr>
                  <td align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 480px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">

                      <!-- Header bar -->
                      <tr>
                        <td style="background-color: #09090b; padding: 28px 36px;">
                          <!-- Logo: SVG circle + Fine Me wordmark -->
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="vertical-align: middle; padding-right: 10px;">
                                <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="14" cy="14" r="11" fill="none" stroke="#bef264" stroke-width="2.5"/>
                                </svg>
                              </td>
                              <td style="vertical-align: middle;">
                                <span style="font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: -1px; line-height: 1;">Fine</span><span style="font-size: 20px; font-weight: 300; color: #ffffff; letter-spacing: -1px; line-height: 1; margin-left: 2px;">Me</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Body -->
                      <tr>
                        <td style="padding: 40px 36px 32px;">
                          <h1 style="font-size: 26px; font-weight: 900; color: #09090b; letter-spacing: -0.5px; margin: 0 0 12px; line-height: 1.2;">You're on the list.</h1>
                          <p style="font-size: 16px; color: #52525b; line-height: 1.7; margin: 0 0 28px;">
                            We'll email you the moment FineMe launches.<br>No spam — just one email when we go live.
                          </p>

                          <!-- Accent callout -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="background-color: #f4f4f5; border-left: 3px solid #bef264; border-radius: 4px; padding: 16px 20px;">
                                <p style="font-size: 14px; font-weight: 600; color: #09090b; margin: 0 0 4px;">Your commitment starts now.</p>
                                <p style="font-size: 13px; color: #71717a; margin: 0;">Miss your workout — pay your charity. We'll hold you to it.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="padding: 0 36px 36px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="border-top: 1px solid #e4e4e7; padding-top: 24px;">
                                <p style="font-size: 12px; color: #a1a1aa; margin: 0 0 4px;">In the meantime, your laziness is still untaxed. That changes soon.</p>
                                <p style="font-size: 12px; color: #d4d4d8; margin: 0;">
                                  <a href="https://fineme.io" style="color: #a1a1aa; text-decoration: none;">fineme.io</a>
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
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
