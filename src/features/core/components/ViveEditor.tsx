import { ViveToolBar } from './ViveToolBar';
import { ViveBubbleMenu } from './ViveBubbleMenu';
import { ContentEditable } from './ContentEditable';
import { createContext, useContext, useMemo } from 'react';
import { createToolBarPlugin } from '../../toolbar';
import { createFloatingMenuPlugin } from '../../floatingmenu';
import { createBubbleMenuPlugin } from '../../bubblemenu';
import { ThemeProvider } from '../../../shared/contexts/ThemeContext';
import { DirectionProvider } from '../../../shared/contexts/DirectionContext';
import { ViveEditorProps } from '../types/ViveEditor.type';
import { INITIAL_STATE } from '../../../shared/constants/Option';

type ViveEditorContextType = {
  toolBarPlugin: ReturnType<typeof createToolBarPlugin>;
  floatingMenuPlugin: ReturnType<typeof createFloatingMenuPlugin>;
  bubbleMenuPlugin: ReturnType<typeof createBubbleMenuPlugin>;
} & Pick<
  ViveEditorProps,
  | 'tableMenu'
  | 'imageMenu'
  | 'listMenu'
  | 'onSelectionChanged'
  | 'onEditorCreated'
  | 'onEditorDisposed'
  | 'tablePlugin'
  | 'autoFormatOptions'
  | 'editPluginOptions'
>;

const ViveEditorContext = createContext<ViveEditorContextType | undefined>(undefined);

export const useViveEditorContext = () => {
  const context = useContext(ViveEditorContext);
  if (!context) {
    throw new Error('useViveEditorContext must be used within ViveEditor');
  }
  return context;
};

export function ViveEditor(props: ViveEditorProps) {
  const {
    children,
    isDarkMode = false,
    dir = 'ltr',
    imageMenu,
    listMenu,
    onEditorCreated,
    onEditorDisposed,
    onSelectionChanged,
    tableMenu,
    tablePlugin,
    autoFormatOptions = {},
    editPluginOptions = {},
  } = props;

  const contextValue = useMemo(
    () => ({
      toolBarPlugin: createToolBarPlugin(),
      floatingMenuPlugin: createFloatingMenuPlugin(),
      bubbleMenuPlugin: createBubbleMenuPlugin(),
      tableMenu,
      imageMenu,
      listMenu,
      onSelectionChanged,
      onEditorCreated,
      onEditorDisposed,
      tablePlugin,
      autoFormatOptions: { ...INITIAL_STATE.autoFormatOptions, ...autoFormatOptions },
      editPluginOptions: { ...INITIAL_STATE.editPluginOptions, ...editPluginOptions },
    }),
    [
      tableMenu,
      imageMenu,
      listMenu,
      onSelectionChanged,
      onEditorCreated,
      onEditorDisposed,
      tablePlugin,
      autoFormatOptions,
      editPluginOptions,
    ]
  );

  return (
    <ViveEditorContext.Provider value={contextValue}>
      <DirectionProvider dir={dir}>
        <ThemeProvider isDarkMode={isDarkMode}>
          <div className='h-full flex flex-col vive-editor' dir={dir}>
            {children}
          </div>
        </ThemeProvider>
      </DirectionProvider>
    </ViveEditorContext.Provider>
  );
}

ViveEditor.ToolBar = ViveToolBar;
ViveEditor.BubbleMenu = ViveBubbleMenu;
ViveEditor.Content = ContentEditable;
