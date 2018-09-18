/*
* @flow
*/
import React from "react";
import { normalizeName } from "../utils";

import type { InputType } from "../flow/FlowTypes";

type Props = {
  name: string,
  type: InputType
};

export default class Input extends React.Component<Props> {
  render() {
    const { name, type } = this.props;
    return (
      <React.Fragment>
        <input
          className="field--input"
          type={type}
          name={name}
          placeholder={normalizeName(name)}
        />
      </React.Fragment>
    );
  }
}
