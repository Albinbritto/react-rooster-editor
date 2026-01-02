import { JSX } from 'react';

export interface UIUtilities {
  renderComponent(element: JSX.Element): () => void;
}
