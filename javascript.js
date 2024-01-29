const buttons = document.querySelectorAll('input[type=button]');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const operatorValues = Array.from(operatorButtons, ({ value }) => value);
const equalButton = document.getElementById('equal')
const displaybox = document.getElementById('result');
const cal = new Calculator;
displaybox.defaultValue = 0;
let firstNumber;
let operator;
let secondNumber;


numberButtons.forEach(button => {
    button.addEventListener('click', display);
})

function display(e) {
    if (displaybox.value == 0) {
        let buttonclicked = e.target.value;
        displaybox.value = buttonclicked;
    } else
    if (operatorValues.indexOf(displaybox.value) == -1) {
        let buttonclicked = e.target.value;
        displaybox.value += buttonclicked;
    } else {
        let buttonclicked = e.target.value;
        displaybox.value = "";
    displaybox.value += buttonclicked;}
    // if (e.target.value === "/" || e.target.value === "*" || e.target.value === "-" || e.target.value === "+") {
    //     firstNumber = displaybox.value;
    //     displaybox.value = e.target.value;
    }

operatorButtons.forEach(button => {
    button.addEventListener('click', storeFirstNumberAndOperator);
})

function storeFirstNumberAndOperator(e) {
    if (firstNumber === undefined){
    firstNumber = displaybox.value;
    operator = e.target.value;
    displaybox.value = operator;
    }
    else if (secondNumber === undefined) {
        secondNumber = displaybox.value;
        let resultmath = firstNumber + " " + operator + " " + secondNumber;
        displaybox.value = cal.operate(resultmath);
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