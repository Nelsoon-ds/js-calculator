// Calculator operation = a number, an operator, another number (3 + 5)



function operate(operator, num, num2) {
    if (operator === '+') {
        return num + num2;
    } else if (operator === '-') {
        return num - num2;
    } else if (operator === '*') {
        return num * num2;
    } else if (operator === '/') {
        return num / num2;
    } else {
        return null; // Return null for unsupported operators
    }
}



function add (num, num2) {
    return num + num2;
}
function subtract (num, num2) {
    return num - num2;
}

function multiply (num, num2) {
    return num * num2;
}

function divide (num, num2) {
    return num / num2;
}