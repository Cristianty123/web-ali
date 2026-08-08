const calculatorState = {
    display: '0',
    previousValue: null,
    operator: null,
    waitingForOperand: false,
};

export function getDisplayValue() {
    return calculatorState.display;
}

export function inputDigit(digit) {
    if(calculatorState.waitingForOperand) {
        calculatorState.display = digit;
        calculatorState.waitingForOperand = false;
    }else if(calculatorState.display === '0') {
        calculatorState.display = digit;
    }else {
        calculatorState.display += digit;
    }
}
export function inputDecimal(){

    if(calculatorState.waitingForOperand){
        calculatorState.display = '0.';
        calculatorState.waitingForOperand = false;
    }else if(!calculatorState.display.includes('.')){
        calculatorState.display = calculatorState.display + '.';
    }
}

export function formatDisplay(value){
    if(!Number.isFinite(value)){
        return 'Error';
    }else if(String(value).length <= 10){
        return String(value);
    }else{
        return Number(value).toPrecision(6);
    }
}

export function setOperator(nextOperator){
    const numero = parseFloat(calculatorState.display);

    if(calculatorState.previousValue === null){
        calculatorState.previousValue = numero;
        console.log(numero);
        console.log("primer if");
    }else if(!calculatorState.waitingForOperand && calculatorState.operator != null){
        const resultado = performCalculation(calculatorState.previousValue, numero, calculatorState.operator);
        calculatorState.display = formatDisplay(resultado);
        calculatorState.previousValue = resultado;
        console.log("segundo if");
    }

    calculatorState.waitingForOperand = true;
    calculatorState.operator = nextOperator;
    console.log(calculatorState.operator);
    
}

function performCalculation(firstValue, secondValue, operator){
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
export function calculate(){
    if(calculatorState.operator === null || calculatorState.previousValue === null){
        return;
    }
    calculatorState.display = formatDisplay(performCalculation(calculatorState.previousValue, parseFloat(calculatorState.display), calculatorState.operator));

    calculatorState.previousValue = null
    calculatorState.operator = null;
    calculatorState.waitingForOperand = true;
}

export function clearAll(){
    calculatorState.display = '0';
    calculatorState.previousValue = null;
    calculatorState.operator = null;
    calculatorState.waitingForOperand = false;
}

export function clearEntry(){


    const display = calculatorState.display.toString().substring(0, calculatorState.display.length - 1);

    if(display.toString().length === 0){

        calculatorState.display = '0';

    }else{
        calculatorState.display = display;
    }
}

export function applyPercent(){

    const value = parseFloat(calculatorState.display);

    calculatorState.display = formatDisplay(value / 100);

    calculatorState.waitingForOperand = true;
}
