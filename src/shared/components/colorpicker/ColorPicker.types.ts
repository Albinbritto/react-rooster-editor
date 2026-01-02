export interface ColorPickerProps {
  /** Current selected color value */
  value: string;
  /** Callback when color changes */
  onChange: (color: string) => void;
  /** Array of system/preset colors */
  systemColors?: string[];
  /** Array of custom colors */
  customColors?: string[];
  /** Callback when a custom color is added */
  onCustomColorAdd?: (color: string) => void;
  /** Label for the color picker */
  label?: string;
  /** Show the color value text */
  showColorText?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Custom className */
  className?: string;
}
