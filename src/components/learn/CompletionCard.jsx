import { useState } from 'react';
import { useProgress } from '../../contexts/ProgressContext';

function CompletionCard({ level }) {
  const { getLevelProgress, enabled } = useProgress();
  const [copied, setCopied] = useState(false);

  if (!enabled) return null;

  const { done, total, percent } = getLevelProgress(level.slug, level.lessons);
  if (percent < 100) return null;

  const shareText = `I completed ${level.number} ${level.title} on the Open Vector — the free Zero-Vector Design curriculum.`;
  const shareUrl = `https://open.zerovector.design/learn/curriculum/${level.slug}`;

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleLinkedIn() {
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }

  function handleX() {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }

  return (
    <div className="ovl-completion">
      <div className="ovl-completion-icon">✓</div>
      <h3 className="ovl-completion-title">Level Complete</h3>
      <p className="ovl-completion-subtitle">
        You finished all {total} lessons in {level.number} {level.title}. Share your progress.
      </p>
      <div className="ovl-completion-card">
        <div className="ovl-completion-card-brand">The Open Vector</div>
        <div className="ovl-completion-card-level">{level.number} {level.title}</div>
        <div className="ovl-completion-card-detail">{total} lessons &middot; Completed</div>
      </div>
      <div className="ovl-completion-actions">
        <button className="ovl-btn ovl-btn-primary" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        <button className="ovl-btn ovl-btn-outline" onClick={handleLinkedIn}>
          LinkedIn
        </button>
        <button className="ovl-btn ovl-btn-outline" onClick={handleX}>
          X / Twitter
        </button>
      </div>
    </div>
  );
}

export default CompletionCard;
