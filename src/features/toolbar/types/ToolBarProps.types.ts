import { CommandBarProps } from '../../../shared/components/commandbar/CommandBar.types';
import { ToolBarPlugin } from './ToolBarPlugin.types';
import { ToolBarButton } from './ToolBarButton.type';

export interface ToolBarProps<T extends string> extends Partial<CommandBarProps> {
  /**The plugin which act as a source for ToolBar actions to editor */
  plugin: ToolBarPlugin;

  /**List of button groups to display on the toolbar. Each group is separated by a divider. */
  buttons?: ToolBarButton<T>[][];
}
