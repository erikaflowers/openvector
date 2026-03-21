/**
 * Remark plugin: Custom Directives → HTML elements
 *
 * Converts remark-directive AST nodes into elements that
 * react-markdown can render via its components prop.
 *
 * Supported directives:
 *   :::exercise{title="..."}  → <exercise title="...">
 *   :::template{title="..."}  → <template-block title="...">
 *   :::step{number="01" title="..."} → <step number="01" title="...">
 *   :::resources{title="..."}  → <resources title="...">
 */

import { visit } from 'unist-util-visit';

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
        // Using 'template-block' instead of 'template' to avoid HTML <template> element
        const nameMap = {
          exercise: 'exercise',
          template: 'template-block',
          step: 'step',
          resources: 'resources',
        };

        const hName = nameMap[node.name] || node.name;
        data.hName = hName;
        data.hProperties = { ...(node.attributes || {}) };
      }
    });
  };
}
