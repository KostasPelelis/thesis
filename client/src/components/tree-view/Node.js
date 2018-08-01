/*
* @flow
*/

import * as React from "react";

import { List, Icon, Input, Button, Divider } from "semantic-ui-react";

import NodeMenu from "./NodeMenu";

type Props = {
  node?: any,
  name: string,
  createNode: (nodeId: Array<string>, name: string) => void,
  editNode?: (nodeId: Array<string>, name: string) => void,
  deleteNode?: (nodeId: Array<string>, name: string) => void,
  style?: { [string]: any },
  id?: Array<string>
};

type State = {
  active: boolean,
  menuActive: boolean,
  isAddingNew: boolean,
  menuPos: { x: number, y: number }
};

const inputProps = {
  height: "25px"
};

class Node extends React.Component<Props, State> {
  state = {
    active: false,
    isAddingNew: false,
    menuActive: false,
    menuPos: { x: 0, y: 0 }
  };

  createNode = () => {
    const { createNode, id } = this.props;
    if (id) {
      createNode(id, "newNodeBuffer");
    }
    this.setState({ isAddingNew: false });
  };

  onAdd = () => {
    const { id } = this.props;
    this.setState({ isAddingNew: true });
  };

  disposeMenu = () => {
    this.setState({ menuActive: false, menuPos: { x: 0, y: 0 } });
  };

  onLeftClick = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  };

  onRightClick = (e: SyntheticMouseEvent<HTMLElement>) => {
    if (this.state.menuActive) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const x = 0;
    const y = 0;
    this.setState({ menuActive: true, menuPos: { x, y } });
    return false;
  };

  renderChildren = () => {
    const { node, style, createNode, id } = this.props;
    if (!node) {
      return;
    }

    return Object.keys(node).map((child: string, index: number): React.Node => {
      if (node[child] instanceof Object) {
        return (
          <Node
            createNode={createNode}
            editNode={createNode}
            deleteNode={createNode}
            node={node[child]}
            name={child}
            style={style}
            id={id ? [...id, child] : [child]}
            key={index}
          />
        );
      } else {
        return (
          <List.Item>
            <List.Content>
              <List.Header>{child}</List.Header>
              <List.Description>{node[child]}</List.Description>
            </List.Content>
          </List.Item>
        );
      }
    });
  };

  render(): React.Node {
    const { name, style, node, id, createNode } = this.props;
    const { active, menuActive, menuPos, isAddingNew } = this.state;
    return (
      <div style={{ position: "relative" }}>
        {menuActive && (
          <NodeMenu
            pos={menuPos}
            onAdd={this.onAdd}
            onClickOut={this.disposeMenu}
          />
        )}
        <List onContextMenu={this.onRightClick} style={style} divided>
          <List.Item>
            <List.Icon
              onClick={this.onLeftClick}
              name={`chevron ${active ? "down" : "right"}`}
            />
            <List.Content>
              <List.Header onClick={this.onLeftClick}>{name}</List.Header>
              {active && node && this.renderChildren()}
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default Node;
