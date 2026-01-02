import React, { createContext, useContext } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
});

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  isDarkMode: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, isDarkMode }) => {
  const themedChildren = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<any>, {
        className: `${(children.props as any)?.className || ''} ${isDarkMode ? 'dark' : ''}`.trim(),
        'data-theme': isDarkMode ? 'dark' : 'light',
      })
    : children;

  return <ThemeContext.Provider value={{ isDarkMode }}>{themedChildren}</ThemeContext.Provider>;
};
