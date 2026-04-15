/**
 * MarkdownRenderer — Renders lesson markdown content with custom block types.
 *
 * Replaces LessonRenderer.jsx. Uses react-markdown with remark plugins
 * to handle standard markdown + custom directives (exercise, template, step, resources).
 *
 * All CSS classes match the existing OVL design system — no style changes needed.
 */

import { createContext, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { remarkCustomDirectives } from '../../utils/remark-custom-directives';

const InsidePreContext = createContext(false);

function headingId(text) {
  const str = typeof text === 'string' ? text : extractText(text);
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/** Recursively extract plain text from React children */
function extractText(children) {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children?.props?.children) return extractText(children.props.children);
  return '';
}

/** Custom component: Prerequisite block */
function PrereqBlock({ children, title }) {
  return (
    <div className="ovl-block ovl-block-prereq">
      <div className="ovl-prereq-label">{title || 'Before you start'}</div>
      <div className="ovl-prereq-body">{children}</div>
    </div>
  );
}

/** Custom component: Exercise block */
function ExerciseBlock({ children, title }) {
  return (
    <div className="ovl-block ovl-block-exercise">
      <div className="ovl-exercise-label">Exercise</div>
      {title && <h3 className="ovl-exercise-title">{title}</h3>}
      <div className="ovl-exercise-body">{children}</div>
    </div>
  );
}

/** Custom component: Template block — renders content as raw preformatted text */
function TemplateBlock({ rawcontent, title }) {
  return (
    <div className="ovl-block ovl-block-template">
      <div className="ovl-template-header">
        <span className="ovl-template-label">Template</span>
        {title && <span className="ovl-template-title">{title}</span>}
      </div>
      <pre className="ovl-template-body"><code>{rawcontent}</code></pre>
    </div>
  );
}

/** Custom component: Step block */
function StepBlock({ children, number, title }) {
  return (
    <div className="ovl-block ovl-block-step">
      {number && <div className="ovl-step-number">{number}</div>}
      <div className="ovl-step-body">
        {title && <h3 id={headingId(title)} className="ovl-step-title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}

/** Custom component: Resources block */
function ResourcesBlock({ children, title }) {
  return (
    <div className="ovl-block ovl-block-resources">
      {title && <h2 id={headingId(title)} className="ovl-block-heading">{title}</h2>}
      <div className="ovl-resource-list">{children}</div>
    </div>
  );
}

/** Component map for react-markdown */
const components = {
  // Standard markdown → OVL classes
  h2: ({ children }) => (
    <h2 id={headingId(children)} className="ovl-block-heading">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 id={headingId(children)} className="ovl-block-subheading">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="ovl-block-paragraph">{children}</p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="ovl-block ovl-block-callout">{children}</blockquote>
  ),
  pre: ({ children }) => (
    <InsidePreContext.Provider value={true}>
      <pre className="ovl-block ovl-block-code">{children}</pre>
    </InsidePreContext.Provider>
  ),
  a: ({ href, children }) => {
    if (href?.startsWith('http')) {
      return <a href={href} target="_blank" rel="noopener noreferrer" className="ovl-resource-link">{children}</a>;
    }
    return <a href={href}>{children}</a>;
  },
  code: ({ children, className }) => {
    const insidePre = useContext(InsidePreContext)
    if (insidePre || className) return <code className={className}>{children}</code>
    return <code className="ovl-inline-code">{children}</code>
  },

  // Custom directive components
  prereq: PrereqBlock,
  exercise: ExerciseBlock,
  'template-block': TemplateBlock,
  step: StepBlock,
  resources: ResourcesBlock,
};

function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="ovl-lesson-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, remarkCustomDirectives]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;
