import React, { Component } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { addWidgets } from "../../actions/canvasAreaAction";
import { AimOutlined } from "@ant-design/icons";

class InputWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputPlaceHolder: "Select CSS selector",

      selectorType: "CSS",

      buttonColor: "primary",
      text: "",
      cssORxpath: "",
    };
  }

  iframeSelectorHandler = () => {
    this.props.onAimClickHandler();
  };
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
  InputFeeder = (event) => {
    this.setState({ text: event.target.value });
  };
  CssORXpathFeeder = (event) => {
    this.setState({ cssORxpath: event.target.value });
  };
  InputWidgetHandler = () => {
    var InputObj = {};
    InputObj.label = "Input";
    InputObj.text = this.state.text;
    InputObj[this.state.selectorType] = this.props.xpathOrCss;
    this.props.addWidgets(InputObj);
  };
  showmodal = () => {
    console.log("disable the div");
  };
  aimHandler = () => {
    console.log("hii 60");
    this.props.onAimClickHandler();
  };
  render() {
    var { xpathOrCss } = this.props;
    return (
      <div className="form-details-area">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Text"
            name="text"
            rules={[
              {
                required: true,
                message: "Please input text!",
              },
            ]}
          >
            <Input placeholder="Enter Input" onChange={this.InputFeeder} />
          </Form.Item>
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
                    onClick={this.aimHandler}
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
                {/* <Input
                  //   prefix={<UserOutlined className="site-form-item-icon" />}
                  onChange={this.extractHandle}
                  placeholder={this.state.inputPlaceHolder}
                /> */}
                <Input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="CSSorXpath"
                  value={xpathOrCss}
                />
              </Col>
            </Row>
          </Form.Item>{" "}
          <Form.Item>
            <Button
              type="primary"
              className="login-form-button"
              onClick={this.InputWidgetHandler}
            >
              OK
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

InputWidget.propTypes = {
  addWidgets: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  xpathOrCss: state.widgets.xpathOrCss,
});
export default connect(mapStateToProps, {
  addWidgets,
})(InputWidget);
