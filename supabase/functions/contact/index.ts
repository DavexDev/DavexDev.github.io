const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const RESEND_FROM = 'Contacto Portfolio <contacto@davexdev.com>'
const RESEND_TO = 'xdave418@gmail.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function POST(request: Request) {
  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY no configurado' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const payload = await request.json().catch(() => ({}))
  const name = String(payload.name || 'No proporcionado').trim()
  const email = String(payload.email || '').trim()
  const message = String(payload.message || '').trim()

  if (!email || !message) {
    return new Response(JSON.stringify({ error: 'Correo y mensaje son obligatorios.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const subject = `Nuevo mensaje desde el portafolio: ${name}`
  const bodyHtml = `
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Correo:</strong> ${email}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${message}</p>
  `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [RESEND_TO],
      reply_to: email,
      subject,
      html: bodyHtml,
    }),
  })

  const text = await response.text()
  if (!response.ok) {
    return new Response(JSON.stringify({ error: text }), {
      status: response.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
