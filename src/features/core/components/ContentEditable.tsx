import { Editor } from 'roosterjs-content-model-core';
import type { IEditor, EditorOptions } from 'roosterjs-content-model-types';
import { ContentEditableProps } from '../types/ViveEditor.type';
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
import { CorePlugin } from '../plugins/CorePlugin';

export const ContentEditable = (props: ContentEditableProps) => {
  const editorDiv = useRef<HTMLDivElement>(null);
  const editor = useRef<IEditor | null>(null);
  const { toolBarPlugin, floatingMenuPlugin, bubbleMenuPlugin } = useViveEditorContext();
  const { isDarkMode } = useThemeContext();

  const {
    focusOnInit,
    editorCreator,
    plugins = [],
    tableMenuOption,
    imageMenuOption,
    listMenuOption,
    onSelectionChanged,
  } = props;

  function createDefaultPlugin() {
    const imageEditPlugin = imageMenuOption?.show && new ImageEditPlugin();
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
      new CorePlugin(onSelectionChanged),
      imageEditPlugin,
      tableMenuOption?.show && createTableEditMenuProvider(tableMenuOption),
      imageEditPlugin && createImageEditMenuProvider(imageEditPlugin, imageMenuOption),
      listMenuOption?.show && createListEditMenuProvider(listMenuOption),
    ].filter((plugin) => !!plugin);
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
    <FloatingMenu plugin={floatingMenuPlugin}>
      <div
        ref={editorDiv}
        tabIndex={0}
        role='textbox'
        aria-multiline='true'
        className='vive-contenteditable w-full h-full p-4 bg-white overflow-auto focus:outline-none cursor-text leading-relaxed text-gray-900'
      />
    </FloatingMenu>
  );
};

function defaultEditorCreator(div: HTMLDivElement, options: EditorOptions) {
  return new Editor(div, options);
}
