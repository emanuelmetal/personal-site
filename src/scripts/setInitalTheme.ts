export const script = (currentTheme: string) => {
  const defaultTheme = 'system';
  const el = document.documentElement;
  const systemThemes = ['light', 'dark'];
  const attribute = 'class';

  function updateDOM(theme: string) {
    const attributes = Array.isArray(attribute) ? attribute : [attribute];

    attributes.forEach((attr) => {
      const isClass = attr === 'class';

      if (isClass) {
        el.classList.remove(...systemThemes);
        el.classList.add(theme);
      } else {
        el.setAttribute(attr, theme);
      }
    });
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  try {
    const themeName = currentTheme || defaultTheme;
    const isSystem = themeName === 'system';
    const theme = isSystem ? getSystemTheme() : themeName;
    updateDOM(theme);
  } catch (e) {
    //
  }
};
