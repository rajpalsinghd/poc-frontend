import { combineReducers } from "redux";
import canvasAreaReducer from "./canvasAreaReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  errors: errorReducer,
  widgets: canvasAreaReducer,
});
