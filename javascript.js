const buttons = document.querySelectorAll('input[type=button]');
const displaybox = document.getElementById('result');

buttons.forEach(button => {
    button.addEventListener('click', display);
})

function display(e) {
    let buttonclicked = e.target.value;
  
    displaybox.value = buttonclicked;
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