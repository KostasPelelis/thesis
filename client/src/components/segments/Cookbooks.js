/*
* @flow
*/

import * as React from 'react';

import { Search, Label, Grid, Button, Header } from 'semantic-ui-react';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light';
import json from 'react-syntax-highlighter/languages/hljs/json';
import dark from 'react-syntax-highlighter/styles/hljs';

import { CookbookEntry } from '../../flow/FlowTypes';

import './Cookbooks.css';

import copy from 'copy-to-clipboard';

registerLanguage('json', json);

type Props = {
  onCookBookSelected?: (CookbookEntry) => void
};

type State = {
  isLoading: boolean,
  results: Array<CookbookEntry>,
  value: string,
  selected: ?CookbookEntry
};

const data = [{
  title: "resolution",
  content: {
    "yml file": "version: '2'\n\nservices:\n  proxy:\n  build: nginx/\n  container_name: 'portainer-proxy'\n  ports:\n    - '80:80'\n  networks:\n    - local\n\n  templates:\n  image: portainer/templates\n  container_name: 'portainer-templates'\n  networks:\n    - local\n\n  portainer:\n  image: portainer/portainer\n  container_name: 'portainer-app'\n#Automatically choose 'Manage the Docker instance where Portainer is running' by adding <--host=unix:///var/run/docker.sock> to the command\n  command: --templates http://templates/templates.json\n  networks:\n    - local\n  volumes:\n    - /var/run/docker.sock:/var/run/docker.sock\n    - /opt/portainer/data:/data\n\n  watchtower:\n  image: v2tec/watchtower\n  container_name: 'portainer-watchtower'\n  command: --cleanup portainer-app portainer-watchtower portainer/templates\n  networks:\n    - local\n  volumes:\n    - /var/run/docker.sock:/var/run/docker.sock\n\nnetworks:\n  local:\n  driver: bridge"
  }
},
{
  title: "DUE",
  content: {
    "yml file": "version: '2'\n\nservices:\n  proxy:\n  build: nginx/\n  container_name: 'portainer-proxy'\n  ports:\n    - '80:80'\n  networks:\n    - local\n\n  templates:\n  image: portainer/templates\n  container_name: 'portainer-templates'\n  networks:\n    - local\n\n  portainer:\n  image: portainer/portainer\n  container_name: 'portainer-app'\n#Automatically choose 'Manage the Docker instance where Portainer is running' by adding <--host=unix:///var/run/docker.sock> to the command\n  command: --templates http://templates/templates.json\n  networks:\n    - local\n  volumes:\n    - /var/run/docker.sock:/var/run/docker.sock\n    - /opt/portainer/data:/data\n\n  watchtower:\n  image: v2tec/watchtower\n  container_name: 'portainer-watchtower'\n  command: --cleanup portainer-app portainer-watchtower portainer/templates\n  networks:\n    - local\n  volumes:\n    - /var/run/docker.sock:/var/run/docker.sock\n\nnetworks:\n  local:\n  driver: bridge"
  }
},
{
  title: "security_module",
  content: {
    "yml file": "version: '2'\n\nservices:\n  proxy:\n  build: nginx/\n  container_name: 'portainer-proxy'\n  ports:\n    - '80:80'\n  networks:\n    - local\n\n  templates:\n  image: portainer/templates\n  container_name: 'portainer-templates'\n  networks:\n    - local\n\n  portainer:\n  image: portainer/portainer\n  container_name: 'portainer-app'\n#Automatically choose 'Manage the Docker instance where Portainer is running' by adding <--host=unix:///var/run/docker.sock> to the command\n  command: --templates http://templates/templates.json\n  networks:\n    - local\n  volumes:\n    - /var/run/docker.sock:/var/run/docker.sock\n    - /opt/portainer/data:/data\n\n  watchtower:\n  image: v2tec/watchtower\n  container_name: 'portainer-watchtower'\n  command: --cleanup portainer-app portainer-watchtower portainer/templates\n  networks:\n    - local\n  volumes:\n    - /var/run/docker.sock:/var/run/docker.sock\n\nnetworks:\n  local:\n  driver: bridge"
  }
},
{
  title:"Node-red",
  content: {
    "yml file": "version: '2'\n\nservices:\n  proxy:\n  build: nginx/\n  container_name: 'portainer-proxy'\n  ports:\n    - '80:80'\n  networks:\n    - local\n\n  templates:\n  image: portainer/templates\n  container_name: 'portainer-templates'\n  networks:\n    - local\n\n  portainer:\n  image: portainer/portainer\n  container_name: 'portainer-app'\n#Automatically choose 'Manage the Docker instance where Portainer is running' by adding <--host=unix:///var/run/docker.sock> to the command\n  command: --templates http://templates/templates.json\n  networks:\n    - local\n  volumes:\n    - /var/run/docker.sock:/var/run/docker.sock\n    - /opt/portainer/data:/data\n\n  watchtower:\n  image: v2tec/watchtower\n  container_name: 'portainer-watchtower'\n  command: --cleanup portainer-app portainer-watchtower portainer/templates\n  networks:\n    - local\n  volumes:\n    - /var/run/docker.sock:/var/run/docker.sock\n\nnetworks:\n  local:\n  driver: bridge"
  }
}]

class CookbooksSegment extends React.Component<Props, State> {
  state = {
    isLoading: false,
    results: [],
    value: "",
    selected: null,
  }

  resetComponent() {
    this.setState({
      isLoading: false,
      results: [],
      value: "",
      selected: null,
    });
  }

  onResultSelect = (e: SyntheticEvent<>, { result }: any): void => {
    this.setState({
      value: result.title,
      selected: result
    });
    if(this.props.onCookBookSelected) {
      this.props.onCookBookSelected(result.content);
    }
  }

  onSearchChange = (e: SyntheticEvent<>, { value }: State): void => {
    this.setState({
      isLoading: true,
      value
    });
    if(value.length < 1) {
      this.resetComponent();
    }
    const newRes = data.filter((elem: CookbookEntry) =>
      elem.title.indexOf(value) !== -1);
    this.setState({
      isLoading: false,
      results: newRes || []
    });
  }

  resultContent() {
    const { selected } = this.state;
    if(selected && selected.content) {
      const snippet = `"${selected.title}": ${JSON.stringify(selected.content, null, 2)}`;
      return (
        <div>
          <SyntaxHighlighter
            language='json'
            style={dark}
          >{snippet}
          </SyntaxHighlighter>
          <Button
            onClick={copy(snippet)}
          >
            Copy to cliboard
          </Button>
        </div>
      )
    }
  }

  render(): React.Node {
    return (
      <div>
        <Header as='h2'>
          Search cookbook
        </Header>
        <Search
          key={`cookbook-segment/search`}
          loading={false}
          onResultSelect={this.onResultSelect}
          onSearchChange={this.onSearchChange}
          results={this.state.results}
          value={this.state.value}
        />
        {this.resultContent()}
      </div>
    );
  }
}

export default CookbooksSegment;
