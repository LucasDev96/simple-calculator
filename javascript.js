const answerDisplay = document.querySelector("#answerDisplay");
const inputDisplay = document.querySelector("#inputDisplay");
const inputButtons = document.querySelectorAll(".inputButton");
const backspaceButton = document.querySelector("#buttonBackspace");
const clearButton = document.querySelector("#buttonClear");
const equalsButton = document.querySelector("#buttonEnter");

let firstValue = "";
let secondValue = "";
let operator = "";
const operators = "+-*/";

// apply click listeners for all of the input buttons
inputButtons.forEach(button => {
    button.addEventListener("click", updateInputDisplay);
});

equalsButton.addEventListener("click", pressEquals);
backspaceButton.addEventListener("click", backspaceInput);
clearButton.addEventListener("click", clearCalc);

// adds text from the button to what's already in the input display
function updateInputDisplay(e) {
    let temp = e.target.textContent;

    if (temp.length === 0 && isOperator(temp)) {
        return;
    } else if (isOperator(temp) && rewriteOperatorCheck()) {
        // remove last two characters of the string
        inputDisplay.textContent = inputDisplay.textContent.slice(0, -2);
        inputDisplay.textContent += temp + " ";
    } else if (isOperator(temp) && containsOperator() && checkValues()) {
        startNewOperation();
        inputDisplay.textContent += " " + temp + " ";
    } else if (isOperator(temp) && !containsOperator()) {
        inputDisplay.textContent += " " + temp + " ";
    } else if (!isOperator(temp)) {
        inputDisplay.textContent += temp;
    }

}

// check if all values are present to commit to doing a full operation
function checkValues() {
    let equation = inputDisplay.textContent.split(" ");
    let firstNum = equation[0];
    let mathOp = equation[1];
    let secondNum = equation[2];

    if (firstNum.length !== 0 && mathOp.length !== 0 && secondNum.length !== 0) {
        return true;
    }
    return false;
}

// stores the values inside of the inputDisplay text inside of first/secondValue
function updateValues() {
    let equation = inputDisplay.textContent.split(" ");
    let firstNum = equation[0];
    let mathOp = equation[1];
    let secondNum = equation[2];

    if (firstNum.length !== 0) firstValue = firstNum;
    if (mathOp.length !== 0) operator = mathOp;
    if (secondNum.length !== 0) secondValue = secondNum;
}

// checks if the current string from a button is one of of the operator buttons
function isOperator(text) {

    if (operators.includes(text)) {
        return true;
    } else {
        return false;
    }
}

// checks if the input display already has an operator in it
function containsOperator() {
    let ops = operators.split("");
    let tracker = false;
    ops.forEach(op => {
        if (inputDisplay.textContent.includes(op)) {
            tracker = true;
        }
    });
    return tracker;
}

// checks if the last input clicked on was an operator
function rewriteOperatorCheck() {
    let text = inputDisplay.textContent.split("");
    let potentialOperator = text[text.length - 2];

    return isOperator(potentialOperator);

}

function add(x, y) {
    return +x + +y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate() {
    switch (operator) {
        case "+":
            return add(firstValue, secondValue);
        case "-":
            return subtract(firstValue, secondValue);
        case "*":
            return multiply(firstValue, secondValue);
        case "/":
            return divide(firstValue, secondValue);
        default:
            console.log("There was an issue within operate().")
    }
}

// check to make sure appropriate values are present, update variables, execute
// operate
function pressEquals() {
    if (!checkValues()) return;

    updateValues();

    answerDisplay.textContent = operate();
}

// completes first operation to then begin another for when one single full operation
// already exists, and a new operator is clicked on
function startNewOperation() {
    if (!checkValues()) return;

    updateValues();

    inputDisplay.textContent = operate();
    answerDisplay.textContent = operate();
}

// erases most recently written thing in the input display, checks empitness and spacing
function backspaceInput() {
    if (inputDisplay.textContent.length === 0) {
        return;
    } else if (rewriteOperatorCheck()) {
        inputDisplay.textContent = inputDisplay.textContent.slice(0, -3);
    } else {
        inputDisplay.textContent = inputDisplay.textContent.slice(0, -1);
    }
}

// clear/reset the calculator and all variables to start fresh
function clearCalc() {
    firstValue = "";
    secondValue = "";
    operator = "";
    inputDisplay.textContent = "";
    answerDisplay.textContent = "";
}