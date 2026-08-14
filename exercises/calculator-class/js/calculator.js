export default class Calculator{

    #display;
    #previousValue;
    #operator;
    #waitingForOperand;

    constructor(){
        this.#display = '0';
        this.#previousValue = null;
        this.#operator = null;
        this.#waitingForOperand = false;
    }

    getDisplayValue(){
        return this.#display;
    }

    static formatDisplay(value){
        if(!Number.isFinite(value)){
            return 'Error';
        }else if(String(value).length <= 10){
            return String(value);
        }else{
            return Number(value).toPrecision(6);
        }
    }

    static performCalculation(firstValue, secondValue, operator){
        switch (operator) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                if(secondValue === 0){
                    return NaN;
                }else{
                    return firstValue / secondValue;
                }
            default:
                return secondValue;
        }
    }

    inputDigit(digit) {
        if(this.#waitingForOperand) {
            this.#display = digit;
            this.#waitingForOperand = false;
        }else if(this.#display === '0') {
            this.#display = digit;
        }else {
            this.#display += digit;
        }
    }

    inputDecimal(){
        if(this.#waitingForOperand){
            this.#display = '0.';
            this.#waitingForOperand = false;
        }else if(!this.#display.includes('.')){
            this.#display = this.#display + '.';
        }
    }

    setOperator(nextOperator){
        const numero = parseFloat(this.#display);

        if(this.#previousValue === null){
            this.#previousValue = numero;
            console.log(numero);
            console.log("primer if");
        }else if(!this.#waitingForOperand && this.#operator != null){
            const resultado = Calculator.performCalculation(this.#previousValue, numero, this.#operator);
            this.#display = Calculator.formatDisplay(resultado);
            this.#previousValue = resultado;
            console.log("segundo if");
        }

        this.#waitingForOperand = true;
        this.#operator = nextOperator;
    }
    calculate(){
        if(this.#operator === null || this.#previousValue === null){
            return;
        }
        this.#display = Calculator.formatDisplay(Calculator.performCalculation(this.#previousValue, parseFloat(this.#display), this.#operator));

        this.#previousValue = null
        this.#operator = null;
        this.#waitingForOperand = true;
    }

    clearAll(){
        this.#display = '0';
        this.#previousValue = null;
        this.#operator = null;
        this.#waitingForOperand = false;
    }

    clearEntry(){
        const display = this.#display.toString().substring(0, this.#display.length - 1);

        if(display.toString().length === 0){

            this.#display = '0';

        }else{
            this.#display = display;
        }
    }

    applyPercent(){

        const value = parseFloat(this.#display);

        this.#display = Calculator.formatDisplay(value / 100);

        this.#waitingForOperand = true;
    }


}