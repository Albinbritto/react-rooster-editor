import type { IEditor, PluginEvent, SelectionChangedEvent } from 'roosterjs-content-model-types';

export class CorePlugin {
  private editor: IEditor | null = null;
  private onSelectionChanged: ((event: SelectionChangedEvent) => void) | undefined;

  constructor(onSelectionChanged?: (event: SelectionChangedEvent) => void) {
    this.onSelectionChanged = onSelectionChanged;
  }

  getName() {
    return 'CorePlugin';
  }

  initialize(editor: IEditor) {
    this.editor = editor;
  }

  getEditor() {
    return this.editor;
  }

  dispose() {
    this.editor = null;
  }

  onPluginEvent(event: PluginEvent) {
    switch (event.eventType) {
      case 'selectionChanged':
        this.onSelectionChanged?.(event);
        break;
      default:
        break;
    }
  }
}
