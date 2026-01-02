import { getFormatState } from 'roosterjs-content-model-api';
import { getObjectKeys } from 'roosterjs-content-model-dom';
import type { ContentModelFormatState, IEditor, PluginEvent } from 'roosterjs-content-model-types';
import { BubbleMenuPlugin, BubbleMenuPosition } from '../types/BubbleMenuPlugin.types';
import { ToolBarButton } from '../../toolbar/types/ToolBarButton.type';
import { UIUtilities } from '../../../shared/types/UIUtilities.type';
import { getSelectedTableCellsRect } from '../../../shared/utils/tableUtil';

class BubbleMenuPluginImpl implements BubbleMenuPlugin {
  private editor: IEditor | null = null;
  private onFormatChanged: ((formatState: ContentModelFormatState) => void) | null = null;
  private onSelectionChanged: ((position: BubbleMenuPosition | null) => void) | null = null;
  private timer = 0;
  private formatState: ContentModelFormatState | null = null;
  private uiUtilities: UIUtilities | null = null;
  private rightClicked: boolean = false;

  constructor(private delayUpdateTime: number = 200) {}

  getName() {
    return 'BubbleMenu';
  }

  initialize(editor: IEditor) {
    this.editor = editor;
  }

  dispose() {
    this.editor = null;
  }

  onPluginEvent(event: PluginEvent) {
    switch (event.eventType) {
      case 'editorReady':
      case 'contentChanged':
      case 'zoomChanged':
        this.updateFormat();
        break;
      case 'contextMenu':
        this.rightClicked = true;
        break;
      case 'keyDown':
      case 'mouseUp':
        this.delayUpdate();
        break;
    }
  }

  registerFormatChangedCallback(callback: (formatState: ContentModelFormatState) => void) {
    this.onFormatChanged = callback;

    return () => {
      this.onFormatChanged = null;
    };
  }

  registerSelectionChangedCallback(callback: (position: BubbleMenuPosition | null) => void) {
    this.onSelectionChanged = callback;

    return () => {
      this.onSelectionChanged = null;
    };
  }

  setUIUtilities(uiUtilities: UIUtilities) {
    this.uiUtilities = uiUtilities;
  }

  onButtonClick<T extends string>(button: ToolBarButton<T>, key: T) {
    if (this.editor && this.uiUtilities) {
      this.editor.stopShadowEdit();

      button?.onClick?.(this.editor, key, this.uiUtilities);

      if (button.isChecked || button.isDisabled || button.dropDownMenu?.getSelectedItemKey) {
        this.updateFormat();
      }
    }
  }

  getEditor() {
    return this.editor;
  }

  private delayUpdate() {
    const window = this.editor?.getDocument().defaultView;

    if (!window) {
      return;
    }

    if (this.timer) {
      window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(() => {
      this.timer = 0;
      this.updateFormat?.();
      this.updateSelection?.();
    }, this.delayUpdateTime);
  }

  private updateFormat() {
    if (this.editor && this.onFormatChanged) {
      const newFormatState = getFormatState(this.editor);
      const newFormatKeys = getObjectKeys(newFormatState);

      if (
        !this.formatState ||
        newFormatKeys.length != getObjectKeys(this.formatState).length ||
        getObjectKeys(newFormatState).some((key) => newFormatState[key] != this.formatState?.[key])
      ) {
        this.formatState = newFormatState;
        this.onFormatChanged(newFormatState);
      }
    }
  }

  private updateSelection() {
    if (!this.editor || !this.onSelectionChanged) {
      return;
    }

    if (this.rightClicked) {
      this.rightClicked = false;
      this.onSelectionChanged(null);
      return;
    }

    const selection = this.editor.getDOMSelection();

    if (selection && selection.type === 'table') {
      const editor = this.editor;

      const position: BubbleMenuPosition = {
        getBoundingClientRect: () => {
          return getSelectedTableCellsRect(editor) || new DOMRect();
        },
      };

      this.onSelectionChanged(position);
      return;
    }

    if (selection && selection.type === 'range' && !selection.range.collapsed) {
      const range = selection.range;

      const position: BubbleMenuPosition = {
        getBoundingClientRect: () => {
          return range.getBoundingClientRect();
        },
      };

      this.onSelectionChanged(position);
    } else {
      this.onSelectionChanged(null);
    }
  }
}

export function createBubbleMenuPlugin(delayUpdateTime?: number): BubbleMenuPlugin {
  return new BubbleMenuPluginImpl(delayUpdateTime);
}
