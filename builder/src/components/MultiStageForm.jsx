/*
* @flow
*/
import React from "react";
import DynamicForm from "./DynamicForm.jsx";

import schema from "../schema.json";

type Props = {};
type State = {
  values: { [string]: { [string]: any } },
  currentStage: number
};

export default class MultiStageForm extends React.Component<Props, State> {
  state = {
    values: {},
    currentStage: 0
  };

  onSubmit = (data: { [key: string]: any }) => {
    let { currentStage, values } = this.state;
    const stages = Object.keys(schema.properties);
    const stage = stages[currentStage];

    if (currentStage < stages.length - 1) {
      currentStage++;
    }
    this.setState({
      values: {
        ...values,
        [stage]: data
      },
      currentStage
    });
  };

  render() {
    const { currentStage } = this.state;

    const key = Object.keys(schema.properties)[currentStage];
    return (
      <DynamicForm
        schema={schema.properties[key]}
        name={key}
        onSubmit={this.onSubmit}
      />
    );
  }
}
