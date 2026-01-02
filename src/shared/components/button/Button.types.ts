import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonType = "primary" | "default" | "dashed" | "text" | "link";
export type ButtonSize = "small" | "middle" | "large";
export type ButtonShape = "default" | "circle" | "round";
export type ButtonHTMLType = "submit" | "button" | "reset";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Button type variant */
  type?: ButtonType;
  /** Button size */
  size?: ButtonSize;
  /** Button shape */
  shape?: ButtonShape;
  /** Icon element */
  icon?: ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Danger state (for delete/destructive actions) */
  danger?: boolean;
  /** Ghost style */
  ghost?: boolean;
  /** Block level button (full width) */
  block?: boolean;
  /** HTML button type */
  htmlType?: ButtonHTMLType;
  /** Custom className */
  className?: string;
  /** Children/content */
  children?: ReactNode;
}
