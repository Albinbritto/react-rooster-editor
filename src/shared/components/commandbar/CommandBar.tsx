import React from "react";
import type { CommandBarProps, CommandBarItemType } from "./CommandBar.types";
import { CommandBarItemRenderer } from "./CommandBarItemRenderer";

export const CommandBar: React.FC<CommandBarProps> = ({
  items = [],
  className = "",
  style,
}) => {
  return (
    <div
      style={style}
      className={`
        flex items-center 
        whitespace-nowrap
        gap-1
        px-2 py-1
        bg-white dark:bg-gray-800
        border-b border-gray-200 dark:border-gray-700
        ${className}
      `.trim()}
      role="toolbar"
      aria-label="Command bar"
    >
      {items.map((item: CommandBarItemType) => (
        <div key={item.key}>
          <CommandBarItemRenderer key={item.key} item={item} />
        </div>
      ))}
    </div>
  );
};
