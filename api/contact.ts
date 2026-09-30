/**
 * Vercel serverless function: emails contact-form submissions via Resend.
 *
 * Required env (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY      API key from resend.com
 * Optional:
 *   CONTACT_TO_EMAIL    inbox that receives briefs (default hello@dpeluola.com)
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "Portfolio <site@dpeluola.com>"
 *                       (default Resend's onboarding sender, which only delivers to the Resend account owner)
 */

const MAX = { name: 120, email: 200, projectType: 80, budget: 80, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = Record<keyof typeof MAX, string> & { company?: string };

const json = (status: number, body: object) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export async function POST(request: Request): Promise<Response> {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return json(503, { error: 'Email service not configured' });

    let data: Partial<Payload>;
    try {
        data = await request.json();
    } catch {
        return json(400, { error: 'Invalid JSON' });
    }

    // Honeypot: real visitors never see or fill this field
    if (data.company) return json(200, { ok: true });

    const fields = {} as Record<keyof typeof MAX, string>;
    for (const key of Object.keys(MAX) as (keyof typeof MAX)[]) {
        const value = typeof data[key] === 'string' ? data[key]!.trim() : '';
        if (value.length > MAX[key]) return json(400, { error: `${key} is too long` });
        fields[key] = value;
    }
    if (!fields.name || !fields.message || !EMAIL_RE.test(fields.email)) {
        return json(400, { error: 'Name, a valid email and a message are required' });
    }

    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
            to: [process.env.CONTACT_TO_EMAIL || 'hello@dpeluola.com'],
            reply_to: fields.email,
            subject: `Project inquiry: ${fields.projectType || 'General'} from ${fields.name}`,
            text: [
                `Name: ${fields.name}`,
                `Email: ${fields.email}`,
                `Project type: ${fields.projectType}`,
                `Budget: ${fields.budget}`,
                '',
                fields.message,
                '',
                'Sent from the dpeluola.com contact form',
            ].join('\n'),
        }),
    });

    if (!res.ok) {
        console.error('Resend error', res.status, await res.text());
        return json(502, { error: 'Could not send message' });
    }
    return json(200, { ok: true });
}
