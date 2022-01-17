import {
  GET_ERRORS,
  ADD_WIDGETS,
  EXTRACT_SELECTOR,
  ADD_URL_WIDGET,
} from "./../actions/type";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  widgets: [
    {
      id: uuidv4(),
      sourcePosition: "right",
      type: "input", // input node
      data: { label: "Goto URL" },
      position: { x: 10, y: 100 },
    },
  ],
  xpathOrCss: "",
  url: "yashScrapperDefault.html",
  workflow: {
    1: { action: "Goto URL", url: "yashScrapperDefault.html" },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case ADD_WIDGETS:
      var seq = action.payload[1]["sequence"];
      var w = state.workflow;
      w[seq] = action.payload[1];
      console.log("33", state);
      return {
        ...state,
        widgets: [...state.widgets, action.payload[0]],
        workflow: w,
      };
    case EXTRACT_SELECTOR:
      return {
        ...state,
        xpathOrCss: action.payload,
      };
    case ADD_URL_WIDGET:
      var urlAction = state.workflow;
      urlAction[1].url = action.payload;
      return {
        ...state,
        url: action.payload,
        workflow: urlAction,
      };
    default:
      return state;
  }
}
