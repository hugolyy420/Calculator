const buttons = document.querySelectorAll('input[type=button]');
const input = document.getElementById('result')
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const operatorValues = Array.from(operatorButtons, ({ value }) => value);
const equalButton = document.getElementById('equal')
const displaybox = document.getElementById('result');
const processbox = document.getElementById('process');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal');
const deleteButton = document.getElementById('delete');
const plusMinusButton = document.getElementById('plus-minus')
const percentageButton = document.getElementById('percentage')
const cal = new Calculator;
displaybox.textContent = 0;
let firstNumber = "0";
let operator = "";
let secondNumber = "";

document.addEventListener("keydown", (event) => {
    if (event.key >= "0" && event.key <= "9") {
        let numberPressed = event.key
        keyboardNumberDisplay(numberPressed);
    } else if (event.key == "+" || event.key == "*" || event.key == "-" || event.key == "/") {
        let operatorPressed = event.key
        keyboardOperatorDisplay (operatorPressed)
    } else if (event.key == "=" || event.key === "Enter") {
        keyboardEqualDisplay();
    } else if (event.key === "Escape") {
        clear ();
    } else if (event.key === "Backspace") {
        deleteNumber ();
    } else if (event.key === ".") {
        let decimalPointPressed = event.key
        keyboardDecimalPointDisplay(decimalPointPressed);
    }

})

function keyboardNumberDisplay (str) {
    if (displaybox.textContent.includes(".") && firstNumber && !operator) {
        firstNumber += str;
        displaybox.textContent = firstNumber;
    } else if (firstNumber == 0 && !operator) {
        firstNumber = str;
        displaybox.textContent = firstNumber;
    } 
    else if (!operator) {
        firstNumber += str;
        displaybox.textContent = firstNumber;
    } else if (firstNumber && operator) {
        displaybox.textContent = "";
        secondNumber += str;
        displaybox.textContent = secondNumber;}
    }

function keyboardOperatorDisplay (str) {
    if (firstNumber && !operator) {
        operator = str;
        processbox.textContent = firstNumber + " " + operator;
        } 
        else if (secondNumber) {
            let resultmath = firstNumber + " " + operator + " " + secondNumber;
            displaybox.textContent = Math.round(cal.operate(resultmath)*1000)/1000;
            firstNumber = displaybox.textContent;
            operator = str;
            secondNumber = "";
            processbox.textContent = firstNumber + " " + operator;
        } else if (operator && firstNumber && !secondNumber) {
            operator = str;
            processbox.textContent = firstNumber + " " + operator;
        } 
}

function keyboardEqualDisplay () {
    if (firstNumber && operator && secondNumber) {
        console.log("equal");
        let resultmath = firstNumber + " " + operator + " " + secondNumber;
        displaybox.textContent = Math.round(cal.operate(resultmath)*1000)/1000;
        processbox.textContent = firstNumber + " " + operator + " " + secondNumber + " " + "=";
        firstNumber = displaybox.textContent;
        operator = "";
        secondNumber = "";
    }
}

function keyboardDecimalPointDisplay (str) {
    if (firstNumber && !firstNumber.includes(".") && !operator){
        decimalButton.disabled = false;
        firstNumber += str;
        displaybox.textContent = firstNumber;
    } else if (secondNumber && !secondNumber.includes(".")) {
        decimalButton.disabled = false;
        secondNumber += str;
        displaybox.textContent = secondNumber;
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', display);
})

function display(e) {
    if (displaybox.textContent.includes(".") && firstNumber && !operator) {
        this.blur();
        firstNumber += e.target.value;
        displaybox.textContent = firstNumber;
    } else if (firstNumber == 0 && !operator) {
        this.blur();
        firstNumber = e.target.value;
        displaybox.textContent = firstNumber;
    } 
    else if (!operator) {
        this.blur();
        firstNumber += e.target.value;
        displaybox.textContent = firstNumber;
    } else if (firstNumber && operator) {
        this.blur();
        displaybox.textContent = "";
        secondNumber += e.target.value;
        displaybox.textContent = secondNumber;}
    }


operatorButtons.forEach(button => {
    button.addEventListener('click', operateStart);
})

function operateStart(e) {
    if (firstNumber && !operator) {
    this.blur();
    operator = e.target.value;
    processbox.textContent = firstNumber + " " + operator;
    displaybox.textContent = operator;
    } 
    else if (secondNumber) {
        this.blur();
        let resultmath = firstNumber + " " + operator + " " + secondNumber;
        displaybox.textContent = Math.round(cal.operate(resultmath)*1000)/1000;
        firstNumber = displaybox.textContent;
        operator = e.target.value;
        secondNumber = "";
        processbox.textContent = firstNumber + " " + operator;
    } else if (operator && firstNumber && !secondNumber) {
        this.blur();
        operator = e.target.value;
        processbox.textContent = firstNumber + " " + operator;
    }
    }

equalButton.addEventListener('click',equal);

function equal(e) {
     if (secondNumber &&  e.target.value === "=") {
        this.blur();
        let resultmath = firstNumber + " " + operator + " " + secondNumber;
        displaybox.textContent = Math.round(cal.operate(resultmath)*1000)/1000;
        processbox.textContent = firstNumber + " " + operator + " " + secondNumber + " " + "=";
        firstNumber = displaybox.textContent;
        operator = "";
        secondNumber = "";
    }
}

clearButton.addEventListener('click', clear);

function clear() {
    this.blur();
    displaybox.textContent = 0;
    processbox.textContent = "";
    firstNumber = "0";
    operator = "";
    secondNumber = "";
}

decimalButton.addEventListener('click', addDecimalPoint);

function addDecimalPoint (e) {
    if (firstNumber && !firstNumber.includes(".") && !operator){
        this.blur();
        decimalButton.disabled = false;
        firstNumber += e.target.value;
        displaybox.textContent = firstNumber;
    } else if (secondNumber && !secondNumber.includes(".")) {
        this.blur();
        decimalButton.disabled = false;
        secondNumber += e.target.value;
        displaybox.textContent = secondNumber;
    }
}

deleteButton.addEventListener('click', deleteNumber)

function deleteNumber () {
    if (firstNumber && !operator) {
        this.blur();
      firstNumber = firstNumber.toString().slice(0,-1);
      displaybox.textContent = firstNumber;
    } else if (secondNumber) {
        this.blur();
        secondNumber = secondNumber.toString().slice(0,-1);
      displaybox.textContent = secondNumber;
    }
}

plusMinusButton.addEventListener('click', plusMinus)

function plusMinus () {
    if (firstNumber && !operator) {
        this.blur();
        firstNumber *= -1;
        displaybox.textContent = firstNumber;
      } else if (secondNumber) {
        this.blur();
          secondNumber *= -1;
        displaybox.textContent = secondNumber;
      }
}

percentageButton.addEventListener('click', percentage)

function percentage () {
    if (firstNumber && !operator) {
        this.blur();
        firstNumber *= 1/100;
        displaybox.textContent = firstNumber;
      } else if (secondNumber) {
        this.blur();
          secondNumber *= 1/100;
        displaybox.textContent = secondNumber;
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