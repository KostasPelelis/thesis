/*
* @flow
*/

import { BLUEPRINTS_URL } from "../utils/EditorConstants";

import { validBlueprint } from "../utils/ValidateBlueprint";

import { Blueprint, BlueprintError } from "../flow/FlowTypes";

import keyMirror from "keymirror";

import { type Dispatch } from "redux";

export const ActionTypes = keyMirror({
  FETCH_BLUEPRITNS_STARTED: null,
  FETCH_BLUEPRITNS_SUCCESS: null,
  FETCH_BLUEPRITNS_FAIL: null,
  SAVE_BLUEPRINT_STARTED: null,
  SAVE_BLUEPRINT_SUCCESS: null,
  SAVE_BLUEPRINT_FAIL: null,
  SELECT_BLUEPRINT: null,
  BLUEPRINT_INVALID: null,
  BLUEPRINT_VALID: null,
  CHANGE_SEGMENT: null,
  TOGGLE_EDITOR: null
});

type FetchBlueprintsStarted = {
  type: ActionTypes.FETCH_BLUEPRITNS_STARTED,
  payload: any
};

type FetchBlueprintsSuccess = {
  type: ActionTypes.FETCH_BLUEPRITNS_SUCCESS,
  payload: any
};

type FetchBlueprintsFail = {
  type: ActionTypes.FETCH_BLUEPRITNS_FAIL,
  payload: any
};

type SaveBlueprintStarted = {
  type: ActionTypes.SAVE_BLUEPRINT_STARTED,
  payload: any
};

type SaveBlueprintSuccess = {
  type: ActionTypes.SAVE_BLUEPRINT_SUCCESS,
  payload: any
};

type ChangeSegment = {
  type: ActionTypes.CHANGE_SEGMENT,
  payload: any
};

type SelectBlueprint = {
  type: ActionTypes.SELECT_BLUEPRINT,
  payload: any
};

type InvalidBlueprint = {
  type: ActionTypes.BLUEPRINT_INVALID,
  payload: any
};

type ValidBlueprint = {
  type: ActionTypes.BLUEPRINT_VALID,
  payload: any
};

type SaveBlueprintFail = {
  type: ActionTypes.SAVE_BLUEPRINT_FAIL,
  payload: any
};

type ToggleEditor = {
  type: ActionTypes.TOGGLE_EDITOR
};

export type EditorAction =
  | FetchBlueprintsStarted
  | FetchBlueprintsSuccess
  | FetchBlueprintsFail
  | SaveBlueprintStarted
  | SaveBlueprintSuccess
  | SaveBlueprintFail
  | SelectBlueprint
  | ValidBlueprint
  | InvalidBlueprint
  | ChangeSegment
  | ToggleEditor;

/* Fetch blueprints actions */

const fetchBlueprintsStarted = (): FetchBlueprintsStarted => ({
  type: ActionTypes.FETCH_BLUEPRITNS_STARTED,
  payload: {}
});

const fetchBlueprintsSuccess = (
  blueprints: Array<Blueprint>
): FetchBlueprintsSuccess => ({
  type: ActionTypes.FETCH_BLUEPRITNS_SUCCESS,
  payload: {
    blueprints: blueprints
  }
});

const fetchBlueprintsFail = (
  blueprints: Array<Blueprint>
): FetchBlueprintsFail => ({
  type: ActionTypes.FETCH_BLUEPRITNS_FAIL,
  payload: {}
});

const fetchBlueprints = (): (Dispatch => void) => (dispatch: Dispatch) => {
  dispatch(fetchBlueprintsStarted());

  fetch(BLUEPRINTS_URL)
    .then((response: Response): Promise<any> => response.json())
    .then((blueprints: Array<Blueprint>): void => {
      dispatch(fetchBlueprintsSuccess(blueprints));
      dispatch(selectBlueprint(blueprints[0]));
    });
};

/* Blueprint save actions */

const saveBlueprintStarted = (blueprint: Blueprint): SaveBlueprintStarted => ({
  type: ActionTypes.SAVE_BLUEPRINT_STARTED,
  payload: {
    blueprint: blueprint
  }
});

const saveBlueprintSuccess = (blueprint: Blueprint): SaveBlueprintSuccess => ({
  type: ActionTypes.SAVE_BLUEPRINT_SUCCESS,
  payload: {
    blueprint: blueprint
  }
});

const saveBlueprintFail = (
  blueprint: Blueprint,
  error: any
): SaveBlueprintFail => ({
  type: ActionTypes.SAVE_BLUEPRINT_FAIL,
  payload: {
    blueprint: blueprint,
    error: error
  }
});

const saveBlueprint = (blueprint: Blueprint): (Dispatch => void) => (
  dispatch: Dispatch
) => {
  dispatch(saveBlueprintStarted(blueprint));
  fetch(BLUEPRINTS_URL + blueprint.id, {
    method: "put",
    body: JSON.stringify(blueprint.body)
  })
    .then((blueprint: Blueprint): Promise<EditorAction> =>
      dispatch(saveBlueprintSuccess(blueprint))
    )
    .catch((ex: any): Promise<EditorAction> =>
      dispatch(saveBlueprintFail(blueprint, ex))
    );
};

/* UI Actions */

const localSelectBlueprint = (blueprint: Blueprint) => ({
  type: ActionTypes.SELECT_BLUEPRINT,
  payload: {
    blueprint: blueprint
  }
});

const selectBlueprint = (blueprint: Blueprint): (Dispatch => void) => (
  dispatch: Dispatch
) => {
  dispatch(localSelectBlueprint(blueprint));
  dispatch(validateBlueprint(JSON.stringify(blueprint.content, null, 2)));
};

const localInvalidBlueprint = (errors: Array<BlueprintError>) => ({
  type: ActionTypes.BLUEPRINT_INVALID,
  payload: {
    errors: errors
  }
});

const localValidBlueprint = () => ({
  type: ActionTypes.BLUEPRINT_VALID,
  payload: {}
});

const validateBlueprint = (content: string): (Dispatch => void) => (
  dispatch: Dispatch
) => {
  const errors = validBlueprint(content);
  if (errors.length > 0) {
    dispatch(localInvalidBlueprint(errors));
  } else {
    dispatch(localValidBlueprint());
  }
};

const localToggleEditor = () => ({
  type: ActionTypes.TOGGLE_EDITOR
});

const toggleEditor = (): (Dispatch => void) => (dispatch: Dispatch) => {
  dispatch(localToggleEditor());
};

const localChangeSegment = (segment: string) => ({
  type: ActionTypes.CHANGE_SEGMENT,
  payload: {
    segment: segment
  }
});

const changeSegment = (segment: string): (Dispatch => void) => (
  dispatch: Dispatch
) => dispatch(localChangeSegment(segment));

export {
  fetchBlueprints,
  saveBlueprint,
  selectBlueprint,
  validateBlueprint,
  changeSegment,
  toggleEditor
};
