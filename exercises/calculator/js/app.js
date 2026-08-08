
import {
    getDisplayValue,
    inputDigit,
    inputDecimal,
    setOperator,
    calculate,
    clearAll,
    clearEntry,
    applyPercent
} from './calculator.js';

const displayElement = document.getElementById('display');
const keypadElement = document.querySelector('.keypad');

function updateDisplay() {
    displayElement.textContent = getDisplayValue();
}

updateDisplay();

keypadElement.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const { action, value } = button.dataset;

    switch (action) {
        case 'digit':
            inputDigit(value);
            break;
        case 'decimal':
            inputDecimal();
            break;
        case 'operator':
            setOperator(value);
            break;
        case 'equals':
            calculate(value);
            break;
        case 'clear-all':
            clearAll();
            break;
        case 'clear entry':
            clearEntry();
            break;
        case 'percent':
            applyPercent();
            break;
        default:
            return;
    }
    updateDisplay();
});