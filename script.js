// Variables
let calculatorState = {
  currentOperand: "",
  prevOperand: "",
  operator: "",
  result: null,
};

// DOM Manipulation

let calculatorInput = document.getElementById("calculator-input");

const digitButtons = document.querySelectorAll(".digit");

const submitButton = document.getElementById("submit-button");

const resultField = document.getElementById("result");

const deleteButton = document.getElementById("delete-button");

let operatorButtons = document.querySelectorAll(".operator");

// Buttons

deleteButton.addEventListener("click", () => {
  resetCalculator();
});

submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form from reloading the page
  if (
    calculatorState.operator &&
    calculatorState.prevOperand &&
    calculatorState.currentOperand
  ) {
    operate();
  }
});

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
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
function updateCalculatorDisplay() {
  const { currentOperand, prevOperand, operator, result } = calculatorState;

  if (result !== null) {
   calculatorInput.textContent = result;
  } else {
    if (!operator) {
      calculatorInput.textContent = currentOperand;
      resultField.textContent = '';
    } else if (!currentOperand) {
        calculatorInput.textContent = `${prevOperand} ${operator}`;
      } else {
        calculatorInput.textContent = `${prevOperand} ${operator} ${currentOperand}`;
      }
  }
}

function handleDigitInput(digit) {
    const { operator, result } = calculatorState;
    if (result !== null) {
      // Start a new calculation after showing the result
      resetCalculator(false);
      calculatorState.currentOperand = digit;
      calculatorState.result = null; // Clear the result for a new input
    } else if (!operator) {
      // If no operator, build first number
      calculatorState.currentOperand += digit;
    } else {
      // If operator exists, build second number
      calculatorState.currentOperand += digit;
    }
     
    updateCalculatorDisplay();
 }

function handleOperatorInput(operator) {
  const { currentOperand, prevOperand, result } = calculatorState;
  if (result !== null) {
    calculatorState.prevOperand = result;
    calculatorState.currentOperand = "";
  }
  if (prevOperand && currentOperand) {
    operate(); // Perform the operation before switching
  }

  calculatorState.operator = operator;
  // If no previous operand, use current operand or result
  calculatorState.prevOperand =
    calculatorState.prevOperand ||
    calculatorState.currentOperand ||
    result
  calculatorState.currentOperand = "";
  updateCalculatorDisplay();
}

function operate() {
  const { operator, currentOperand, prevOperand } = calculatorState;

  if (!operator || !prevOperand || !currentOperand) return;

  let result;
  const num1 = parseFloat(prevOperand);
  const num2 = parseFloat(currentOperand);

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        alert("Cannot divide by zero");
        resetCalculator();
        return;
      }
      result = num1 / num2;
      break;
  }
  calculatorState.result = result;
  calculatorState.prevOperand = "";
  calculatorState.currentOperand = "";
  calculatorState.operator = "";

  updateCalculatorDisplay();
}

function resetCalculator(clearResult = true) {
  calculatorState.currentOperand = "";
  calculatorState.prevOperand = "";
  calculatorState.operator = "";
  if (clearResult) calculatorState.result = null;
  updateCalculatorDisplay();
}

function foo() {
  var something = "cool";
  var another = [1, 2, 3];
  function doSomething() {
    console.log(something);
  }
  function doAnother() {
    console.log(another.join(" ! "));
  }
}


function myFunc() {
for (var i=1; i<=5; i++) {
 (function(){
 var j = i;
 setTimeout( function timer(){
 console.log( j );
 }, j*1000 );
 })();
 }}

