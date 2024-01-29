const buttons = document.querySelectorAll('input[type=button]');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const operatorValues = Array.from(operatorButtons, ({ value }) => value);
const equalButton = document.getElementById('equal')
const displaybox = document.getElementById('result');
const cal = new Calculator;
displaybox.defaultValue = 0;
let firstNumber = "0";
let operator = "";
let secondNumber = "";


numberButtons.forEach(button => {
    button.addEventListener('click', display);
})

function display(e) {
    if (firstNumber == 0 && !operator) {
        firstNumber = e.target.value;
        displaybox.value = firstNumber;
    } else
    if (!operator) {
        firstNumber += e.target.value;
        displaybox.value = firstNumber;
    } else if (firstNumber && operator) {
        displaybox.value = "";
        secondNumber += e.target.value;
        displaybox.value = secondNumber;}
    }


operatorButtons.forEach(button => {
    button.addEventListener('click', operate);
})

function operate(e) {
    if (firstNumber && !operator) {
    operator = e.target.value;
    displaybox.value = operator;
    } 
    else if (secondNumber) {
        let resultmath = firstNumber + " " + operator + " " + secondNumber;
        displaybox.value = cal.operate(resultmath);
        firstNumber = displaybox.value;
        operator = e.target.value;
        secondNumber = "";
    } 
    }

equalButton.addEventListener('click',equal);

function equal(e) {
     if (secondNumber &&  e.target.value === "=") {
        let resultmath = firstNumber + " " + operator + " " + secondNumber;
        displaybox.value = cal.operate(resultmath);
        firstNumber = displaybox.value;
        operator = "";
        secondNumber = "";
    }
}
function Calculator () {

    this.methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
    }

    this.operate = function(str) {

        let split = str.split(' '),
        a = +split[0],
        op = split[1],
        b = +split[2];

        if (!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }

        return this.methods[op](a, b);
    }
}

// press number buttons and store it in the firstnumber variable 
// press operator button and store it in the operator variable
// press number buttons and store it in the 