import { getFormatState } from 'roosterjs-content-model-api';
import { getObjectKeys } from 'roosterjs-content-model-dom';
import type { ContentModelFormatState, IEditor, PluginEvent } from 'roosterjs-content-model-types';
import { ToolBarPlugin } from '../types/ToolBarPlugin.types';
import { ToolBarButton } from '../types/ToolBarButton.type';
import { UIUtilities } from '../../../shared/types/UIUtilities.type';

class ToolBarPluginImpl implements ToolBarPlugin {
  private editor: IEditor | null = null;
  private onFormatChanged: ((formatState: ContentModelFormatState) => void) | null = null;
  private timer = 0;
  private formatState: ContentModelFormatState | null = null;
  private uiUtilities: UIUtilities | null = null;

  constructor(private delayUpdateTime: number = 200) {}

  getName() {
    return 'ToolBar';
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

      case 'keyDown':
      case 'mouseUp':
        this.delayUpdate();
        break;
      case 'scroll':
        this.editor?.focus();
        break;
    }
  }

  registerFormatChangedCallback(callback: (formatState: ContentModelFormatState) => void) {
    this.onFormatChanged = callback;

    return () => {
      this.onFormatChanged = null;
    };
  }

  setUIUtilities(uiUtilities: UIUtilities) {
    this.uiUtilities = uiUtilities;
  }

  onButtonClick<T extends string>(button: ToolBarButton<T>, key: T) {
    if (this.editor && this.uiUtilities) {
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
}

export function createToolBarPlugin(delayUpdateTime?: number): ToolBarPlugin {
  return new ToolBarPluginImpl(delayUpdateTime);
}
