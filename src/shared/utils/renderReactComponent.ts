import { JSX } from 'react';
import type { UIUtilities } from '../types/UIUtilities.type';

export function renderReactComponent(uiUtilities: UIUtilities | null, reactElement: JSX.Element) {
  if (uiUtilities) {
    return uiUtilities.renderComponent(reactElement);
  } else {
    throw new Error(
      'UIUtilities is required but not provided. Please call ReactEditorPlugin.setUIUtilities() to set a valid uiUtilities object'
    );
  }
}
