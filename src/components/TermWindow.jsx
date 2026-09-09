/**
 * Terminal-window chrome used to frame text-heavy sections.
 * Mirrors the "~/archivo.ext" motif from the downloadable CV so the
 * site and the CV read as one identity.
 */
export default function TermWindow({ path, children, className = '' }) {
  const dot = path.slice(0, path.lastIndexOf('.')) || path
  const ext = path.includes('.') ? path.slice(path.lastIndexOf('.')) : ''

  return (
    <div className={`term-window ${className}`.trim()}>
      <div className="term-bar">
        <span className="term-dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
        <span className="term-path">
          ~/<b>{dot}</b>{ext}
        </span>
      </div>
      <div className="term-body">{children}</div>
    </div>
  )
}
