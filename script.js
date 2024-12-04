// Variables

let operator = "";
let result = 0;
let currentOperand = "";
let prevOperand = "";

// DOM Manipulation

var calculatorInput = document.getElementById("calculator-input");

const digitButtons = document.querySelectorAll(".digit");

const submitButton = document.getElementById("submit-button");

const resultField = document.getElementById("result");

const deleteButton = document.getElementById("delete-button");

function updateCalculatorDisplay() {
  if (result) {
    resultField.textContent = `Heres the result of ${prevOperand} ${operator} ${currentOperand} -=> ${result}`;
  } else {
    resultField.textContent = "";
  }
  if (!operator) {
    calculatorInput.textContent = currentOperand;
  } else if (!prevOperand) {
    calculatorInput.textContent = `${currentOperand} ${operator}`;
  } else if (prevOperand && currentOperand) {
    // operator and second number selected
    calculatorInput.textContent = `${currentOperand} ${operator} ${prevOperand}`;
  }
}

// Delete Button
deleteButton.addEventListener("click", function (event) {
  event.preventDefault();
  currentOperand = "";
  prevOperand = "";
  operator = "";
  document.getElementById("operator").textContent = "";
  resultField.textContent = "";
  updateCalculatorDisplay();
});

// Submit Button
submitButton.addEventListener("click", function (event) {
  if (!operator) {
    return 0;
  }
  event.preventDefault(); // Prevent form from reloading the page
  console.log("Submit button pressed");
  console.log("Current Result: ", currentOperand);
  console.log("Previous Result: ", prevOperand);
  console.log("Operator: ", operator);

  // operator if operations
  if (operator === "+") {
    result = add(prevOperand, currentOperand); // Call the add function with the recorded vlaues
  } else if (operator === "-") {
    result = subtract(prevOperand, currentOperand);
  } else if (operator === "*") {
    result = multiply(prevOperand, currentOperand);
  } else if (operator === "/") {
    result = divide(prevOperand, currentOperand);
  }
  // Update the display to reflect the operation
  updateCalculatorDisplay();

  // Reset for next operation
  operator = "";
  currentOperand = "";
  prevOperand = "";
});

// Digit Buttons
digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const digitValue = button.textContent;
    if (result) {
        result = ""
        updateCalculatorDisplay();

/*         resultField.textContent = ""; // reset result
 */    }

    if (!operator) {
      currentOperand += digitValue;
    } else {
      prevOperand += digitValue;
    }
    // Add digit
    updateCalculatorDisplay();
  });
});

const operatorButtons = document.querySelectorAll(".operator");
// Operator Buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // set the current result to the previous result
    const operatorValue = button.textContent;
    operator = operatorValue;
    console.log(operator);
    updateCalculatorDisplay();
    console.log(prevOperand, "this is the prev result atm");
  });
});

// Math Functions

function add(first, second) {
  let total = parseInt(first) + parseInt(second);
  return total;
}
function subtract(first, second) {
  return parseInt(first) - parseInt(second);
}

function multiply(first, second) {
  return parseInt(first) * parseInt(second);
}

function divide(first, second) {
  if (first || second === 0) {
    alert("Thats an invalid operation");
    currentOperand = "";
    prevOperand = "";
    operator = "";
    return;
  }
  return parseInt(first) / parseInt(second);
}
