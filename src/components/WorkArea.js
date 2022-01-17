import React, { Component } from "react";
import { Col, Spin } from "antd";
import IframeDrawer from "./IframeDrawer";
import CanvasArea from "./widgets/CanvasArea";
import {
  SyncOutlined,
  Loading3QuartersOutlined,
  AlertTwoTone,
} from "@ant-design/icons";
import LOGO_PIC from "./../assests/images/yash-logo-new.svg";
import { connect } from "react-redux";

const antIcon = <Loading3QuartersOutlined spin style={{ fontSize: 24 }} />;

class WorkArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickFlag: false,
      event: "",
      loading: true,
      url: "yashScrapperDefault.html",
      visiblity: false,
    };
  }

  iframeHandler = (url) => {
    this.setState({ url });
    setTimeout(this.afterFrameDataLoader, 4000);
  };
  closed = () => {
    this.setState({ clickFlag: false });
  };
  clickHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ clickFlag: true, event: event });
  };
  mouseOverHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.target.style.opacity = 0.3;
  };
  mouseOutHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.target.style.opacity = 1;
  };

  hideSpinner = () => {
    this.setState({
      loading: true,
    });
  };

  afterFrameDataLoader = () => {
    var iframe = document.getElementById("poc_frame");
    iframe.contentWindow.addEventListener("click", this.clickHandler, true);
    iframe.contentWindow.addEventListener(
      "contextmenu",
      this.clickHandler,
      true
    );
    iframe.contentWindow.addEventListener(
      "mouseover",
      this.mouseOverHandler,
      true
    );
    iframe.contentWindow.addEventListener(
      "mouseout",
      this.mouseOutHandler,
      true
    );
  };

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.setState({ visiblity: false });
    }
  };

  componentDidMount() {
    //replace with some other logic to find out if web page being loaded inside the iframe
    document.addEventListener("keydown", this.escFunction, false);
    setTimeout(() => {
      this.setState({ loading: false });
    }, 4000);
    setTimeout(this.afterFrameDataLoader, 4000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    setTimeout(this.afterFrameDataLoader, 4000);
    return true;
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  onAimClickHandler = () => {
    this.setState({ visiblity: true });
  };
  onCssOrXPathClick = () => {
    this.setState({ visiblity: false });
  };
  render() {
    return (
      <div className="App">
        <div className="full-body px-1">
          <div className="site-area ">
            {this.state.loading ? (
              <Spin
                className="d-flex justify-content-center"
                size="large"
                indicator={antIcon}
              >
                <div className="d-flex justify-content-center">
                  <img src={LOGO_PIC} width={300} height={80} />
                </div>
                <h4 className="loading-text d-flex justify-content-center">
                  Please Wait While Processing Setup...
                </h4>
              </Spin>
            ) : (
              <Col span={24}>
                <iframe
                  id="poc_frame"
                  src={this.props.url}
                  title="Iframe Example"
                ></iframe>

                <IframeDrawer
                  clickFlag={this.state.clickFlag}
                  closed={this.closed}
                  event={this.state.event}
                />
              </Col>
            )}
          </div>

          <div id="main-canvas" className="canvas-area ">
            <Col span={24}>
              <div
                className={
                  this.state.visiblity
                    ? "main-hidden-canvas"
                    : "main-hidden-canvas-b"
                }
              >
                <p className="text-center display-5">Press ESC to escape</p>
              </div>
              <div class="card">
                <div class="card-body">
                  {/**  <WidgetDrawer />*/}
                  {/**  <WidgetTest />*/}
                  {/**<CanvasArea /> */}
                  <CanvasArea
                    onCssOrXPathClick={this.onCssOrXPathClick}
                    onAimClickHandler={this.onAimClickHandler}
                  />
                  {/*<CanvasWidgetDrawer />*/}
                </div>
              </div>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}
WorkArea.propTypes = {};
const mapStateToProps = (state) => ({
  url: state.widgets.url,
});
export default connect(mapStateToProps)(WorkArea);
