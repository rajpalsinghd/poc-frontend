import React, { Component } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined, AimOutlined } from "@ant-design/icons";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
class ExtractValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPlaceHolder: "Select CSS selector",
      selectorType: "CSS",
      buttonColor: "primary",
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
  extractHandler = () => {
    var hoverObj = {};
    var types = this.state.selectorType;
    hoverObj.label = "Hover";
    if (types == "CSS") {
      hoverObj.css = this.state.cssORxpath;
    } else {
      hoverObj.xpath = this.state.cssORxpath;
    }
    this.props.addElements(hoverObj);
    console.log("test", hoverObj);
  };
  render() {
    var { xpathOrCss } = this.props;
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
            <Row>
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
              onClick={this.extractHandler}
            >
              OK
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
ExtractValue.propTypes = {};
const mapStateToProps = (state) => ({
  xpathOrCss: state.widgets.xpathOrCss,
});
export default connect(mapStateToProps, {})(ExtractValue);
