const workingAreaDisplay = document.querySelector("#workingAreaDisplay");
const inputDisplay = document.querySelector("#inputDisplay");
const inputButtons = document.querySelectorAll(".inputButton");
const clearButton = document.querySelector("#buttonClear");

let firstValue = "";
let secondValue = "";
let operator = "";
const operators = "+-*/";

// apply click listeners for all of the input buttons
inputButtons.forEach(button => {
    button.addEventListener("click", updateInputDisplay);
});

clearButton.addEventListener("click", clearCalc);

// adds text from the button to what's already in the input display
function updateInputDisplay(e) {
    let temp = e.target.textContent;

    if (temp.length === 0 && isOperator(temp)) {
        return;
    } else if (isOperator(temp) && containsOperator()) {
        return;
    } else if (isOperator(temp) && rewriteOperatorCheck()) {
        // remove last two characters of the string
        inputDisplay.textContent = inputDisplay.textContent.slice(0, -2);
        inputDisplay.textContent += temp + " ";
    } else if (isOperator(temp) && !containsOperator()) {
        inputDisplay.textContent += " " + temp + " ";
    }
    else if (!isOperator(temp)) {
        inputDisplay.textContent += temp;
    }

}

// stores the values inside of the inputDisplay text inside of first/secondValue
function updateValues() {
    let equation = inputDisplay.textContent.split(" ");
    let firstNum = equation[0];
    let mathOp = equation[1];
    let secondNum = equation[2];

    if (firstNum.length !== 0) firstValue = firstValue;
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
    return x + y;
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

function operate(operator) {
    switch (operator) {
        case "+":
            add(x, y);
            break;
        case "-":
            subtract(x, y);
            break;
        case "*":
            multiply(x, y);
            break;
        case "/":
            divide(x, y);
            break;
        default:
            console.log("There was an issue within operate().")
    }
}

// clear/reset the calculator and all variables to start fresh
function clearCalc() {
    firstValue = "";
    secondValue = "";
    operator = "";
    inputDisplay.textContent = "";
}