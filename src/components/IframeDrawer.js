import React, { Component } from "react";
import { Drawer, Button, Row, Col } from "antd";
import { AlignCenterOutlined, PlusOutlined } from "@ant-design/icons";
import getXPath from "https://unpkg.com/get-xpath/index.esm.js";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { extractXPathOrCss } from "../actions/canvasAreaAction";

class IframeDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      placement: "right",
      event: "",
      prev: "",
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.props.closed();
  };

  extractXpath = () => {
    var event = this.state.event;
    this.props.extractXPathOrCss(getXPath(event.target));
    //console.log(getXPath(event.target));
  };
  extractCss = () => {
    var event = this.state.event;
    var prev = this.state.prev;
    if (event.target === document.body || (prev && prev === event.target)) {
      return;
    }
    this.props.extractXPathOrCss(event.srcElement.className);
    //console.log(event.srcElement.className);

    if (prev) {
      this.setState({ prev: undefined });
    }
    if (event.target) {
      this.setState({ prev: event.target });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.clickFlag !== prevState.clickFlag) {
      return { visible: nextProps.clickFlag, event: nextProps.event };
    }
    return null;
  }

  render() {
    return (
      <div className="site-drawer-render-in-current-wrapper1">
        <Drawer
          title="YASH Scrapper"
          placement="right"
          autoFocus={false}
          // closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={false}
        >
          <Row>
            <Col span={24}>
              <Button>Add element to the step</Button>
            </Col>
            <Col span={24}>
              <Button onClick={this.extractCss}>Extract CSS selector</Button>
            </Col>
            <Col span={24}>
              <Button onClick={this.extractXpath}>Extract XPath</Button>
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}

IframeDrawer.propTypes = {
  extractXPathOrCss: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  //widgets: state.widgets.widgets,
});
export default connect(mapStateToProps, {
  extractXPathOrCss,
})(IframeDrawer);
