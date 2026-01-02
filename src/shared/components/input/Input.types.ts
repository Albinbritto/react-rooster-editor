import { InputHTMLAttributes } from "react";

export type InputSize = "small" | "middle" | "large";
export type InputStatus = "error" | "warning";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /** Input size variant */
  size?: InputSize;
  /** Input status for validation feedback */
  status?: InputStatus;
  /** Prefix element */
  prefix?: React.ReactNode;
  /** Suffix element */
  suffix?: React.ReactNode;
  /** Allow clear input */
  allowClear?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Custom className */
  className?: string;
  /** Full width */
  fullWidth?: boolean;
}
