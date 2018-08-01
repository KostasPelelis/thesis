export const CREATE_NODE = "CREATE_NODE";

export const createNode = (nodeId: Array<string>, name: string) => ({
  type: CREATE_NODE,
  nodeId,
  name
});
