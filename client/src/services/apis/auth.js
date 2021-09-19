import axios from "axios";
import Cookies from "universal-cookie";

import { baseUrl } from "../../config/baseUrl";

const cookies = new Cookies();

export const postUserLogin = async (form) => {
  const api = `${baseUrl}/auth/login`;

  const {
    data: { token, fullName, userName, userId },
  } = await axios.post(api, {
    username: form.email,
    password: form.password,
  });

  cookies.set("token", token);
  cookies.set("userId", userId);
  cookies.set("username", userName);
  cookies.set("fullName", fullName);
};

export const postUserSignup = async (form) => {
  const api = `${baseUrl}/auth/signup`;

  const {
    data: { token, userId, hashedPassword },
  } = await axios.post(`${api}`, {
    username: form.email,
    password: form.password,
    fullName: `${form.firstName} ${form.lastName}`,
  });

  cookies.set("token", token);
  cookies.set("userId", userId);
  cookies.set("username", form.email);
  cookies.set("fullName", `${form.firstName} ${form.lastName}`);
  cookies.set("hashedPassword", hashedPassword);
};
