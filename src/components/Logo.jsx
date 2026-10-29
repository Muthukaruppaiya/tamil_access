export default function Logo({ size = 42 }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#3b7ea8" />
      <path d="M12 38l5-11a4 4 0 0 1 3.6-2.3h22.8A4 4 0 0 1 47 27l5 11v7a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-2H19v2a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-7Z" fill="#fff" />
      <path d="M17 36l3.5-8h23l3.5 8Z" fill="#d7e8f2" />
      <circle cx="20" cy="40" r="2.6" fill="#2f6b90" />
      <circle cx="44" cy="40" r="2.6" fill="#2f6b90" />
      <path d="M24 15h16M32 15v8" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  )
}
