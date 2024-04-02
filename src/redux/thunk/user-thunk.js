import { allUsersApi, loginApi, updateUserApi } from "../../api/methods";
import { setCookies, removeCookies } from "../../utils/cookies";
import { responseToastMsg } from "../../utils/response-message";

import {
  user_login_action_request,
  user_login_action_success,
  user_login_action_failure,
  user_logout_action,
  user_login_action_reset,
  all_users_request,
  save_users_request,
} from "../actions/user-action";

export const user_login_thunk = (input) => {
  return async (dispatch) => {
    try {
      dispatch(user_login_action_request());

      const result = await loginApi(input);

      if (result.status === 200) {
        responseToastMsg(result?.data?.response_code);

        setCookies(result.data.data.token);

        dispatch(
          user_login_action_success({
            ...result.data,
          })
        );
      }
    } catch (err) {
      console.log("🚀 ~ file: user-thunk.js ~ line 33 ~ return ~ err", err);
      responseToastMsg(err?.data?.error);

      dispatch(user_login_action_failure(err));
    }
  };
};

export const get_all_users_thunk = () => {
  return async (dispatch) => {
    try {
      const result = await allUsersApi();

      if (result.status === 200) {
        const _res = result.data?.data?.map((o) => ({ ...o, edit: false }));

        dispatch(all_users_request(_res));
      }
    } catch (err) {
      console.log("🚀 ~ file: user-thunk.js ~ line 33 ~ return ~ err", err);
      responseToastMsg(err?.data?.error);
    }
  };
};

export const update_users_thunk = (id, input) => {
  return async (dispatch) => {
    try {
      const result = await updateUserApi(id, input);

      dispatch(save_users_request(id));
    } catch (err) {
      console.log("🚀 ~ file: user-thunk.js ~ line 33 ~ return ~ err", err);
      responseToastMsg(err?.data?.error);
    }
  };
};

export const user_logout_thunk = () => {
  return async (dispatch) => {
    removeCookies();
    dispatch(user_logout_action());
  };
};

export const user_login_reset_thunk = () => {
  return async (dispatch) => {
    try {
      dispatch(user_login_action_reset());
    } catch (err) {
      console.log("🚀 ~ file: user_thunk.js ~ line 58 ~ return ~ err", err);
    }
  };
};
