/*
* @flow
*/
import React from "react";

import { normalizeName } from "../utils";

type Option = {
  label: any,
  value: any
};

type Props = {
  options: Array<Option>,
  name: string
};

type State = {
  value: any
};

export default class Select extends React.Component<Props, State> {
  state = {
    value: null
  };

  handleChange = (event: SyntheticMouseEvent<HTMLElement>) => {
    this.setState({ value: event.target.value });
  };

  componentDidMount() {
    const { options } = this.props;
    if (options.length < 1) {
      return;
    }
    this.setState({ value: options[0].value });
  }

  render() {
    const { options, name } = this.props;
    return (
      <section>
        <label htmlFor={name}>{normalizeName(name)}</label>
        <select value={this.state.value} onChange={this.handleChange}>
          {options.map(({ label, value }) => (
            <option name={name} key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </section>
    );
  }
}
