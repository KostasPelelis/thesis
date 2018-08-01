/*
* @flow
*/

import * as React from 'react';
import {Blueprint} from '../flow/FlowTypes';
import dateformat from 'dateformat';

import './BlueprintExplorer.css';

type Props = {
  blueprints: Array<Blueprint>,
  onBlueprintClicked: any
};

class BlueprintExplorer extends React.Component<Props> {

  onBlueprintClicked(idx: number) {
    if(this.props.onBlueprintClicked) {
      this.props.onBlueprintClicked(idx);
    }
  }

  blueprints(): React.Node {
    return (
      this.props.blueprints.map((blueprint: Blueprint, idx: number): React.Node =>
        <tr key={blueprint.id}>
          <td><i className="file text outline icon"></i>{blueprint.name}</td>
          <td>{blueprint.permission}</td>
          <td>{dateformat(Date.parse(blueprint.lastUpdated), "dd/mm/yyyy h:MM")}</td>
          <td>
            <button
              className="ui button"
              onClick={(): void => this.onBlueprintClicked(idx)}>
              Edit
            </button>
          </td>
        </tr>)
    )
  }

  render(): React.Node {
    return (
      <div className="six wide column">
        <table className="ui celled stripped table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Permission</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.blueprints()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default BlueprintExplorer;
