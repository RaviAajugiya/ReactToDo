export const showNotification = (title, options) => {
  new Notification(title, options);
  // if (Notification.permission === "granted") {
  // } else if (Notification.permission !== "denied") {
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       new Notification(title, options);
  //     }
  //   });
  // }
};
