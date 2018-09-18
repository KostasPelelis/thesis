export type InputType = "text";

export type Schema = {
  type: "object" | "array" | "string" | "number".
  description: string,
  properties?: { [string?]: Schema },
  additionalProperties?: bool,
  required?: Array<string>,
  minItems?: number,
  uniqueItems?: bool,
  examples?: Array<string>
}