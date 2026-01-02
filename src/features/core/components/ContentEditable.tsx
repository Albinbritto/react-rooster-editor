import { Editor } from 'roosterjs-content-model-core';
import type { IEditor, EditorOptions, EditorPlugin } from 'roosterjs-content-model-types';
import { ContentEditableProps } from '../types/ViveEditor.type';
import { createUIUtilities } from '../../../shared/utils/createUIUtilities';
import { ReactEditorPlugin } from '../../../shared/types/ReactEditorPlugin.type';
import { useViveEditorContext } from './ViveEditor';
import {
  AutoFormatPlugin,
  EditPlugin,
  HyperlinkPlugin,
  ImageEditPlugin,
  MarkdownPlugin,
  PastePlugin,
  ShortcutPlugin,
  TableEditPlugin,
  TouchPlugin,
} from 'roosterjs-content-model-plugins';
import { createListEditMenuProvider, createTableEditMenuProvider } from '../../floatingmenu';
import { useEffect, useRef } from 'react';
import { FloatingMenu } from '../../floatingmenu/components/FloatingMenu';
import { TableReorderPlugin } from '../../tableedit';
import { createImageEditMenuProvider } from '../../floatingmenu/menus/createImageEditMenuProvider';
import { useThemeContext } from '../../../shared/contexts/ThemeContext';
import { getDarkColor } from 'roosterjs-color-utils';

export const ContentEditable = (props: ContentEditableProps) => {
  const editorDiv = useRef<HTMLDivElement>(null);
  const editor = useRef<IEditor | null>(null);
  const { toolBarPlugin, floatingMenuPlugin, bubbleMenuPlugin } = useViveEditorContext();
  const { isDarkMode } = useThemeContext();

  const { focusOnInit, editorCreator, plugins = [] } = props;

  function createDefaultPlugin() {
    const imageEditPlugin = new ImageEditPlugin();
    return [
      new AutoFormatPlugin(),
      new EditPlugin(),
      new HyperlinkPlugin(),
      new MarkdownPlugin(),
      new PastePlugin(),
      new ShortcutPlugin(),
      new TouchPlugin(),
      new TableEditPlugin(),
      new TableReorderPlugin(),
      imageEditPlugin,
      createTableEditMenuProvider(),
      createImageEditMenuProvider(imageEditPlugin),
      createListEditMenuProvider(),
    ];
  }

  useEffect(() => {
    if (editorDiv.current) {
      const pluginList = [
        ...plugins,
        ...createDefaultPlugin(),
        toolBarPlugin,
        floatingMenuPlugin,
        bubbleMenuPlugin,
      ];
      const uiUtilities = createUIUtilities(editorDiv.current);

      pluginList.forEach((plugin) => {
        if (isReactEditorPlugin(plugin)) {
          plugin.setUIUtilities(uiUtilities);
        }
      });

      editor.current = (editorCreator || defaultEditorCreator)(editorDiv.current, {
        ...props,
        plugins: pluginList,
        getDarkColor: props.getDarkColor || getDarkColor,
      });
      if (isDarkMode) {
        editor.current.setDarkModeState(isDarkMode);
      }
    }

    if (focusOnInit) {
      editor.current?.focus();
    }

    return () => {
      if (editor.current) {
        editor.current.dispose();
        editor.current = null;
      }
    };
  }, [editorCreator, plugins, toolBarPlugin, bubbleMenuPlugin, isDarkMode, floatingMenuPlugin]);

  return (
    <>
      <FloatingMenu plugin={floatingMenuPlugin}>
        <div
          ref={editorDiv}
          tabIndex={0}
          role='textbox'
          aria-multiline='true'
          className='vive-contenteditable w-full h-full p-4 bg-white overflow-auto focus:outline-none cursor-text leading-relaxed text-gray-900'
        />
      </FloatingMenu>
    </>
  );
};

function defaultEditorCreator(div: HTMLDivElement, options: EditorOptions) {
  return new Editor(div, options);
}

function isReactEditorPlugin(plugin: EditorPlugin): plugin is ReactEditorPlugin {
  return !!(plugin as ReactEditorPlugin)?.setUIUtilities;
}
