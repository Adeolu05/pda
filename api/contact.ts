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

/** Single-line fields: drop CR/LF and other control characters so nothing can break the email headers. */
const oneLine = (v: string) => v.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Best-effort rate limit: 5 briefs per IP per 10 minutes, per warm function instance.
 * It stops casual floods; a shared store (e.g. Upstash) would be needed for a hard limit.
 */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5000) hits.clear();
    return recent.length > LIMIT;
}

export async function POST(request: Request): Promise<Response> {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return json(503, { error: 'Email service not configured' });

    // Only accept posts from this site's own pages when the browser says where it came from
    const origin = request.headers.get('origin');
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
    if (origin && host) {
        try {
            if (new URL(origin).host !== host) return json(403, { error: 'Forbidden' });
        } catch {
            return json(403, { error: 'Forbidden' });
        }
    }

    const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) return json(429, { error: 'Too many messages, please try again later' });

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
        const raw = typeof data[key] === 'string' ? data[key]!.trim() : '';
        const value = key === 'message' ? raw : oneLine(raw);
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
