const workingAreaDisplay = document.querySelector("#workingAreaDisplay");
const inputDisplay = document.querySelector("#inputDisplay");
const inputButtons = document.querySelectorAll(".inputButton");

let firstValue = "";
let secondValue = "";
let operator = "";
const operators = "+-*/";

// apply click listeners for all of the input buttons
inputButtons.forEach(button => {
    button.addEventListener("click", updateInputDisplay);
});

// adds text from the button to what's already in the input display
function updateInputDisplay(e) {
    inputDisplay.textContent += e.target.textContent;
}

// checks if the current string from a button is one of of the operator buttons
function isOperator(e) {
    const temp = e.target;
    
    if (operators.includes(temp)) {
        operator = e.target;
        return true;
    } else {
        return false;
    }
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