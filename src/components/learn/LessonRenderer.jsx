function headingId(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function LessonRenderer({ sections }) {
  if (!sections?.length) return null;

  return (
    <div className="ovl-lesson-body">
      {sections.map((section, i) => {
        switch (section.type) {
          case 'text':
            return (
              <div key={i} className="ovl-block ovl-block-text">
                {section.heading && <h2 id={headingId(section.heading)} className="ovl-block-heading">{section.heading}</h2>}
                {section.body.map((p, j) => (
                  <p key={j} className="ovl-block-paragraph">{p}</p>
                ))}
              </div>
            );
          case 'callout':
            return (
              <blockquote key={i} className="ovl-block ovl-block-callout">
                {section.body}
              </blockquote>
            );
          case 'exercise':
            return (
              <div key={i} className="ovl-block ovl-block-exercise">
                <div className="ovl-exercise-label">Exercise</div>
                {section.title && <h3 className="ovl-exercise-title">{section.title}</h3>}
                <p>{section.body}</p>
              </div>
            );
          case 'code':
            return (
              <pre key={i} className="ovl-block ovl-block-code">
                <code>{section.body}</code>
              </pre>
            );
          case 'resources':
            return (
              <div key={i} className="ovl-block ovl-block-resources">
                {section.heading && <h2 id={headingId(section.heading)} className="ovl-block-heading">{section.heading}</h2>}
                <ul className="ovl-resource-list">
                  {section.items.map((item, j) => (
                    <li key={j} className="ovl-resource-item">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="ovl-resource-link">{item.title}</a>
                      {item.note && <span className="ovl-resource-note"> — {item.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            );
          case 'step':
            return (
              <div key={i} className="ovl-block ovl-block-step">
                <div className="ovl-step-number">{section.number}</div>
                <div className="ovl-step-body">
                  {section.title && <h3 id={headingId(section.title)} className="ovl-step-title">{section.title}</h3>}
                  {section.body.map((p, j) => (
                    <p key={j} className="ovl-block-paragraph">{p}</p>
                  ))}
                </div>
              </div>
            );
          case 'template':
            return (
              <div key={i} className="ovl-block ovl-block-template">
                <div className="ovl-template-header">
                  <span className="ovl-template-label">Template</span>
                  {section.title && <span className="ovl-template-title">{section.title}</span>}
                </div>
                <pre className="ovl-template-body"><code>{section.body}</code></pre>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default LessonRenderer;
