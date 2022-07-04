let number1 = "";
let number2 = "";
let op = null;
let resetScreen = false;

const operator = document.querySelectorAll(".operator");
const number = document.querySelectorAll(".number");
const equal = document.querySelector(".equal");
const clearItAll = document.querySelector(".clearItAll");
const backspace = document.querySelector(".Backspace");
const decimal = document.querySelector(".decimal");
const cinput = document.querySelector(".currentOp");
const coutput = document.querySelector(".pastOp");

window.addEventListener('keydown',keyBoardInput);
equal.addEventListener('click', evaluate);
clearItAll.addEventListener('click',clearIt);
backspace.addEventListener('click',backSpaceElement);
decimal.addEventListener('click', addDecimal);

number.forEach(element => { 
    element.addEventListener('click',(e) => 
    {
        addNumber(e.target.textContent);
    });
}
);

operator.forEach(element => {
    element.addEventListener('click',(e) => 
    {
        addOperation(e.target.textContent);
    });
}
);


function addNumber(num) {
    if (cinput.textContent === '0' || resetScreen) {
        clearDisplay();
    }
    // console.log(num);
    cinput.textContent += num;
}

function clearDisplay() {
    cinput.textContent = '';
    resetScreen = false;
}

function clearIt() {
    cinput.textContent = '0';
    coutput.textContent = '';
    number1 = '';
    number2 = '';
    op = null;
}
function addDecimal() {
    if(resetScreen) clearDisplay();
    if (cinput.textContent === '') {
        cinput.textContent = '0';
    }
    if (cinput.textContent.includes('.')) {
        return;    
    }
    cinput.textContent += '.';
}

function backSpaceElement() {
    cinput.textContent = cinput.textContent.toString().slice(0,-1);    
}

function addOperation(opr) {
    if (op != null) evaluate();
    number1 = cinput.textContent;
    op = opr;
    coutput.textContent = `${number1} ${op}`;
    resetScreen = true;
}

function evaluate() {
    if (op === null || resetScreen) {
        return;
    }
    if (op === '/' && cinput.textContent === '0') {
        alert("Not possible");
        return;
      }
      number2 = cinput.textContent;
      cinput.textContent = roundIt(operate(number1, number2, op));
      coutput.textContent = `${number1} ${op} ${number2} =`;
      op = null
    }
    
function roundIt(num) {
        return Math.round(num * 1000) / 1000;
}

function keyBoardInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        addNumber(e.key);
    }
    if (e.key === '.') {
        addDecimal();
    }
    if (e.key === '=' || e.key === 'Enter') {
        evaluate();
    }
    if (e.key === 'Backspace') {
        backSpaceElement();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '%' || e.key === '/') 
    {
        addOperation(convertOperator(e.key));
    }
}


function convertOperator(keys) {
    if (keys === '/') return '/';
    if (keys === '*') return 'x';
    if (keys === '-') return '-';
    if (keys === '+') return '+';
  }

function operate(num1,num2,opre) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);

    switch (opre) {
        case '+':
            console.log(num1 + num2);
            return num1 + num2;
            break;
        case '-':
            return num1 - num2;
            break;
        case 'x':
            return num1 * num2;
            break;
        case '/':
            if(num2 === 0)
                return null;
            else
            return num1 / num2;
            break;
        case '%':
            return num1 % num2;
            break;
        default:
                return null;
    }
}