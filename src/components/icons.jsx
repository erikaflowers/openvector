export function ArrowIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ExternalLinkIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 9v4H3V4h4M8 8l5-5M10 3h3v3" />
    </svg>
  );
}

export function SubstackIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 3.2H2V4.8h12V3.2zM2 6.4v1.2l6 3.6 6-3.6V6.4H2zM2 1.6h12v1.2H2V1.6z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.6 1H2.4C1.6 1 1 1.6 1 2.4v11.2c0 .8.6 1.4 1.4 1.4h11.2c.8 0 1.4-.6 1.4-1.4V2.4c0-.8-.6-1.4-1.4-1.4zM5.4 13H3.2V6.4h2.2V13zM4.3 5.4c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.6 1.3-1.3 1.3zM13 13h-2.2V9.8c0-.8 0-1.8-1.1-1.8s-1.3.9-1.3 1.7V13H6.2V6.4h2.1v.9c.3-.6 1-1.1 2.1-1.1 2.2 0 2.6 1.5 2.6 3.4V13z" />
    </svg>
  );
}
