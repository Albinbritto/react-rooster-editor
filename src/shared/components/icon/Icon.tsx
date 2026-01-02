import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as RadixIcons from 'react-icons/rx';
import { IconProps } from './Icon.types';

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  color,
  className = '',
  style = {},
  onClick,
  title,
  isActive = false,
}) => {
  const IconComponent =
    (Fa6Icons as any)[name] || (FaIcons as any)[name] || (RadixIcons as any)[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in react-icons/fa, react-icons/fa6, or react-icons/rx`);
    return null;
  }

  const activeClasses = isActive ? 'bg-blue-100 rounded' : '';

  const combinedClassName = `${activeClasses} ${className} cursor-pointer p-1 font-semibold`.trim();

  return (
    <div className={combinedClassName}>
      <IconComponent size={size} color={color} style={style} onClick={onClick} title={title} />
    </div>
  );
};
