export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {year} Deyvi Joel Xol. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a
            href="https://github.com/davexdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/deyvi-joel-xol-chiquin-644025370"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:xdave418@gmail.com">Correo</a>
        </div>
      </div>
    </footer>
  )
}
