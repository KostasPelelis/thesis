import React from "react";

import Input from "./Input";
import FieldArray from "./FieldArray";
import Select from "./Select";

import { normalizeName } from "../utils";

export default function renderField(type, field, name) {
  console.log(type, name, field);
  if (type === "object") {
    return (
      field.properties && (
        <div key={name} className="container">
          <h3>{normalizeName(name)}</h3>
          <p>{field.description}</p>
          {Object.entries(field.properties).map(([fk, fv]) =>
            renderField(fv.type, fv, `${name}.${fk}`)
          )}
        </div>
      )
    );
  } else if (type === "array") {
    return (
      field.items && (
        <div key={name}>
          <FieldArray
            name={name}
            key={name}
            fieldSchema={field.items}
            renderField={renderField}
          />
        </div>
      )
    );
  } else if (type === "string") {
    return <Input key={name} type="text" name={name} placeholder={name} />;
  } else if (type === "number") {
    return <Input key={name} type="number" name={name} placeholder={name} />;
  } else if (!type && field.enum) {
    return (
      <Select
        key={name}
        name={name}
        options={field.enum.map(o => ({ label: o, value: o }))}
      />
    );
  } else {
    return (
      <div key={name} className="container">
        <h3>{normalizeName(name)}</h3>
      </div>
    );
  }
}
