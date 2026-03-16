function LessonBadge({ badge }) {
  if (!badge) return null;

  const label = badge === 'new' ? 'New' : badge === 'updated' ? 'Updated' : null;
  if (!label) return null;

  return (
    <span className={`ovl-badge ovl-badge--${badge}`}>{label}</span>
  );
}

export default LessonBadge;
