import Calculator from "./calculator.js";

class CalculatorApp{

    #displayElement;
    #keypadElement;
    #calculator;
    constructor() {
        this.#displayElement = document.getElementById('display');
        this.#keypadElement = document.querySelector('.keypad');
        this.#calculator = new Calculator();
        this.init();
    }

    updateDisplay(){
        this.#displayElement.textContent = this.#calculator.getDisplayValue();
    }

    init(){
        this.#keypadElement.addEventListener('click', (event) => {
            this.handleKeypadClick(event);
        });
    }

    handleKeypadClick(event){
        const button = event.target.closest('button');
        if (!button) return;

        const { action, value } = button.dataset;

        switch (action) {
            case 'digit':
                this.#calculator.inputDigit(value);
                break;
            case 'decimal':
                this.#calculator.inputDecimal();
                break;
            case 'operator':
                this.#calculator.setOperator(value);
                break;
            case 'equals':
                this.#calculator.calculate(value);
                break;
            case 'clear-all':
                this.#calculator.clearAll();
                break;
            case 'clear entry':
                this.#calculator.clearEntry();
                break;
            case 'percent':
                this.#calculator.applyPercent();
                break;
            default:
                return;
        }
        this.updateDisplay();
    }
}

new CalculatorApp();