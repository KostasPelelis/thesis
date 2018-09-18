/*
* @flow
*/
import React from "react";
import renderField from "./renderField";
import { denormalizeList } from "../utils";

import type { Schema } from "../flow/FlowTypes";

type Props = {
  schema: Schema,
  name: string,
  onSubmit: ({ [key: string]: any }) => void
};

export default class DynamicForm extends React.Component<Props> {
  handleSubmit = (event: SyntheticMouseEvent<HTMLFormElement>) => {
    const { onSubmit } = this.props;
    event.preventDefault();
    const { elements } = event.target;
    let tuples = [];
    for (let i = 0; i < elements.length; ++i) {
      if (elements[i].nodeName === "INPUT") {
        // Hacky way for flow's bug in HTMLFormElement
        let { name, value } = (elements[i]: any);
        if (value !== "") {
          tuples = [...tuples, [name, value]];
        }
      }
    }
    const data = denormalizeList(tuples);
    onSubmit && onSubmit(data);
  };

  renderSchema = (name: string, schema: Schema): React$Element<any> => {
    return (
      <div className="form" onSubmit={this.handleSubmit}>
        <form>
          <React.Fragment key={name}>
            {renderField(schema.type, schema, name)}
          </React.Fragment>
          <button type="submit" className="button--submit">
            Submit
          </button>
        </form>
      </div>
    );
  };

  render() {
    const { schema, name } = this.props;
    return this.renderSchema(name, schema);
  }
}
