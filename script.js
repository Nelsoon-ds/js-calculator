// Variables
let calculatorState = {
  currentOperand: "",
  prevOperand: "",
  operator: "",
  result: null,
  chainedResult: null,
};

let equalsHasBeenPressed = false; // Flag for submit-button

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => (b !== 0 ? a / b : null),
};


// DOM Manipulation

let calculatorInput = document.getElementById("calculator-input");

const digitButtons = document.querySelectorAll(".digit");

const equalsButton = document.getElementById("equals-button");

const resultField = document.getElementById("result");

const deleteButton = document.getElementById("delete-button");

const operatorButtons = document.querySelectorAll(".operator");

// Buttons and Event Listeners

deleteButton.addEventListener("click", () => {
  resetCalculator(true, true); // All Clear
});

equalsButton.addEventListener("click", function (event) {
  console.log("Equals has been pressed");
  equalsHasBeenPressed = true;
  event.preventDefault(); // Prevent reloading the page
  if (
    calculatorState.operator &&
    calculatorState.prevOperand &&
    calculatorState.currentOperand
  ) {
    operate();
  } else {
    handleError("You are missing an operand");
  }
});

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.textContent, "has been clicked");
    handleDigitInput(button.textContent);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.textContent);
    handleOperatorInput(button.textContent);
  });
});

// Functions

function handleError(message) {
  alert(message);
}

function updateCalculatorDisplay() {
  const { currentOperand, prevOperand, operator, result, chainedResult } =
    calculatorState;

  if (result !== null) {
    // Show the result if it exists
    calculatorInput.textContent = result;
    resultField.textContent =
      chainedResult !== null ? `Running total: ${chainedResult}` : "";
  } else {
    // Construct the display based on the current state
    if (!operator) {
      calculatorInput.textContent = currentOperand || prevOperand || "0";
    } else {
      calculatorInput.textContent = prevOperand
        ? `${prevOperand} ${operator} ${currentOperand || ""}`
        : currentOperand || "";
    }
  }
}

function handleDigitInput(digit) {
  const { result } = calculatorState;
  if (result !== null && !calculatorState.operator) {
    // When a result exists, use the chainedResult as the new prevOperand
    resetCalculator(false, true); // Keep the chained result
  }
  calculatorState.currentOperand += digit;
  updateCalculatorDisplay();
}

function handleOperatorInput(operator) {
  const { currentOperand, prevOperand, result } = calculatorState;
  // start fresh if a result exists and no operator is active
  if (result !== null && !currentOperand) {
    calculatorState.prevOperand = result;
    calculatorState.currentOperand = "";
    calculatorState.operator = "";
  }
  if (prevOperand && currentOperand) {
    operate(); // Perform the operation before switching
  }

  calculatorState.operator = operator;
  // If no previous operand, use current operand or result
  calculatorState.prevOperand =
    calculatorState.prevOperand || calculatorState.currentOperand || result;
  calculatorState.currentOperand = "";
  updateCalculatorDisplay();
}

function operate() {
  console.log("Ive been called");
  const { operator, currentOperand, prevOperand } = calculatorState;

  if (!operator || !prevOperand || currentOperand === "") {
    console.log("Invalid operation");
    return;
  }
  const num1 = parseFloat(prevOperand);
  const num2 = parseFloat(currentOperand);
  let result = operations[operator](num1, num2);

  if (result === null) {
    handleError("Cannot divide by zero");
    resetCalculator(true, false);
    return;
  }
  if (equalsHasBeenPressed) {
    calculatorState.chainedResult =
      (calculatorState.chainedResult || 0) + result;
  }

  calculatorState.result = result;
  calculatorState.prevOperand = result;
  calculatorState.currentOperand = "";
  calculatorState.operator = "";

  updateCalculatorDisplay();
}

function resetCalculator(clearResult = true, keepChainedResult = false) {
  if (clearResult) {
    calculatorState.result = null;
  }
  calculatorState.currentOperand = "";
  calculatorState.prevOperand = "";
  calculatorState.operator = "";
  if (!keepChainedResult) {
    calculatorState.chainedResult = null;
  }
  resultField.textContent = "";
  equalsHasBeenPressed = false; // Reset flag
  updateCalculatorDisplay();
}
