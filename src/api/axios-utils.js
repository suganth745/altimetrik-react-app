import axios from "axios";
import { removeCookies, getCookies } from "../utils/cookies";

import createStore from "../redux/store";
import { user_logout_action } from "../redux/actions/user-action";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_API_URL;

axios.interceptors.request.use(
  function (config) {
    document.body.classList.add("loading-indicator");
    const auth_token = getCookies();
    console.log("🚀 ~ auth_token:", auth_token);

    if (auth_token) config.headers.Authorization = auth_token;
    const { user } = createStore.getState();

    if (user?.data) {
      config.headers["x-user"] = user?.data?.user_id;
    }
    return config;
  },
  function (error) {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    document.body.classList.remove("loading-indicator");
    return response;
  },
  (error) => {
    document.body.classList.remove("loading-indicator");
    if (error?.response?.status === 401) {
      removeCookies();
      createStore.dispatch(user_logout_action());
    }
    return Promise.reject(error?.response);
  }
);

export default axios;
