export default [
  {
    name: "Blueprint 1",
    id: 1,
    createdAt: "2017-08-15 16:30:29.843030",
    lastUpdated: "2017-08-15 16:30:29.843030",
    owner: "Plkost",
    permission: "rw",
    content: {
      "Internal Structure": {
        "data-sources": [
          {
            "Weather Undergroud": "",
            type: "Http",
            URI: "http://api.wunderground.com/api/",
            schema: {}
          }
        ],
        Flow: [
          {
            id: "63fd84d1.dc644c",
            type: "http in",
            z: "3932a3f8.c728cc",
            name: "GET Current Weather",
            url: "/getCurrentWeather",
            method: "get",
            swaggerDoc: "",
            x: 119.08332824707,
            y: 604.833374023438,
            wires: [["3e8df5dc.886e1a"]]
          },
          {
            id: "e861f29d.063a5",
            type: "http response",
            z: "3932a3f8.c728cc",
            name: "GET Current Weather",
            x: 1237.07995605469,
            y: 663.389007568359,
            wires: []
          },
          {
            id: "3e8df5dc.886e1a",
            type: "DataSourceAPI",
            z: "3932a3f8.c728cc",
            name: "Fill HTTP Request Parameters",
            URL: "http://api.wunderground.com/api/",
            Method: "GET",
            Headers: "",
            Body: "",
            x: 272.006927490234,
            y: 503.635375976563,
            wires: [["2c6c98a9.3dbd48"]]
          },
          {
            id: "2c6c98a9.3dbd48",
            type: "function",
            z: "3932a3f8.c728cc",
            name: "Construct HTTP Request to Data Source",
            func:
              "msg.url = msg.URL;\nmsg.method = msg.Method;\nmsg.headers = msg.Headers;\nmsg.payload = msg.Body;\n\nreturn msg;",
            outputs: 1,
            noerr: 0,
            x: 447,
            y: 624.638854980469,
            wires: [["c2cb5f9c.814d4"]]
          },
          {
            id: "c2cb5f9c.814d4",
            type: "http request",
            z: "3932a3f8.c728cc",
            name: "HTTP Request to Data Source",
            method: "use",
            ret: "obj",
            url: "",
            x: 354.013793945313,
            y: 762.388854980469,
            wires: [["69817951.e07548", "3d9e75cf.e7ea2a"]]
          },
          {
            id: "69817951.e07548",
            type: "function",
            z: "3932a3f8.c728cc",
            name: "Construct Exposed Data Tuple",
            func:
              'var ts = msg.payload.current_observation.observation_epoch;\nvar temp = msg.payload.current_observation.temp_c;\nvar tempf = msg.payload.current_observation.temp_f;\nvar h = msg.payload.current_observation.relative_humidity;\nvar w = msg.payload.current_observation.weather;\nvar loc = msg.payload.current_observation.observation_location;\n\nts = parseInt(ts);\nh = parseFloat(h.replace(/%/g, ""))/100;\n\nmsg.payload = {};\n\nmsg.payload.timestamp = ts;\nmsg.payload.temperature_celsius = temp;\nmsg.payload.temperature_fahrenheit = tempf;\nmsg.payload.relative_humidity = h;\nmsg.payload.weather_brief_description = w;\nmsg.payload.observation_location = {};\nmsg.payload.observation_location = loc;\n\n\n\nreturn msg;',
            outputs: 1,
            noerr: 0,
            x: 791.999938964844,
            y: 715.649108886719,
            wires: [["fd770863.c5e8a8"]]
          },
          {
            id: "fd770863.c5e8a8",
            type: "json",
            z: "3932a3f8.c728cc",
            name: "",
            x: 1032.07299804688,
            y: 732.798645019531,
            wires: [["c52c35ca.6dbe98"]]
          },
          {
            id: "3d9e75cf.e7ea2a",
            type: "debug",
            z: "3932a3f8.c728cc",
            name: "Raw Data",
            active: true,
            console: "true",
            complete: "payload",
            x: 559,
            y: 809,
            wires: []
          },
          {
            id: "2cce5019.bb6dd",
            type: "debug",
            z: "3932a3f8.c728cc",
            name: "Exposed Data Tuple",
            active: true,
            console: "false",
            complete: "payload",
            x: 1165,
            y: 505,
            wires: []
          },
          {
            id: "c52c35ca.6dbe98",
            type: "http request",
            z: "3932a3f8.c728cc",
            name: "DUE",
            method: "use",
            ret: "txt",
            url: "",
            tls: "",
            x: 709,
            y: 553,
            wires: [["f72ebda8.f750e"]]
          },
          {
            id: "f72ebda8.f750e",
            type: "http request",
            z: "3932a3f8.c728cc",
            name: "security_module",
            method: "use",
            ret: "txt",
            url: "",
            tls: "",
            x: 896,
            y: 554,
            wires: [["e861f29d.063a5", "2cce5019.bb6dd"]]
          }
        ],
        deployment_sequence: [
          "resolution",
          "DUE",
          "security_module",
          "Node-red"
        ],
        output_tuple_example: ["dates", "temperatures", "location"]
      },
      "Data Management": {
        "Data Utility": {
          Dimensions: [
            {
              name: "dim1",
              granularity: "",
              metric: "",
              value: 5,
              unit: "",
              timestamp: ""
            },
            {
              name: "dim2",
              granularity: "",
              metric: "",
              value: 5,
              unit: "",
              timestamp: ""
            }
          ],
          Modules: {
            PDUS: {},
            DUE: {},
            SDG: {}
          },
          "Data Movement": {
            properties: [],
            strategies: {}
          }
        },
        Security: {
          Dimensions: [
            {
              name: "Integrity",
              granularity: "",
              metric: "",
              value: 5,
              unit: "",
              timestamp: ""
            },
            {
              name: "Confidentiality",
              granularity: "",
              metric: "",
              value: 5,
              unit: "",
              timestamp: ""
            }
          ],
          Modules: {
            "Security Module": {}
          }
        }
      },
      "Abstract Properties": {
        "Product Properties": {
          topic: "weather",
          country: "Greece",
          format: "XML"
        },
        "Quality Properties": {
          availabilty: "",
          accuracy: "",
          privacy: ""
        }
      },
      Cookbooks: {
        resolution: {
          "yml file":
            "version: '2'\n\nservices:\n  proxy:\n    build: nginx/\n    container_name: 'portainer-proxy'\n    ports:\n      - '80:80'\n    networks:\n      - local\n\n  templates:\n    image: portainer/templates\n    container_name: 'portainer-templates'\n    networks:\n      - local\n\n  portainer:\n    image: portainer/portainer\n    container_name: 'portainer-app'\n#Automatically choose 'Manage the Docker instance where Portainer is running' by adding <--host=unix:///var/run/docker.sock> to the command\n    command: --templates http://templates/templates.json\n    networks:\n      - local\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n      - /opt/portainer/data:/data\n\n  watchtower:\n    image: v2tec/watchtower\n    container_name: 'portainer-watchtower'\n    command: --cleanup portainer-app portainer-watchtower portainer/templates\n    networks:\n      - local\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n\nnetworks:\n  local:\n    driver: bridge"
        },
        DUE: {
          "yml file":
            "version: '2'\n\nservices:\n  proxy:\n    build: nginx/\n    container_name: 'portainer-proxy'\n    ports:\n      - '80:80'\n    networks:\n      - local\n\n  templates:\n    image: portainer/templates\n    container_name: 'portainer-templates'\n    networks:\n      - local\n\n  portainer:\n    image: portainer/portainer\n    container_name: 'portainer-app'\n#Automatically choose 'Manage the Docker instance where Portainer is running' by adding <--host=unix:///var/run/docker.sock> to the command\n    command: --templates http://templates/templates.json\n    networks:\n      - local\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n      - /opt/portainer/data:/data\n\n  watchtower:\n    image: v2tec/watchtower\n    container_name: 'portainer-watchtower'\n    command: --cleanup portainer-app portainer-watchtower portainer/templates\n    networks:\n      - local\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n\nnetworks:\n  local:\n    driver: bridge"
        },
        security_module: {
          "yml file":
            "version: '2'\n\nservices:\n  proxy:\n    build: nginx/\n    container_name: 'portainer-proxy'\n    ports:\n      - '80:80'\n    networks:\n      - local\n\n  templates:\n    image: portainer/templates\n    container_name: 'portainer-templates'\n    networks:\n      - local\n\n  portainer:\n    image: portainer/portainer\n    container_name: 'portainer-app'\n#Automatically choose 'Manage the Docker instance where Portainer is running' by adding <--host=unix:///var/run/docker.sock> to the command\n    command: --templates http://templates/templates.json\n    networks:\n      - local\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n      - /opt/portainer/data:/data\n\n  watchtower:\n    image: v2tec/watchtower\n    container_name: 'portainer-watchtower'\n    command: --cleanup portainer-app portainer-watchtower portainer/templates\n    networks:\n      - local\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n\nnetworks:\n  local:\n    driver: bridge"
        },
        "Node-red": {
          "yml file":
            "version: '2'\n\nservices:\n  proxy:\n    build: nginx/\n    container_name: 'portainer-proxy'\n    ports:\n      - '80:80'\n    networks:\n      - local\n\n  templates:\n    image: portainer/templates\n    container_name: 'portainer-templates'\n    networks:\n      - local\n\n  portainer:\n    image: portainer/portainer\n    container_name: 'portainer-app'\n#Automatically choose 'Manage the Docker instance where Portainer is running' by adding <--host=unix:///var/run/docker.sock> to the command\n    command: --templates http://templates/templates.json\n    networks:\n      - local\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n      - /opt/portainer/data:/data\n\n  watchtower:\n    image: v2tec/watchtower\n    container_name: 'portainer-watchtower'\n    command: --cleanup portainer-app portainer-watchtower portainer/templates\n    networks:\n      - local\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n\nnetworks:\n  local:\n    driver: bridge"
        }
      },
      "Output Interface": {
        output_tuple_format: "",
        tuple_schema: {
          schema: "Data Tuple JSON Schema",
          definitions: {},
          id: "/schema-URI",
          properties: {
            name: {
              id: "/name-URI",
              type: "string"
            },
            "tuple-items": {
              id: "/tuple-items-URI",
              properties: {
                dates: {
                  id: "/dates-URI",
                  items: {
                    id: "/items-URI",
                    type: "string"
                  },
                  type: "array"
                },
                location: {
                  id: "/location-URI",
                  type: "string"
                },
                temperatures: {
                  id: "/temperatures-URI",
                  properties: {
                    "max-Value": {
                      id: "/max-Value-URI",
                      type: "integer"
                    },
                    "min-Values": {
                      id: "/min-Value-URI",
                      type: "integer"
                    },
                    "temp-values": {
                      id: "/temp-values-URI",
                      items: {
                        id: "/items-URI",
                        type: "number"
                      },
                      type: "array"
                    }
                  },
                  required: ["temp-values"],
                  type: "object"
                }
              },
              required: ["dates", "temperatures", "location"],
              type: "object"
            }
          },
          required: ["tuple-items"],
          type: "object"
        }
      }
    }
  }
];
