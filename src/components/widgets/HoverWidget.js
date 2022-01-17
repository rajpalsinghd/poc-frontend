import React, { Component } from "react";
import { Button, Form, Input, Row, Col } from "antd";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { addWidgets } from "../../actions/canvasAreaAction";
import { AimOutlined } from "@ant-design/icons";
import { StaticRouter } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";

class HoverWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPlaceHolder: "Select CSS selector",
      selectorType: "CSS",
      buttonColor: "primary",
      cssORxpath: "",
    };
  }
  selectorHandler = (type) => {
    var buttonColor = "";
    if (type === "CSS") {
      type = "XPath";
      buttonColor = "danger";
    } else {
      type = "CSS";
      buttonColor = "primary";
    }

    var inputPlaceHolder = "Select " + type + " selector";

    this.setState({ selectorType: type, inputPlaceHolder, buttonColor });
  };

  CssORXpathFeeder = (event) => {
    this.setState({ cssORxpath: event.target.value });
  };

  iframeSelectorHandler = () => {
    this.props.onAimClickHandler();
  };

  hoverHandler = () => {
    var hoverObj = {};
    hoverObj.label = "Hover";
    hoverObj[this.state.selectorType] = this.props.xpathOrCss;
    this.props.addWidgets(hoverObj);
  };

  render() {
    var { xpathOrCss } = this.props;
    console.log("66", xpathOrCss);
    return (
      <div className="form-details-area">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          //   onFinish={this.onFinish}
        >
          <Form.Item
            name="Css/Xpath"
            rules={[{ required: true, message: "Please Select Css/Xpath!" }]}
          >
            <Row gutter={[16, 4]}>
              <Col xs={24} sm={24} md={8} lg={3} xl={3}>
                <Form.Item shouldUpdate>
                  <Button
                    className="ms-2 aim-button"
                    type="button"
                    onClick={this.iframeSelectorHandler}
                  >
                    <AimOutlined />
                  </Button>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={5} xl={5}>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      type={this.state.buttonColor}
                      onClick={() =>
                        this.selectorHandler(this.state.selectorType)
                      }
                    >
                      {this.state.selectorType}
                    </Button>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8} lg={16} xl={16}>
                <Input
                  value={xpathOrCss}
                  placeholder={this.state.inputPlaceHolder}
                  onChange={this.CssORXpathFeeder}
                />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="login-form-button"
              type="primary"
              onClick={this.hoverHandler}
            >
              OK
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

HoverWidget.propTypes = {
  addWidgets: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  xpathOrCss: state.widgets.xpathOrCss,
});

export default connect(mapStateToProps, { addWidgets })(HoverWidget);
