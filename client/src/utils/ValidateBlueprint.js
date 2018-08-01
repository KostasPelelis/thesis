/*
* @flow
*/

import Ajv from "ajv";

import type { BlueprintError, BlueprintSegment } from "../flow/FlowTypes";
import JsonParser from "./JsonParser";

export const BLUEPRINT_SEGMENTS = [
  "Internal Structure",
  "Data Management",
  "Abstract Properties",
  "Cookbooks",
  "Output Interface"
];

const segmentsSchema = BLUEPRINT_SEGMENTS.reduce((acc: any, seg: string) => {
  acc[seg] = {
    type: "object"
  };
  return acc;
}, {});

const blueprintSchema = {
  $id: "blueprintSchema",
  type: "object",
  properties: segmentsSchema,
  required: BLUEPRINT_SEGMENTS
};

const validator = new Ajv().compile(blueprintSchema);

export const validBlueprint = (content: string): Array<BlueprintError> => {
  return validator.errors || [];
};

export const calculateSegments = (
  content: string
): { [string]: BlueprintSegment } => {
  const segments = {};
  const totalLines = content.split("\n").length;
  let contentObj;
  try {
    contentObj = JsonParser(content);
  } catch (ex) {
    console.error(ex);
    return segments;
  }
  let i;
  if (BLUEPRINT_SEGMENTS.some(seg => !contentObj.val[seg])) {
    console.error("Error while parsing");
    return;
  }
  for (i = 0; i < BLUEPRINT_SEGMENTS.length - 1; ++i) {
    const start = contentObj.val[BLUEPRINT_SEGMENTS[i]].row;
    const end = contentObj.val[BLUEPRINT_SEGMENTS[i + 1]].row;
    segments[BLUEPRINT_SEGMENTS[i]] = {
      start: start,
      end: end - 1
    };
  }
  segments[BLUEPRINT_SEGMENTS[i]] = {
    start: contentObj.val[BLUEPRINT_SEGMENTS[i]].row,
    end: totalLines
  };
  return segments;
};
