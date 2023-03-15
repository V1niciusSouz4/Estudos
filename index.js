/**
 * Represents the current calculation being performed.
 * @type {string}
 */
let calculation = '';

/**
 * Represents the display element on the calculator.
 * @type {HTMLElement}
 */
let display = document.getElementById('display');

/**
 * This function updates the display with the given value and adds it to the calculation string.
 * @param {string} value - The value to add to the calculation string and display.
 */
function updateDisplay(value) {
  calculation += value;
  display.value = calculation;
}

/**
 * This function clears the display and calculation string.
 */
function clearDisplay() {
  calculation = '';
  display.value = '';
}

/**
 * This function tokenizes the given string into an array of numbers and operators.
 * @param {string} str - The string to tokenize.
 * @returns {array} - An array of numbers and operators.
 */
function tokenize(str) {
  const result = [];
  let token = '';

  for (const character of str) {
    if ('*/+-'.includes(character)) {
      if (token === '' && character === '-') {
        token = '-';
      } else {
        result.push(parseFloat(token), character);
        token = '';
      }
    } else {
      token += character;
    }
  }

  if (token !== '') {
    result.push(parseFloat(token));
  }

  return result;
}

/**
 * This function calculates the result of the given array of tokens.
 * @param {array} tokens - An array of numbers and operators.
 */
function calculate(tokens) {
  tokens = tokenize(calculation);

  const operatorPrecendece = [
    { '*': (a, b) => a * b, '/': (a, b) => a / b },
    { '+': (a, b) => a + b, '-': (a, b) => a - b },
  ];

  let operator;
  for (const operators of operatorPrecendece) {
    const newToken = [];
    for (const token of tokens) {
      if (token in operators) {
        operator = operators[token];
      } else if (operator) {
        newToken[newToken.length - 1] = operator(
          newToken[newToken.length - 1],
          token
        );

        operator = null;
      } else {
        newToken.push(token);
      }
    }
    tokens = newToken;
  }

  if (tokens.length > 1 || tokens.length === 0) {
    display.value = 'Error';
  } else {
    display.value = tokens[0];
  }
}

