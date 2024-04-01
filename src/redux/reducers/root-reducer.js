import { combineReducers } from "redux";
import user_reducer from "./user-reducer";

const rootReducer = combineReducers({
  user: user_reducer,
});

export default rootReducer;
