function check_deactivator(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.href = "/login.html";
}

(() => {
  let deactivated_by_admin = check_deactivator("deactivated_by_admin");
//   alert(deactivated_by_admin);
  if(deactivated_by_admin)return window.location.replace("/inactive2.html");
})();
