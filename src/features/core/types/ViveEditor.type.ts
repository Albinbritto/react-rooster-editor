import type {
  IEditor,
  EditorOptions,
  SelectionChangedEvent,
  DOMHelper,
} from 'roosterjs-content-model-types';
import { ToolBarButton } from '../../toolbar/types/ToolBarButton.type';
import { FloatingMenuOption } from '../../floatingmenu/types/FloatingMenu.type';
import { ReactNode } from 'react';
import { OnTableEditorCreatedCallback } from 'roosterjs-content-model-plugins/lib/tableEdit/OnTableEditorCreatedCallback';
import {
  AutoFormatOptions,
  EditOptions,
  TableEditFeatureName,
  TableWithRoot,
} from 'roosterjs-content-model-plugins';

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

export interface ViveEditorProps {
  children: ReactNode;
  className?: string;
  isDarkMode?: boolean;
  dir?: 'ltr' | 'rtl';
  tableMenu?: FloatingMenuOption | boolean;
  imageMenu?: FloatingMenuOption | boolean;
  listMenu?: FloatingMenuOption | boolean;
  onSelectionChanged?: (event: SelectionChangedEvent) => void;
  onEditorCreated?: (editor: IEditor) => void;
  onEditorDisposed?: () => void;
  tablePlugin?: TablePluginOptions | boolean;
  autoFormatOptions?: AutoFormatOptions;
  editPluginOptions?: EditOptions;
}

export interface TablePluginOptions {
  anchorContainerSelector?: string | undefined;
  onTableEditorCreated?: OnTableEditorCreatedCallback | undefined;
  disableFeatures?: (TableEditFeatureName | 'TableRowReorder' | 'TableColumnReorder')[] | undefined;
  tableSelector?: (domHelper: DOMHelper) => TableWithRoot[];
}
