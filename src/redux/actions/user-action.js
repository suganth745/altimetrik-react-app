export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_RESET = "USER_LOGIN_RESET";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const ALL_USER_REQUEST = "ALL_USER_REQUEST";
export const EDIT_USER_REQUEST = "EDIT_USER_REQUEST";
export const EDIT_USER_DATA = "EDIT_USER_DATA";
export const SAVE_USER_REQUEST = "SAVE_USER_REQUEST";

export const USER_LOGOUT = "USER_LOGOUT";

export const user_login_action_request = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const user_login_action_success = (input) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: input,
  };
};

export const user_login_action_reset = () => {
  return {
    type: USER_LOGIN_RESET,
  };
};

export const user_login_action_failure = (input) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: input,
  };
};

export const user_logout_action = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const all_users_request = (input) => {
  return {
    type: ALL_USER_REQUEST,
    payload: input,
  };
};

export const edit_users_request = (input) => {
  return {
    type: EDIT_USER_REQUEST,
    payload: input,
  };
};

export const edit_user_data = (input) => {
  return {
    type: EDIT_USER_DATA,
    payload: input,
  };
};

export const save_users_request = (input) => {
  return {
    type: SAVE_USER_REQUEST,
    payload: input,
  };
};
