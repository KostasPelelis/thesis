/*
* @flow
*/
import { combineReducers } from "redux";

import { INITIAL_STATE } from "./EditorState";

import type {
  Blueprint,
  RequestStatus,
  BlueprintError,
  BlueprintSegment,
  EditorState
} from "../flow/FlowTypes";
import { type EditorAction, ActionTypes } from "../actions/EditorActions";

import { calculateSegments } from "../utils/ValidateBlueprint";

const selectedBlueprintReducer = (
  state: Blueprint = INITIAL_STATE.selectedBlueprint,
  action: EditorAction
): Blueprint => {
  switch (action.type) {
    case "CREATE_NODE":
      const { nodeId, name } = action;
      const content = { ...state.content };
      let itter = nodeId.length > 0 ? content[nodeId[0]] : content;
      for (let i = 1; i < nodeId.length; ++i) {
        itter = itter[nodeId[i]];
      }
      itter[name] = {};
      return { ...state, content };
    case ActionTypes.SELECT_BLUEPRINT:
      return action.payload.blueprint;
    default:
      return state;
  }
};

const blueprintsReducer = (
  state: Array<Blueprint> = INITIAL_STATE.blueprints,
  action: EditorAction
): Array<Blueprint> => {
  switch (action.type) {
    case ActionTypes.FETCH_BLUEPRITNS_SUCCESS:
      return action.payload.blueprints;
    default:
      return state;
  }
};

const fetchBlueprintsStatusReducer = (
  state: ?RequestStatus = INITIAL_STATE.fetchBlueprintsStatus,
  action: EditorAction
): ?RequestStatus => {
  switch (action.type) {
    case ActionTypes.FETCH_BLUEPRITNS_STARTED:
      return "pending";
    case ActionTypes.FETCH_BLUEPRITNS_SUCCESS:
      return "success";
    case ActionTypes.FETCH_BLUEPRITNS_FAIL:
      return "fail";
    default:
      return state;
  }
};

const saveBlueprintStatusReducer = (
  state: ?RequestStatus = INITIAL_STATE.saveBlueprintStatus,
  action: EditorAction
): ?RequestStatus => {
  switch (action.type) {
    case ActionTypes.SAVE_BLUEPRINT_STARTED:
      return "pending";
    case ActionTypes.SAVE_BLUEPRINT_SUCCESS:
      return "success";
    case ActionTypes.SAVE_BLUEPRINT_FAIL:
      return "fail";
    default:
      return state;
  }
};

const editorErrorsReducer = (
  state: Array<BlueprintError> = INITIAL_STATE.editorErrors,
  action: EditorAction
): Array<BlueprintError> => {
  switch (action.type) {
    case ActionTypes.BLUEPRINT_INVALID:
      return action.payload.errors;
    case ActionTypes.BLUEPRINT_VALID:
      return [];
    default:
      return state;
  }
};

const segmentsReducer = (
  state: EditorState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case ActionTypes.SELECT_BLUEPRINT:
    case ActionTypes.BLUEPRINT_VALID:
    case ActionTypes.BLUEPRINT_INVALID:
      if (state.selectedBlueprint == null) {
        return state;
      }
      const segments = calculateSegments(
        JSON.stringify(state.selectedBlueprint.content, null, 2)
      );
      return { ...state, segments: segments };
    default:
      return state;
  }
};

const currentSegmentReducer = (
  state: string = INITIAL_STATE.currentSegment,
  action: EditorAction
) => {
  switch (action.type) {
    case ActionTypes.CHANGE_SEGMENT:
      return action.payload.segment;
    default:
      return state;
  }
};

const showEditorReducer = (
  state: boolean = INITIAL_STATE.showEditor,
  action: EditorAction
) => {
  console.log(action);
  switch (action.type) {
    case ActionTypes.TOGGLE_EDITOR:
      return !state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  blueprints: blueprintsReducer,
  selectedBlueprint: selectedBlueprintReducer,
  fetchBlueprintsStatus: fetchBlueprintsStatusReducer,
  saveBlueprintStatus: saveBlueprintStatusReducer,
  editorErrors: editorErrorsReducer,
  segments: (
    state: { [string]: BlueprintSegment } = INITIAL_STATE.segments,
    action: EditorAction
  ) => state,
  currentSegment: currentSegmentReducer,
  showEditor: showEditorReducer
});

type Reducer = (state: EditorState, action: EditorAction) => EditorState;

const chainReducers = (reducers: Array<Reducer>): Reducer => {
  return (state: EditorState = INITIAL_STATE, action: EditorAction) =>
    reducers.reduce(
      (stateAcc: EditorState, reducer: Reducer) => reducer(stateAcc, action),
      state
    );
};

const reducer = chainReducers([rootReducer, segmentsReducer]);

export default (state: EditorState = INITIAL_STATE, action: EditorAction) =>
  reducer(state, action);
