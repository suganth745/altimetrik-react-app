import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_RESET,
  ALL_USER_REQUEST,
  EDIT_USER_REQUEST,
  SAVE_USER_REQUEST,
  EDIT_USER_DATA,
  USER_LOGOUT,
} from "./../actions/user-action";

const initState = {
  data: {},
  login: false,
  loading: false,
  error: false,
  errorData: {},
  users: [],
};

const user_reducer = (state = initState, { payload, type }) => {
  if (type === USER_LOGIN_REQUEST) {
    state = { ...state };
  }

  if (type === USER_LOGIN_SUCCESS) {
    state = { ...state, login: true, data: payload };
  }

  if (type === USER_LOGIN_RESET) {
    state = { ...state, login: false };
  }

  if (type === USER_LOGIN_FAILURE) {
    state = { ...state, error: true, errorData: payload };
  }

  if (type === ALL_USER_REQUEST) {
    state = { ...state, users: payload };
  }

  if (type === EDIT_USER_REQUEST) {
    const _users = [...state.users];
    const _index = _users.findIndex((o) => o._id === payload);

    _users[_index] = { ..._users[_index], edit: true };

    state = { ...state, users: _users };
  }

  if (type === SAVE_USER_REQUEST) {
    const _users = [...state.users];
    const _index = _users.findIndex((o) => o._id === payload);

    _users[_index] = { ..._users[_index], edit: false };

    state = { ...state, users: _users };
  }

  if (type === EDIT_USER_DATA) {
    const _users = [...state.users];
    const _index = _users.findIndex((o) => o._id === payload.id);

    _users[_index] = { ..._users[_index], [payload.name]: payload.value };

    state = { ...state, users: _users };
  }

  if (type === USER_LOGOUT) {
    state = initState;
  }

  return state;
};

export default user_reducer;
