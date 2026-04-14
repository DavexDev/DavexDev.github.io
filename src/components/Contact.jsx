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
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('success')
      formRef.current.reset()
    } catch (err) {
      console.error('EmailJS error:', err)
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

                {!SERVICE_ID && (
                  <p className="form-warning" role="note">
                    <FaExclamationTriangle aria-hidden="true" /> EmailJS no está configurado. Crea un archivo .env con las
                    variables de VITE_EMAILJS_* (ver .env.example).
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
