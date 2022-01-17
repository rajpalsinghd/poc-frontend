import {
  ADD_WIDGETS,
  GET_ERRORS,
  EXTRACT_SELECTOR,
  ADD_URL_WIDGET,
} from "./type";
import { v4 as uuidv4 } from "uuid";
var x = 200;
var y = 100;
var sequence = 2;
var curr = 0;

function createWidgetObj(label) {
  let position = { x, y };
  let id = uuidv4();
  let newElement = {};
  newElement["sourcePosition"] = "right";
  newElement["targetPosition"] = "left";
  newElement.className = "dark-node";
  newElement.id = id;
  newElement.data = { label };
  newElement.position = position;
  newElement.key = id;
  // let arrows = null;
  x += 200;
  // curr += 1;
  return newElement;
}

export const addWidgets = (widget) => async (dispatch) => {
  let label = widget.label;
  let widgetJson = {};
  widgetJson["action"] = label;
  widgetJson["sequence"] = sequence;
  if (widget["CSS"]) {
    widgetJson["CSS"] = widget["CSS"];
  }
  if (widget["XPath"]) {
    widgetJson["XPath"] = widget["XPath"];
  }

  sequence += 1;

  if (label === "Input") {
    widgetJson["input"] = widget.text;
  }

  if (label === "Click") {
    widgetJson["clicks"] = widget.clicks;
  }

  if (label === "GoTo URL") {
    sequence -= 1;
    try {
      console.log(widget.url);
      dispatch({
        type: ADD_URL_WIDGET,
        payload: widget.url,
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  } else {
    let result = createWidgetObj(label);
    try {
      dispatch({
        type: ADD_WIDGETS,
        payload: [result, widgetJson],
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    }
  }
};

export const extractXPathOrCss = (xpathOrCss) => async (dispatch) => {
  try {
    dispatch({
      type: EXTRACT_SELECTOR,
      payload: xpathOrCss,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error,
    });
  }
};

export const executeFlow = (workflow) => async (dispatch) => {
  console.log("API calling required inside action", workflow);
};
