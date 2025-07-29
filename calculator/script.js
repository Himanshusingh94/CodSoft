document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let storedExpression = '';
    let operator = null;
    let firstOperand = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.value = storedExpression + currentInput || '0';
    }

    function appendNumber(number) {
        if (waitingForSecondOperand) {
            currentInput = number;
            waitingForSecondOperand = false;
        } else {
            if (currentInput === '0' && number !== '0' && number !== '.') {
                currentInput = number;
            } else {
                currentInput += number;
            }
        }
        updateDisplay();
    }

    function appendDecimal() {
        if (waitingForSecondOperand) {
            currentInput = '0.';
            waitingForSecondOperand = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            storedExpression = firstOperand + ' ' + operator + ' ';
            updateDisplay();
            return;
        }

        if (firstOperand === null && currentInput !== '') {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            currentInput = String(result);
            firstOperand = result;
        } else {
            firstOperand = inputValue;
        }

        operator = nextOperator;
        storedExpression = firstOperand + ' ' + operator + ' ';
        currentInput = '';
        waitingForSecondOperand = true;
        updateDisplay();
    }

    const performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
        '^': (firstOperand, secondOperand) => Math.pow(firstOperand, secondOperand)
    };

    function calculate() {
        if (operator === null || (waitingForSecondOperand && currentInput === '')) {
            return;
        }

        const secondOperand = parseFloat(currentInput);

        if (operator === '/' && secondOperand === 0) {
            alert("Cannot divide by zero!");
            clearCalculator();
            return;
        }

        const result = performCalculation[operator](firstOperand, secondOperand);
        currentInput = String(result);
        storedExpression = '';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }

    function clearCalculator() {
        currentInput = '';
        storedExpression = '';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }

    function backspace() {
        if (waitingForSecondOperand && currentInput === '') {
            currentInput = String(firstOperand);
            storedExpression = '';
            operator = null;
            firstOperand = null;
            waitingForSecondOperand = false;
        } else if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '') {
                currentInput = '0';
            }
        }
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonText = event.target.textContent;

            if (buttonText === 'C') {
                clearCalculator();
            } else if (buttonText === 'DEL') {
                backspace();
            } else if (buttonText === '=') {
                calculate();
            } else if (['/', '*', '-', '+', '^'].includes(buttonText)) {
                handleOperator(buttonText);
            } else if (buttonText === '.') {
                appendDecimal();
            } else {
                appendNumber(buttonText);
            }
        });
    });

    updateDisplay();
});
```