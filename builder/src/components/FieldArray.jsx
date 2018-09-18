/*
* @flow
*/
import React from "react";

import type { Schema } from "../flow/FlowTypes";

type Props = {
  fieldSchema: any,
  renderField: (string, Schema, string) => ?React$Element<any>,
  name: string
};

type State = {
  fields: number
};

export default class FieldArray extends React.Component<Props, State> {
  state = {
    fields: 1
  };

  addMore = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ fields: this.state.fields + 1 });
  };

  pop = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ fields: this.state.fields - 1 });
  };

  render() {
    const { fields } = this.state;
    const { fieldSchema, renderField, name } = this.props;
    return (
      <React.Fragment>
        {[...Array(fields).keys()].map(index => (
          <div className="block" key={index}>
            {renderField(fieldSchema.type, fieldSchema, `${name}-[${index}]`)}
            {fields > 1 &&
              index === fields - 1 && (
                <button className="button--negative" onClick={this.pop}>
                  -
                </button>
              )}
          </div>
        ))}
        <button className="button" onClick={this.addMore}>
          +
        </button>
      </React.Fragment>
    );
  }
}
