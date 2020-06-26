import { combineReducers } from "redux";

import home from "./home.reducer";
import user from "./user.reducer";

export default combineReducers({
  home,
  user,
});
