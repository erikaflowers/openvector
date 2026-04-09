/**
 * Remark plugin: Custom Directives → HTML elements
 *
 * Converts remark-directive AST nodes into elements that
 * react-markdown can render via its components prop.
 *
 * Supported directives:
 *   :::exercise{title="..."}  → <exercise title="...">
 *   :::template{title="..."}  → <template-block title="..."> (content treated as raw text)
 *   :::step{number="01" title="..."} → <step number="01" title="...">
 *   :::resources{title="..."}  → <resources title="...">
 *   :::extracredit{title="..."}  → <extracredit title="...">
 */

import { visit } from 'unist-util-visit';

/**
 * Recursively extract plain text from an MDAST node tree.
 * Used to get raw text content from template directives
 * so their content isn't rendered as formatted markdown.
 */
function extractRawText(node) {
  if (node.type === 'text') return node.value;
  if (node.type === 'inlineCode') return node.value;
  if (node.type === 'code') return node.value;
  if (node.children) return node.children.map(extractRawText).join('');
  // For line breaks between block elements
  if (node.type === 'paragraph') return node.children.map(extractRawText).join('') + '\n';
  if (node.type === 'heading') {
    const hashes = '#'.repeat(node.depth || 1);
    return hashes + ' ' + node.children.map(extractRawText).join('') + '\n';
  }
  if (node.type === 'list') {
    return node.children.map((item, i) => {
      const prefix = node.ordered ? `${i + 1}. ` : '- ';
      return prefix + extractRawText(item);
    }).join('');
  }
  if (node.type === 'listItem') return node.children.map(extractRawText).join('');
  if (node.type === 'strong') return '**' + node.children.map(extractRawText).join('') + '**';
  if (node.type === 'emphasis') return '*' + node.children.map(extractRawText).join('') + '*';
  if (node.type === 'link') return '[' + node.children.map(extractRawText).join('') + '](' + (node.url || '') + ')';
  if (node.type === 'blockquote') return '> ' + node.children.map(extractRawText).join('');
  if (node.type === 'thematicBreak') return '---\n';
  return '';
}

export function remarkCustomDirectives() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});

        // Map directive name to HTML element name
        const nameMap = {
          exercise: 'exercise',
          template: 'template-block',
          step: 'step',
          resources: 'resources',
          prereq: 'prereq',
          extracredit: 'extracredit',
        };

        // Only process directives we explicitly support.
        // Unknown directives (e.g. `:3000` from `localhost:3000`) get
        // converted back to plain text so they don't create invalid HTML elements.
        if (!nameMap[node.name]) {
          if (node.type === 'textDirective') {
            node.type = 'text';
            node.value = ':' + node.name;
            delete node.children;
          }
          return;
        }

        const hName = nameMap[node.name];
        data.hName = hName;
        data.hProperties = { ...(node.attributes || {}) };

        // Template directives: extract content as raw text
        // so markdown syntax inside templates isn't rendered as formatted HTML.
        // Templates are copyable text blocks — they should show raw content.
        if (node.name === 'template' && node.children) {
          const rawText = node.children.map(extractRawText).join('\n').replace(/\n{3,}/g, '\n\n').trim();
          data.hProperties.rawcontent = rawText;
          // Clear children so react-markdown doesn't render them as markdown
          node.children = [];
        }
      }
    });
  };
}
