import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { addWidgets } from "../../actions/canvasAreaAction";

class URLWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };
  }
  urlHandler = (event) => {
    this.setState({
      url: event.target.value,
    });
  };
  onClickHandler = () => {
    var urlObj = {};
    urlObj.url = this.state.url;
    urlObj.label = "GoTo URL";
    this.props.addWidgets(urlObj);
  };
  render() {
    return (
      <div className="form-details-area">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="url"
            label="URL"
            rules={[
              {
                required: true,
                message: "Please enter the URL!",
              },
              {
                type: "url",
                message: "Please enter valid URL!",
              },
            ]}
          >
            <Input
              defaultValue={this.props.url}
              placeholder="Enter the URL here"
              onChange={this.urlHandler}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="login-form-button"
              onClick={this.onClickHandler}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

URLWidget.propTypes = {
  addWidgets: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  url: state.widgets.url,
});
export default connect(mapStateToProps, {
  addWidgets,
})(URLWidget);
