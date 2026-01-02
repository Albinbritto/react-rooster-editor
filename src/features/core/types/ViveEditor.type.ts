import type { IEditor, EditorOptions } from 'roosterjs-content-model-types';
import { ToolBarButton } from '../../toolbar/types/ToolBarButton.type';

export interface ContentEditableProps extends EditorOptions, React.HTMLAttributes<HTMLDivElement> {
  editorCreator?: (div: HTMLDivElement, options: EditorOptions) => IEditor;
  focusOnInit?: boolean;
}

export interface ViveToolBarProps {
  buttons?: ToolBarButton<any>[][];
}

export interface ViveBubbleMenuProps {
  buttons?: ToolBarButton<any>[][];
}
