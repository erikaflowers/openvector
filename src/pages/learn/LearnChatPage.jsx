import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';

export const SUGGESTED_PROMPTS = [
  {
    icon: '\u00A7',
    label: 'What is vibe coding?',
    text: 'What is vibe coding and why should I avoid it?',
  },
  {
    icon: '\u00B6',
    label: 'Structure a project',
    text: 'How should I structure a project when building with Claude Code?',
  },
  {
    icon: '\u2020',
    label: 'Systems thinking',
    text: 'Explain systems thinking and why it matters for designers who build.',
  },
  {
    icon: '\u2021',
    label: 'Where to start',
    text: 'I am a designer who has never coded. What should I learn first?',
  },
  {
    icon: '\u00A4',
    label: 'AI agents',
    text: 'How do AI agents work together on a project? What is the crew model?',
  },
  {
    icon: '\u00AB',
    label: 'Design + engineering',
    text: 'What does it mean to be a design-led engineer? How is that different from a developer?',
  },
];


// Renders text with markdown-style links: [text](url)
// Internal links (starting with /) use React Router <Link>
// External links use <a target="_blank">
function renderLinkedText(text) {
  const parts = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const linkText = match[1];
    const url = match[2];

    if (url.startsWith('/')) {
      parts.push(
        <Link key={match.index} to={url} className="ovl-chat-link ovl-chat-link--internal">
          {linkText}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ovl-chat-link ovl-chat-link--external"
        >
          {linkText}<span className="ovl-chat-link-arrow">{'\u2009\u2197'}</span>
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text after last link
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

// Renders **bold** text
function renderBold(content) {
  if (typeof content !== 'string') return content;
  const parts = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(...renderLinkedText(content.slice(lastIndex, match.index)));
    }
    parts.push(<strong key={`b-${match.index}`}>{renderLinkedText(match[1])}</strong>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex === 0) return renderLinkedText(content);
  if (lastIndex < content.length) {
    parts.push(...renderLinkedText(content.slice(lastIndex)));
  }
  return parts;
}

// Renders inline `code`
function renderInlineCode(content) {
  if (typeof content !== 'string') return content;
  const parts = [];
  const regex = /`([^`]+)`/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderBold(content.slice(lastIndex, match.index)));
    }
    parts.push(<code key={`c-${match.index}`} className="ovl-chat-code">{match[1]}</code>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex === 0) return renderBold(content);
  if (lastIndex < content.length) {
    parts.push(renderBold(content.slice(lastIndex)));
  }
  return parts;
}

// Renders a full message body — paragraphs, lists, bold, code, links
function ChatContent({ text }) {
  const paragraphs = text.split('\n\n');

  return paragraphs.map((block, i) => {
    const lines = block.split('\n');

    // Check if this block is a list (lines starting with - or numbered)
    const isList = lines.every(l => /^[-\d]/.test(l.trim()));
    if (isList && lines.length > 1) {
      return (
        <ul key={i} className="ovl-chat-list">
          {lines.map((line, j) => {
            const cleaned = line.replace(/^[-\d]+[.)]*\s*/, '');
            return <li key={j}>{renderInlineCode(cleaned)}</li>;
          })}
        </ul>
      );
    }

    return <p key={i}>{renderInlineCode(block)}</p>;
  });
}

function LearnChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [socratic, setSocratic] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useSEO({
    title: 'Chat — The Open Vector',
    description: 'Ask the Open Vector. An AI learning companion for design-led engineering.',
    path: '/learn/chat',
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Listen for sidebar prompt clicks
  useEffect(() => {
    const handler = (e) => sendMessage(e.detail);
    window.addEventListener('ovl-chat-prompt', handler);
    return () => window.removeEventListener('ovl-chat-prompt', handler);
  });

  const sendMessage = async (text) => {
    if (!text.trim() || isThinking) return;

    const userMessage = { role: 'user', content: text.trim() };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput('');
    setIsThinking(true);

    try {
      const res = await fetch('/.netlify/functions/learn-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, socratic }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'I need a moment to recharge. Try again in a couple of minutes.',
        }]);
      } else if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Something went wrong. Try asking again.',
        }]);
      }
    } catch {
      const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const msg = isDev
        ? 'Chat function unreachable. Run `netlify dev` instead of `npm run dev` for local function support.'
        : 'Connection failed. Try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: msg }]);
    }

    setIsThinking(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showWelcome = messages.length === 0 && !isThinking;

  return (
    <div className="ovl-chat">
      <div className="ovl-chat-messages">
        {showWelcome ? (
          <div className="ovl-chat-welcome">
            <div className="ovl-chat-welcome-icon">
              <span className="ovl-chat-welcome-glyph">&loz;</span>
            </div>
            <h1 className="ovl-chat-welcome-title">Ask the Open Vector</h1>
            <p className="ovl-chat-welcome-subtitle">
              Your AI learning companion. Ask about design, building with AI,
              systems thinking, or anything in the curriculum.
            </p>
            <div className="ovl-chat-prompts">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  className="ovl-chat-prompt"
                  onClick={() => sendMessage(prompt.text)}
                >
                  <span className="ovl-chat-prompt-icon">{prompt.icon}</span>
                  <span className="ovl-chat-prompt-label">{prompt.label}</span>
                </button>
              ))}
            </div>
            <div className="ovl-chat-welcome-badge">
              <span className="ovl-chat-welcome-badge-dot" />
              Powered by Claude
            </div>
          </div>
        ) : (
          <div className="ovl-chat-thread">
            {messages.map((msg, i) => (
              <div key={i} className={`ovl-chat-msg ovl-chat-msg--${msg.role}`}>
                <div className="ovl-chat-msg-avatar">
                  {msg.role === 'assistant' ? (
                    <span className="ovl-chat-avatar-ai">&loz;</span>
                  ) : (
                    <span className="ovl-chat-avatar-user">You</span>
                  )}
                </div>
                <div className="ovl-chat-msg-body">
                  <div className="ovl-chat-msg-name">
                    {msg.role === 'assistant' ? 'Open Vector' : 'You'}
                  </div>
                  <div className="ovl-chat-msg-content">
                    {msg.role === 'assistant' ? (
                      <ChatContent text={msg.content} />
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="ovl-chat-msg ovl-chat-msg--assistant">
                <div className="ovl-chat-msg-avatar">
                  <span className="ovl-chat-avatar-ai">&loz;</span>
                </div>
                <div className="ovl-chat-msg-body">
                  <div className="ovl-chat-msg-name">Open Vector</div>
                  <div className="ovl-chat-thinking">
                    <span className="ovl-chat-dot" />
                    <span className="ovl-chat-dot" />
                    <span className="ovl-chat-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="ovl-chat-input-area">
        <div className="ovl-chat-modes">
          <button
            className={`ovl-chat-mode ${!socratic ? 'ovl-chat-mode--active' : ''}`}
            onClick={() => setSocratic(false)}
            type="button"
          >
            Direct
          </button>
          <button
            className={`ovl-chat-mode ${socratic ? 'ovl-chat-mode--active' : ''}`}
            onClick={() => setSocratic(true)}
            type="button"
          >
            Socratic
          </button>
        </div>
        <form className="ovl-chat-form" onSubmit={handleSubmit}>
          <div className="ovl-chat-input-wrap">
            <textarea
              ref={inputRef}
              className="ovl-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about design, AI tools, building, or anything in the curriculum..."
              rows={1}
              disabled={isThinking}
            />
            <button
              type="submit"
              className={`ovl-chat-send ${input.trim() && !isThinking ? 'ovl-chat-send--active' : ''}`}
              disabled={!input.trim() || isThinking}
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8L14 8M14 8L9 3M14 8L9 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="ovl-chat-disclaimer">
            Open Vector AI can make mistakes. Verify important information against the curriculum.
          </div>
        </form>
      </div>
    </div>
  );
}

export default LearnChatPage;
