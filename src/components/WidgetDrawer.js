import React, { Component } from "react";
import { Drawer, Button, Menu, Row } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  LinkOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { executeFlow } from "../actions/canvasAreaAction";
import WidgetsDetailCard from "./widgets/WidgetsDetailCard";
const { SubMenu } = Menu;

class WidgetDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      placement: "right",
      label: "",
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onURLClick = (label) => {
    this.setState({
      visible: false,
      label,
    });
  };
  flow = () => {
    this.props.executeFlow(this.props.workflow);
  };
  render() {
    return (
      <div className="site-drawer-render-in-current-wrapper">
        <Row style={{ float: "right" }}>
          <div
            className="canvas-drawer-btn"
            style={{ marginTop: 8, marginRight: 10 }}
          >
            <Button type="primary">
              <PlayCircleOutlined onClick={this.flow} />
            </Button>
          </div>

          <div className="canvas-drawer-btn" style={{ marginTop: 8 }}>
            <Button type="primary" onClick={this.showDrawer}>
              <PlusOutlined />
            </Button>
          </div>
        </Row>

        {this.state.visible != true ? (
          <WidgetsDetailCard
            label={this.state.label}
            onCssOrXPathClick={this.props.onCssOrXPathClick}
            onAimClickHandler={this.props.onAimClickHandler}
          />
        ) : (
          <Drawer
            title="Widgets"
            placement="right"
            onClose={this.onClose}
            visible={this.state.visible}
            getContainer={false}
            style={{ position: "absolute" }}
          >
            <Menu style={{ margin: "0 0 0 -20px" }} mode="inline">
              <SubMenu key="navigation" title="Navigation">
                <Menu.Item
                  key="url"
                  onClick={() => this.onURLClick("Edit GoTo URL")}
                >
                  <LinkOutlined /> Edit Goto URL
                </Menu.Item>
              </SubMenu>
              <SubMenu key="input" title="Input">
                <Menu.Item
                  key="inputBox"
                  icon={<EditOutlined />}
                  onClick={() => this.onURLClick("Input")}
                >
                  Input Box
                </Menu.Item>

                <SubMenu key="mouse" title="Mouse">
                  <Menu.Item
                    key="click"
                    onClick={() => this.onURLClick("Click")}
                  >
                    <i class="fas fa-hand-pointer"></i> Click
                  </Menu.Item>
                  <Menu.Item
                    key="hover"
                    onClick={() => this.onURLClick("Hover")}
                  >
                    <i class="fas fa-mouse-pointer"></i> Hover
                  </Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu key="output" title="Output">
                <Menu.Item
                  key="extract"
                  onClick={() => this.onURLClick("Extract")}
                >
                  <i class="fas fa-spider"></i> Extract Values
                </Menu.Item>
              </SubMenu>
              <SubMenu key="iterations" title="Iterations">
                <Menu.Item key="Option1">Option 1</Menu.Item>
                <Menu.Item key="Option2">Option 2</Menu.Item>
              </SubMenu>

              <SubMenu key="captchaBypass" title="Captcha Bypass">
                <Menu.Item
                  key="Option11"
                  onClick={() => this.onURLClick("OCR")}
                >
                  Option 1
                </Menu.Item>
                <Menu.Item
                  key="Option12"
                  onClick={() => this.onURLClick("Google OCR")}
                >
                  Option 2
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Drawer>
        )}
      </div>
    );
  }
}
WidgetDrawer.propTypes = {
  addWidgets: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workflow: state.widgets.workflow,
});

export default connect(mapStateToProps, { executeFlow })(WidgetDrawer);
