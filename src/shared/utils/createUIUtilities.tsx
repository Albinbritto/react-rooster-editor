import type { UIUtilities } from '../types/UIUtilities.type';
import { createRoot } from 'react-dom/client';

export function createUIUtilities(container: HTMLDivElement): UIUtilities {
  return {
    renderComponent: (element) => {
      const doc = container.ownerDocument;
      const div = doc.createElement('div');
      div.id = 'ui-utilities-container';
      doc.body.appendChild(div);
      const root = createRoot(div);
      root.render(element);

      return () => {
        root.unmount();
        doc.body.removeChild(div);
      };
    },
  };
}
