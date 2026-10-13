export const P = {
  phone: <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />,
  mail: <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.5l-10 6.2L2 6.5V6zm0 2.85V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.85l-9.47 5.9a1 1 0 0 1-1.06 0L2 8.85z" />,
  pin: <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />,
  tg: <path d="M22 3 2 11l6 2.2L10 20l3-3.5 5 3.7L22 3zM9.7 12.6l8-5-6.3 5.8-.4 3.2-1.3-4z" />,
  user: <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z" />,
  work: <path d="M9 3h6a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v3H2V9a2 2 0 0 1 2-2h3V5a2 2 0 0 1 2-2zm0 2v2h6V5H9zM2 14h8v1.5h4V14h8v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5z" />,
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
  edu: <path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8-7-3.8z" />,
  lang: <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />,
  globe: <g fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></g>,
}
export const Ic = ({ n, s = 14 }) => <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor" aria-hidden="true">{P[n]}</svg>
