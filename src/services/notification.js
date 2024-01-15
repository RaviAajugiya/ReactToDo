const showNotification = (title, options) => {
  if (Notification.permission === "granted") {
    new Notification(title, options);
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, options);
      }
    });
  }
};

export default showNotification;