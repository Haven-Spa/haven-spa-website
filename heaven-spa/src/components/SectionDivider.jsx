import { useId } from 'react'

export default function SectionDivider({ from = 'var(--warm-white)', to = 'var(--cream)', gradient = null }) {
  const gradId = useId()
  return (
    <div className="section-divider" aria-hidden="true" style={{ background: from }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        {gradient && (
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
              {gradient.map((c, i) => (
                <stop key={i} offset={`${(i / (gradient.length - 1)) * 100}%`} stopColor={c} />
              ))}
            </linearGradient>
          </defs>
        )}
        <path
          d="M0,42 C360,92 1080,-8 1440,42 L1440,80 L0,80 Z"
          fill={gradient ? `url(#${gradId})` : to}
        />
      </svg>
    </div>
  )
}
