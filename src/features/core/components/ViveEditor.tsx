import { ViveToolBar } from './ViveToolBar';
import { ViveBubbleMenu } from './ViveBubbleMenu';
import { ContentEditable } from './ContentEditable';
import { createContext, ReactNode, useContext } from 'react';
import { createToolBarPlugin } from '../../toolbar';
import { createFloatingMenuPlugin } from '../../floatingmenu';
import { createBubbleMenuPlugin } from '../../bubblemenu';
import { ThemeProvider } from '../../../shared/contexts/ThemeContext';
import { DirectionProvider } from '../../../shared/contexts/DirectionContext';

interface ViveEditorProps {
  children: ReactNode;
  className?: string;
  isDarkMode?: boolean;
  dir?: 'ltr' | 'rtl';
}

const ToolBarPlugin = createToolBarPlugin();
const FloatingMenuPlugin = createFloatingMenuPlugin();
const BubbleMenuPlugin = createBubbleMenuPlugin();

const ViveEditorContext = createContext<{
  toolBarPlugin: typeof ToolBarPlugin;
  floatingMenuPlugin: typeof FloatingMenuPlugin;
  bubbleMenuPlugin: typeof BubbleMenuPlugin;
}>({
  toolBarPlugin: ToolBarPlugin,
  floatingMenuPlugin: FloatingMenuPlugin,
  bubbleMenuPlugin: BubbleMenuPlugin,
});

export const useViveEditorContext = () => useContext(ViveEditorContext);

export function ViveEditor({ children, isDarkMode = false, dir = 'ltr' }: ViveEditorProps) {
  return (
    <ViveEditorContext.Provider
      value={{
        toolBarPlugin: ToolBarPlugin,
        floatingMenuPlugin: FloatingMenuPlugin,
        bubbleMenuPlugin: BubbleMenuPlugin,
      }}
    >
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
