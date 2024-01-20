export const setTheme = (theme) => {
  const root = document.documentElement;
  const themeVariables = {
    light: {
      "--bg": "#faf9f8",
      "--primary": "#000000",
    },
    dark: {
      "--bg": "#000000",
      "--primary": "#faf9f8",
    },
  };

  const selectedTheme = themeVariables[theme];

  for (const [variable, value] of Object.entries(selectedTheme)) {
    root.style.setProperty(variable, value);
  }
};
