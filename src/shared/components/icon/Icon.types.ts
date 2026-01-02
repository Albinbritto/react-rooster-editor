import React from "react";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as RadixIcons from "react-icons/rx";

type FaIconName = keyof typeof FaIcons;
type Fa6IconName = keyof typeof Fa6Icons;
type RadixIconName = keyof typeof RadixIcons;
export type FontAwesomeIconName = FaIconName | Fa6IconName | RadixIconName;

export interface IconProps {
  name: FontAwesomeIconName;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  title?: string;
  isActive?: boolean;
}
