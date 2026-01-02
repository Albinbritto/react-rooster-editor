import { ReactNode, useEffect, useState } from 'react';
import { ContextMenu } from '../../../shared/components/contextmenu/ContextMenu';
import { ContextMenuItemType } from '../../../shared/components/contextmenu/ContextMenu.type';
import { FloatingMenuPlugin } from '../types/FloatingMenuPlugin.type';

export function FloatingMenu({
  children,
  plugin,
}: {
  children: ReactNode;
  plugin: FloatingMenuPlugin;
}) {
  const [items, setItems] = useState<ContextMenuItemType[]>([]);

  useEffect(() => {
    const disposer = plugin?.registerFloatingMenuOpenCallback(setItems);

    return () => {
      disposer?.();
    };
  }, [plugin]);

  return <ContextMenu items={items}>{children}</ContextMenu>;
}
