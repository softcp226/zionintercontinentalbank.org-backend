document.querySelector("#ring").onclick = () => {
  if (document.querySelector(".no-notification")) {
    document.querySelector(".no-notification").className = "notification";
  } else {
    document.querySelector(".notification").className = "no-notification";
  }
};

document.querySelector("#person-image").onclick = () => {
  if (document.querySelector(".no-notification_02")) {
    document.querySelector(".no-notification_02").className = "notification_02";
  } else {
    document.querySelector(".notification_02").className = "no-notification_02";
  }
};

const log_user_out = () => {
  document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "is_active=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "/login.html";
};

document.querySelector("#logout").onclick = () => log_user_out();
