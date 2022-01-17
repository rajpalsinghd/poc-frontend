import React, { Component } from "react";
import { Row, Col } from "antd";
import InputWidget from "./InputWidget";
import HoverWidget from "./HoverWidget";
import URLWidget from "./URLWidget";
import ExtractValue from "./ExtractValue";
import ClickWidget from "./ClickWidget";
export default class WidgetsDetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      displayDiv: "none",
    };
  }

  closeWidgetDetailCard = () => {
    this.setState({ displayDiv: "none" });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.label !== prevState.label) {
      return { label: nextProps.label, displayDiv: "" };
    }
    return null;
  }
  render() {
    return (
      <div className="widget-detail-card">
        <div
          className=" card p-3 mt-5 mx-2"
          style={{ display: this.state.displayDiv }}
        >
          <div class="card-body">
            <Row>
              <Col span={20}>
                <h5 className="widegt-title">{this.state.label}</h5>
              </Col>
              <Col span={4}>
                <div
                  style={{ float: "right" }}
                  onClick={this.closeWidgetDetailCard}
                  class="outer"
                >
                  <div class="inner">
                    <label className="label-cross">Close</label>
                  </div>
                </div>
              </Col>
            </Row>
            <hr />
            {(() => {
              switch (this.state.label) {
                case "Input":
                  return (
                    <InputWidget
                      onCssOrXPathClick={this.props.onCssOrXPathClick}
                      onAimClickHandler={this.props.onAimClickHandler}
                    />
                  );
                case "Hover":
                  return (
                    <HoverWidget
                      onCssOrXPathClick={this.props.onCssOrXPathClick}
                      onAimClickHandler={this.props.onAimClickHandler}
                    />
                  );
                case "Edit GoTo URL":
                  return <URLWidget />;
                case "Extract":
                  return (
                    <ExtractValue
                      onCssOrXPathClick={this.props.onCssOrXPathClick}
                      onAimClickHandler={this.props.onAimClickHandler}
                    />
                  );

                case "Click":
                  return (
                    <ClickWidget
                      onCssOrXPathClick={this.props.onCssOrXPathClick}
                      onAimClickHandler={this.props.onAimClickHandler}
                    />
                  );
                default:
                  return "";
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}
