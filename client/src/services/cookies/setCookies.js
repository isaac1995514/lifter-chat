const { default: Cookies } = require("universal-cookie");

export const setCookies = (cookiesObj) => {
  const cookies = new Cookies();

  for (const [key, value] of Object.entries(cookiesObj)) {
    cookies.set(key, value);
  }
};
