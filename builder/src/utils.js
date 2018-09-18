/*eslint-disable no-extend-native*/
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export function normalizeName(name) {
  return (
    name
      // Key parts
      .split(".")
      // Last part
      .pop()
      .split("-")[0]
      .replace(/[-_]/g, " ")
      .capitalize()
  );
}
const arrayKeyRegex = /\[([0-9]*)\]/;

function denormalizeName(acc, [[x, y, ...xs], value]) {
  const arrayParts = x.match(arrayKeyRegex);
  let key = arrayParts ? arrayParts[1] : x;
  let val;
  if (!y) {
    val = value;
  } else {
    const nextAcc =
      y.match(arrayKeyRegex) !== null ? acc[key] || [] : acc[key] || {};
    val = denormalizeName(nextAcc, [[y, ...xs], value]);
  }
  if (Array.isArray(acc)) {
    acc[key] = val;
  } else {
    acc = { ...acc, [key]: val };
  }
  return acc;
}

export const denormalizeList = tuples => {
  return tuples
    .map(([key, value]) => [key.split(/[.-]/), value])
    .reduce(denormalizeName, {});
};
