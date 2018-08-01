/*
* @flow
*/
let at;
let row, col;
let currentChar;
let escapeChars = {
  '"': '"',
  "\\": "\\",
  "/": "/",
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "\t"
};
let text;

const error = (message: string): any => ({
  name: "SyntaxError",
  message: message,
  at: at,
  text: text
});

const next = (char: ?string): ?string => {
  if (char && char !== currentChar) {
    return error(`Expected ${char} instead of ${currentChar}`);
  }

  currentChar = text.charAt(at);
  if (text.charCodeAt(at) === 10) {
    row++;
    col = 0;
  }
  at++;
  col++;
  return currentChar;
};

const parseNumber = () => {
  let number;
  let acc = "";
  if (currentChar === "-") {
    acc = "-";
    next("-");
  }
  while (currentChar >= "0" && currentChar <= "9") {
    acc += currentChar;
    next();
  }
  if (currentChar === ".") {
    acc += ".";
    while (next() && currentChar >= "0" && currentChar <= "9") {
      acc += currentChar;
    }
  }
  if (currentChar === "e" || currentChar === "E") {
    acc += currentChar;
    next();
    if (currentChar === "-" || currentChar === "+") {
      acc += currentChar;
      next();
    }
    while (currentChar >= "0" && currentChar <= "9") {
      acc += currentChar;
      next();
    }
  }
  number = +acc;
  if (isNaN(number)) {
    return error("Bad number");
  } else {
    return number;
  }
};

const parseString = () => {
  let string = "";

  if (currentChar === '"') {
    while (next()) {
      if (currentChar === '"') {
        next();
        return string;
      } else if (currentChar === "\\") {
        next();
        if (currentChar === "u") {
          let uffff = 0;
          let hex;
          for (let i = 0; i < 4; ++i) {
            hex = parseInt(next(), 16);
            if (!isFinite(hex)) {
              break;
            }
            uffff = uffff * 16 + hex;
          }
          string += String.fromCharCode(uffff);
        } else if (typeof escapeChars[currentChar] === "string") {
          string += escapeChars[currentChar];
        } else {
          break;
        }
      } else {
        string += currentChar;
      }
    }
  }
  return error("Bad string");
};

const white = () => {
  while (currentChar && currentChar <= " ") {
    next();
  }
};

const parseWord = () => {
  switch (currentChar) {
    case "t":
      next("t");
      next("r");
      next("u");
      next("e");
      return true;
    case "f":
      next("f");
      next("a");
      next("l");
      next("s");
      next("e");
      return false;
    case "n":
      next("n");
      next("u");
      next("l");
      next("l");
      return null;
    default:
      return error(`Unexpected ${currentChar}`);
  }
};

const parseArray = () => {
  var array = [];
  if (currentChar === "[") {
    next("[");
    white();
    if (currentChar === "]") {
      next("]");
      return array;
    }
    while (currentChar) {
      array.push(value());
      white();
      if (currentChar === "]") {
        next("]");
        return array;
      }
      next(",");
      white();
    }
  }
  return error("Bad array");
};

const parseObject = () => {
  let acc = {};
  if (currentChar === "{") {
    next("{");
    white();
    if (currentChar === "}") {
      next("}");
      return acc;
    }
    while (currentChar) {
      let key = parseString();
      white();
      next(":");
      if (Object.hasOwnProperty.call(acc, key)) {
        return error(`Duplicate key ${key}`);
      }
      acc[key] = value();
      white();
      if (currentChar === "}") {
        next("}");
        return acc;
      }
      next(",");
      white();
    }
  }
  return error("Bad object");
};

const entry = (valFun: any) => {
  const currRow = row;
  const currCol = col;
  return {
    row: currRow,
    col: currCol,
    val: valFun()
  };
};

const value = () => {
  white();
  switch (currentChar) {
    case "{":
      return entry(parseObject);
    case "[":
      return entry(parseArray);
    case '"':
      return entry(parseString);
    case "-":
      return entry(parseNumber);
    default:
      return currentChar >= "0" && currentChar <= "9"
        ? entry(parseNumber)
        : entry(parseWord);
  }
};

export default (source: string) => {
  let result;
  text = source;
  at = 0;
  row = 0;
  col = 1;
  currentChar = " ";
  result = value();
  white();
  if (currentChar) {
    return error("Syntax error");
  }
  return result;
};
