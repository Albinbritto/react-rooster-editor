import type { IEditor, EditorOptions, SelectionChangedEvent } from 'roosterjs-content-model-types';
import { ToolBarButton } from '../../toolbar/types/ToolBarButton.type';
import { FloatingMenuOption } from '../../floatingmenu/types/FloatingMenu.type';

export interface ContentEditableProps extends EditorOptions, React.HTMLAttributes<HTMLDivElement> {
  editorCreator?: (div: HTMLDivElement, options: EditorOptions) => IEditor;
  focusOnInit?: boolean;
  tableMenuOption?: FloatingMenuOption;
  imageMenuOption?: FloatingMenuOption;
  listMenuOption?: FloatingMenuOption;
  onSelectionChanged?: (event: SelectionChangedEvent) => void;
}

export interface ViveToolBarProps {
  buttons?: ToolBarButton<any>[][];
}

export interface ViveBubbleMenuProps {
  buttons?: ToolBarButton<any>[][];
}
