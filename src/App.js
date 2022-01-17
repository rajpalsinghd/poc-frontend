import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WorkArea from "./components/WorkArea";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={WorkArea} />
        </Router>
      </Provider>
    );
  }
}
