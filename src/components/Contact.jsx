import { useState, useRef } from 'react'
import {
  FaPhoneAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPaperPlane,
  FaSpinner,
  FaExclamationTriangle,
  FaComments,
} from 'react-icons/fa'

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY
const RESEND_TO = 'xdave418@gmail.com'
const RESEND_FROM = 'Contacto Portfolio <contacto@davexdev.com>'

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')

    if (!RESEND_API_KEY) {
      setErrMsg('El servicio de correo no está configurado. Añade VITE_RESEND_API_KEY en .env.')
      setStatus('error')
      return
    }

    const formData = new FormData(formRef.current)
    const name = formData.get('from_name')?.toString().trim()
    const email = formData.get('from_email')?.toString().trim()
    const message = formData.get('message')?.toString().trim()

    const subject = `Nuevo mensaje desde el portafolio: ${name || 'Contacto'}`
    const bodyHtml = `
      <p><strong>Nombre:</strong> ${name || 'No proporcionado'}</p>
      <p><strong>Correo:</strong> ${email || 'No proporcionado'}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message || 'Sin mensaje'}</p>
    `

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: RESEND_FROM,
          to: [RESEND_TO],
          reply_to: email || undefined,
          subject,
          html: bodyHtml,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Resend error: ${response.status} ${errorText}`)
      }

      setStatus('success')
      formRef.current.reset()
    } catch (err) {
      console.error('Resend error:', err)
      setErrMsg('No se pudo enviar el mensaje. Por favor intenta más tarde.')
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="section">
      <div className="container">
        <h2 className="section-title">Contacto</h2>

        <div className="contact-grid">
          {/* Info */}
          <div className="card contact-info">
            <h3 style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaComments aria-hidden="true" /> Hablemos
            </h3>
            <p className="muted">
              ¿Tienes un proyecto en mente, quieres colaborar o tienes alguna
              pregunta? Escríbeme directamente.
            </p>

            <div className="contact-links">
              <a href="tel:+50258978555" className="contact-link">
                <span className="contact-link-icon" aria-hidden="true">
                  <FaPhoneAlt />
                </span>
                <span>+502 5897-8555</span>
              </a>
              <a href="mailto:xdave418@gmail.com" className="contact-link">
                <span className="contact-link-icon" aria-hidden="true">
                  <FaEnvelope />
                </span>
                <span>xdave418@gmail.com</span>
              </a>
              <a
                href="https://github.com/davexdev"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon" aria-hidden="true">
                  <FaGithub />
                </span>
                <span>github.com/davexdev</span>
              </a>
              <a
                href="https://www.linkedin.com/in/deyvi-joel-xol-chiquin-644025370"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon" aria-hidden="true">
                  <FaLinkedin />
                </span>
                <span>LinkedIn</span>
              </a>
              <div className="contact-link" style={{ cursor: 'default' }}>
                <span className="contact-link-icon" aria-hidden="true">
                  <FaMapMarkerAlt />
                </span>
                <span>Guatemala · Open to Remote Work</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card contact-form-card">
            {status === 'success' ? (
              <div className="form-success">
                <p className="success-icon" aria-hidden="true">
                  <FaCheckCircle size={28} />
                </p>
                <h3>¡Mensaje enviado!</h3>
                <p className="muted">Gracias, te responderé pronto.</p>
                <button
                  className="btn primary"
                  onClick={() => setStatus('idle')}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Formulario de contacto"
              >
                <label>
                  Nombre
                  <input
                    name="from_name"
                    type="text"
                    placeholder="Tu nombre"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                  />
                </label>

                <label>
                  Correo electrónico
                  <input
                    name="from_email"
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    required
                    maxLength={254}
                    autoComplete="email"
                  />
                </label>

                <label>
                  Mensaje
                  <textarea
                    name="message"
                    placeholder="Cuéntame sobre tu proyecto o consulta…"
                    required
                    minLength={10}
                    maxLength={2000}
                  />
                </label>

                {status === 'error' && (
                  <p className="form-error" role="alert">{errMsg}</p>
                )}

                <button
                  type="submit"
                  className="btn primary"
                  disabled={status === 'sending'}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}
                >
                  {status === 'sending' ? (
                    <>
                      <FaSpinner className="icon-spin" aria-hidden="true" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      <FaPaperPlane aria-hidden="true" />
                      Enviar mensaje
                    </>
                  )}
                </button>

                {!RESEND_API_KEY && (
                  <p className="form-warning" role="note">
                    <FaExclamationTriangle aria-hidden="true" /> Resend no está configurado. Crea un archivo .env con
                    VITE_RESEND_API_KEY (ver .env.example).
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
