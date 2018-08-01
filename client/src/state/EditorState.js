import { EditorState } from "../flow/FlowTypes";

export const INITIAL_STATE: EditorState = {
  blueprints: [],
  selectedBlueprint: null,
  fetchBlueprintsStatus: null,
  saveBlueprintStatus: null,
  editorErrors: [],
  segments: {},
  currentSegment: "",
  showEditor: false
};
