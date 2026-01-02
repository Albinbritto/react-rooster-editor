import type { CommandBarItemType } from './CommandBar.types';
import { CommandBarButton } from './CommandBarButton';
import { CommandBarDropdown } from './CommandBarDropdown';
import { CommandBarDivider } from './CommandBarDivider';
import { CommandBarModal } from './CommandBarModal';

export const CommandBarItemRenderer: React.FC<{
  item: CommandBarItemType;
}> = ({ item }) => {
  switch (item.type) {
    case 'button':
      return <CommandBarButton item={item} />;
    case 'dropdown':
      return <CommandBarDropdown item={item} />;
    case 'divider':
      return <CommandBarDivider />;
    case 'modal':
      return <CommandBarModal item={item} />;
    default:
      return null;
  }
};
