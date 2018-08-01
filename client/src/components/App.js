/*
* @flow
*/

import * as React from "react";
import type Dispatch from "redux";
import { connect } from "react-redux";

import { Segment, Header, Transition, Icon } from "semantic-ui-react";

import Editor from "./Editor";
import CookbooksSegment from "./segments/Cookbooks";
import { Node } from "./tree-view";

import { EditorState } from "../state/EditorState";

import {
  fetchBlueprints,
  saveBlueprint,
  selectBlueprint,
  validateBlueprint,
  changeSegment,
  createNode,
  toggleEditor
} from "../actions";

import type { Blueprint, CursorPosition } from "../flow/FlowTypes";

type Props = EditorState;

type State = {
  validateTimeout: ?any,
  editorContent: string,
  showEditor: boolean
};

const treeViewStyle = {};

class App extends React.Component<Props, State> {
  state = {
    validateTimeout: null,
    editorContent: "",
    showEditor: true
  };

  componentWillMount() {
    this.props.fetchBlueprints();
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.selectedBlueprint !== null) {
      const content = JSON.stringify(
        newProps.selectedBlueprint.content,
        null,
        2
      );
      this.setState({ ...this.state, editorContent: content });
    }
  }

  onBlueprintClicked(idx: number) {
    this.props.selectBlueprint(this.props.blueprints[idx]);
  }

  onEditorChange(diff: string) {
    if (this.state.validateTimeout) {
      clearTimeout(this.state.validateTimeout);
    }

    // Trigger validation after 2 seconds of not typing
    const timeoutId = setTimeout(
      (): void => this.props.validateBlueprint(diff),
      2000
    );
    this.setState({
      ...this.state,
      editorContent: diff,
      validateTimeout: timeoutId
    });
  }

  onEditorCursorChange(cursorPos: CursorPosition) {
    const { segments, currentSegment } = this.props;
    if (!segments) {
      return;
    }
    for (let seg of Object.keys(segments)) {
      if (
        cursorPos.row >= segments[seg].start &&
        cursorPos.row <= segments[seg].end &&
        currentSegment !== seg
      ) {
        console.log(`Segment changed from ${currentSegment} to ${seg}`);
        this.props.changeSegment(seg);
      }
    }
  }

  segmentHelper(segmentName: string): React.Node {
    switch (segmentName) {
      case "Cookbooks":
        return <CookbooksSegment />;
      default:
        return null;
    }
  }

  toggleEditor = () => {
    this.props.toggleEditor();
  };

  render(): React.Node {
    console.log("render");
    const { editorContent } = this.state;
    const { createNode, nodes, selectedBlueprint, showEditor } = this.props;
    return (
      <div>
        <Icon onClick={this.toggleEditor}>
          {showEditor ? "Hide" : "Show"} Editor
        </Icon>
        <Segment.Group horizontal>
          <Transition
            visible={showEditor}
            animation="slide right"
            duration={500}
          >
            <Segment style={{ width: "50%" }}>
              <Header as="h3" dividing>
                Blueprint Editor
              </Header>
              <Editor
                content={editorContent}
                onChange={(diff: string): void => this.onEditorChange(diff)}
                onCursorChange={(cursorPos: any) =>
                  this.onEditorCursorChange(cursorPos)
                }
                errors={[]}
              />
            </Segment>
          </Transition>
          <Segment style={{ width: "50%" }}>
            <Header as="h3" dividing>
              Tree View
            </Header>

            {selectedBlueprint && (
              <Node
                createNode={createNode}
                style={treeViewStyle}
                name={selectedBlueprint.name}
                id={[]}
                node={selectedBlueprint.content}
              />
            )}
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

const mapStateToProps = (state: EditorState): Props => {
  return {
    showEditor: state.showEditor,
    selectedBlueprint: state.selectedBlueprint,
    blueprints: state.blueprints,
    segments: state.segments
  };
};

const bindActionsToDispatch = (dispatch: Dispatch): any => ({
  fetchBlueprints: (): Dispatch => dispatch(fetchBlueprints()),
  saveBlueprint: (blueprint: Blueprint): Dispatch =>
    dispatch(saveBlueprint(blueprint)),
  selectBlueprint: (blueprintId: number): Dispatch =>
    dispatch(selectBlueprint(blueprintId)),
  validateBlueprint: (content: string): Dispatch =>
    dispatch(validateBlueprint(content)),
  changeSegment: (segment: string): Dispatch =>
    dispatch(changeSegment(segment)),
  createNode: (nodeId: Array<number>, name: string): Dispatch =>
    dispatch(createNode(nodeId, name)),
  toggleEditor: (): Dispatch => dispatch(toggleEditor())
});

export default connect(mapStateToProps, bindActionsToDispatch)(App);
