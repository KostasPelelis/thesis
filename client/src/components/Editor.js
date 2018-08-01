/*
* @flow
*/

import ace from "brace";

import * as React from "react";
import AceEditor from "react-ace";

import { BlueprintError, CursorPosition } from "../flow/FlowTypes";

import "brace/mode/json";
import "brace/theme/github";

import "./Editor.css";

type Props = {
  content: string,
  errors: Array<BlueprintError>,
  onChange: any,
  onCursorChange: any => CursorPosition
};

class Editor extends React.Component<Props> {
  onChange(diff: string) {
    if (this.props.onChange) {
      this.props.onChange(diff);
    }
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.errors) {
      this.setErrors(newProps.errors);
    }
  }

  setErrors(errors: Array<BlueprintError>) {
    const annotations = errors.map((error: BlueprintError): any =>
      Object.assign(
        {},
        {
          row: error.lineNumber,
          column: 0,
          text: error.errors.join("\n"),
          type: "error"
        }
      )
    );
    this.refs.aceEditor.editor.getSession().setAnnotations(annotations);
  }

  onCursorChange(selection: any) {
    if (this.props.onCursorChange) {
      this.props.onCursorChange({
        row: selection.lead.row,
        col: selection.lead.column
      });
    }
  }

  render(): React.Node {
    const { content } = this.props;
    return (
      <AceEditor
        ref="aceEditor"
        style={{ width: "100%" }}
        mode="json"
        theme="github"
        onCursorChange={(selection: any) => this.onCursorChange(selection)}
        onChange={(diff: string): void => this.onChange(diff)}
        name="editor"
        editorProps={{ $blockScrolling: true }}
        value={content}
      />
    );
  }
}

export default Editor;
