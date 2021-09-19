import axios from "axios";

import { baseUrl } from "../../config/baseUrl";

import { setCookies } from "../../services/cookies";

export const postUserLogin = async (form) => {
  const api = `${baseUrl}/auth/login`;

  const {
    data: { token, fullName, username, userId },
  } = await axios.post(api, {
    username: form.email,
    password: form.password,
  });

  setCookies({
    token,
    userId,
    username,
    fullName,
  });
};

export const postUserSignup = async (form) => {
  const api = `${baseUrl}/auth/signup`;

  const {
    data: { token, fullName, username, userId, hashedPassword },
  } = await axios.post(`${api}`, {
    username: form.email,
    password: form.password,
    fullName: `${form.firstName} ${form.lastName}`,
  });

  setCookies({
    token,
    fullName,
    username,
    userId,
    hashedPassword: hashedPassword,
  });
};
