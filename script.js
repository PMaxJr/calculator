const display = document.getElementById("display");

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetDisplay = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

function appendToDisplay(value) {
  if (shouldResetDisplay) {
    display.value = "";
    shouldResetDisplay = false;
  }
  display.value += value;
}

function setOperator(operator) {
  if (currentOperator !== null) calculate();
  firstOperand = display.value;
  currentOperator = operator;
  display.value += " " + operator + " ";
  shouldResetDisplay = false;
}

function calculate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondOperand = display.value;
  const result = operate(currentOperator, firstOperand, secondOperand);
  display.value = result;
  firstOperand = result;
  currentOperator = null;
}

function clearDisplay() {
  display.value = "";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
  shouldResetDisplay = false;
}

document.querySelectorAll("[data-number]").forEach((button) => {
  button.addEventListener("click", () => appendToDisplay(button.textContent));
});

document.querySelectorAll("[data-operator]").forEach((button) => {
  button.addEventListener("click", () => setOperator(button.textContent));
});

document.querySelector("[data-equals]").addEventListener("click", calculate);

document.querySelector("[data-clear]").addEventListener("click", clearDisplay);
