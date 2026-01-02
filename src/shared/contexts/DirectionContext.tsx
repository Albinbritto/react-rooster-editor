import React from 'react';
import {
  DirectionProvider as RadixDirectionProvider,
  useDirection,
} from '@radix-ui/react-direction';

export { useDirection };

interface DirectionProviderProps {
  children: React.ReactNode;
  dir?: 'ltr' | 'rtl';
}

export const DirectionProvider: React.FC<DirectionProviderProps> = ({ children, dir = 'ltr' }) => {
  return <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>;
};
