import React, { Component } from "react";
import ReactFlow from "react-flow-renderer";
import WidgetDrawer from "../WidgetDrawer";
import { Row, Col } from "antd";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { addWidgets } from "../../actions/canvasAreaAction";
import { v4 as uuidv4 } from "uuid";

class CanvasArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    //Having issues in arrow creation

    if (nextProps.widgets != undefined) {
      var len = nextProps.widgets.length;
      if (len > 1) {
        var sourceId = nextProps.widgets[len - 2].id;
        var targetId = nextProps.widgets[len - 1].id;
        var arrow = { id: uuidv4(), source: sourceId, target: targetId };
        nextProps.widgets.push(arrow);
      }
    }
    return true;
  }
  render() {
    const { widgets } = this.props;
    return (
      <div>
        <Row>
          <Col span={17}>
            <div style={{ height: "50vh", background: "#f6f4f4" }}>
              <ReactFlow
                onElementClick={this.openWidgetHandler}
                elements={widgets}
              />
            </div>
          </Col>
          <Col span={7}>
            <WidgetDrawer
              onCssOrXPathClick={this.props.onCssOrXPathClick}
              onAimClickHandler={this.props.onAimClickHandler}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

CanvasArea.propTypes = {
  addWidgets: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  widgets: state.widgets.widgets,
});
export default connect(mapStateToProps, {
  addWidgets,
})(CanvasArea);
