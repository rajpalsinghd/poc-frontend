import React, { Component } from "react";
import { Button, Form, Input, Row, Col, InputNumber } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { addWidgets } from "../../actions/canvasAreaAction";

class ClickWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputPlaceHolder: "Select CSS selector",
      selectorType: "CSS",
      buttonColor: "primary",
      clicks: "",
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

  onSubmitHandler = () => {
    var clickObj = {};
    clickObj.clicks = this.state.clicks;
    clickObj.label = "Click";
    clickObj[this.state.selectorType] = this.props.xpathOrCss;
    this.props.addWidgets(clickObj);
  };

  CssORXpathFeeder = (event) => {
    this.setState({ cssORxpath: event.target.value });
  };

  clickHandler = (event) => {
    this.setState({
      clicks: event.target.value,
    });
  };
  render() {
    var { xpathOrCss } = this.props;
    return (
      <div className="form-details-area">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
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
                  placeholder={this.state.inputPlaceHolder}
                  onChange={this.CssORXpathFeeder}
                  value={xpathOrCss}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            name="Clicks"
            label="Clicks"
            rules={[
              {
                required: true,
                message: "Please enter the no. of clicks!",
              },
            ]}
          >
            <Input
              min={1}
              max={10}
              placeholder="Enter the No. of clicks"
              onChange={this.clickHandler}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="login-form-button"
              type="primary"
              onClick={this.onSubmitHandler}
            >
              OK
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
ClickWidget.propTypes = {
  addWidgets: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  xpathOrCss: state.widgets.xpathOrCss,
});
export default connect(mapStateToProps, {
  addWidgets,
})(ClickWidget);
