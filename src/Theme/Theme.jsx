export const setTheme = (theme) => {
  const root = document.documentElement;
  const themeVariables = {
    light: {
      "--primary-background": "#faf9f8",
      "--secondary-background": "#ffffff",
      "--iteam-active": "#eff6fc",
      "--primary-text": "292827",
      "--secondary-text": "#605E5C",
      "--primary-color": "#3e69e4",
      "--header-color": "#3e69e4",
      "--color": "black",
    },
    //     $primary-color: #3e69e4;

    // $primary-background-light: #faf9f8;
    // $secondary-background-light: #ffffff;
    // $iteam-active-light: #eff6fc;
    // $primary-text-light: #292827;
    // $secondary-text-light: #605E5C;

    dark: {
      "--primary-background": "#11100f",
      "--secondary-background": "#252423",
      "--iteam-active": "#3b3a39",
      "--primary-text": "white",
      "--secondary-text": "#A19F9D",
      "--primary-color": "#3e69e4",
      "--header-color": "#1b1a19",
      "--color": "white",

      // "--bg": "#11100f",
      // "--text": "#faf9f8",
      // "--light-bg": "#252423",
      // "--shadow": "rgba(255,255, 255, 0)",
      // "--border": "#484644",
    },
  };

  const selectedTheme = themeVariables[theme];

  for (const [variable, value] of Object.entries(selectedTheme)) {
    root.style.setProperty(variable, value);
  }
};
