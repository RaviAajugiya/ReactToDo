export const setTheme = (theme) => {
  const root = document.documentElement;
  const themeVariables = {
    light: {
      "--bg": "#faf9f8",
      "--text": "#11100f",
      "--light-bg": "#ffffff",
      "--shadow": "rgba(0, 0, 0, 0.2)",
      "--border": "rgba(0, 0, 0, 0)",
      
    },
    dark: {
      "--bg": "#11100f",
      "--text": "#faf9f8",
      "--light-bg": "#252423",
      "--shadow": "rgba(255,255, 255, 0)",
      "--border": "#484644",
    },
  };

  const selectedTheme = themeVariables[theme];

  for (const [variable, value] of Object.entries(selectedTheme)) {
    root.style.setProperty(variable, value);
  }
};
