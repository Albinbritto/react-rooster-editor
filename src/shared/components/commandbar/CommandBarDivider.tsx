import * as Separator from "@radix-ui/react-separator";

export const CommandBarDivider: React.FC = () => {
  return (
    <Separator.Root
      decorative
      orientation="vertical"
      className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"
    />
  );
};
