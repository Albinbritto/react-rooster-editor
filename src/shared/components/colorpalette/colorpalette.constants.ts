export const VIEW_MODES = {
  LIST: 'list',
  ADD: 'add',
} as const;

export type ViewModeValue = (typeof VIEW_MODES)[keyof typeof VIEW_MODES];
