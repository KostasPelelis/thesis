/*
* @flow
*/

import * as React from "react";

import { Menu, Icon, Divider } from "semantic-ui-react";

const menuStyle = {
  background: "white",
  position: "absolute",
  width: "200px",
  zIndex: "100",
  fontFamily: "Lato"
};

type MenuProps = {
  onAdd?: () => void,
  onEdit?: () => void,
  onDelete?: () => void,
  onClickOut?: () => void,
  pos: { x: number, y: number }
};

class NodeMenu extends React.Component<MenuProps> {
  componentDidMount() {
    document.addEventListener("contextmenu", this.onClickOut);
    document.addEventListener("click", this.onClickOut);
  }

  componentWillUnmount = () => {
    document.removeEventListener("contextmenu", this.onClickOut);
    document.removeEventListener("click", this.onClickOut);
  };

  onClickOut = () => {
    const { onClickOut } = this.props;
    onClickOut && onClickOut();
  };

  render(): React.Node {
    const { onAdd, onEdit, onDelete, pos: { x, y } } = this.props;
    return (
      <Menu vertical>
        <Menu.Item onClick={() => onAdd && onAdd()}>
          <Icon color="green" name="plus" />Add New
        </Menu.Item>
        <Menu.Item onClick={() => onEdit && onEdit()}>
          <Icon color="yellow" name="pencil" />Edit
        </Menu.Item>
        <Divider fitted />
        <Menu.Item onClick={() => onDelete && onDelete()}>
          <Icon color="red" name="minus" />Delete
        </Menu.Item>
      </Menu>
    );
  }
}

export default NodeMenu;
