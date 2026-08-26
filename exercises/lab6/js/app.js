import { celsiusToFahrenheit, fahrenheitToCelsius } from './converters/temperature.js';
import { cmToM, mToCm } from './converters/length.js';
import { formatResult } from './format.js';

const categorySelect = document.getElementById('category');
const valueInput = document.getElementById('value');
const fromUnitSelect = document.getElementById('from-unit');
const toUnitSelect = document.getElementById('to-unit');
const convertBtn = document.getElementById('convert-btn');
const resultEl = document.getElementById('result');

const temperatureUnits = ['celsius', 'fahrenheit'];
const lengthUnits = ['cm', 'm'];

function unitsMatchCategory(category, from, to) {
    const allowed = category === 'temperature' ? temperatureUnits : lengthUnits;
    return allowed.includes(from) && allowed.includes(to);
}

convertBtn.addEventListener('click', () => {
    const value = Number(valueInput.value);

    if (!Number.isFinite(value)) {
        resultEl.textContent = 'Error: ingrese un número válido';
        return;
    }

    const category = categorySelect.value;
    const from = fromUnitSelect.value;
    const to = toUnitSelect.value;

    console.log('category:', category, '| from:', from, '| to:', to);

    if (!unitsMatchCategory(category, from, to)) {
        resultEl.textContent = 'Error: unidad no válida para esta categoría';
        return;
    }

    let result;

    if (category === 'temperature') {
        if (from === 'celsius' && to === 'fahrenheit') {
            result = celsiusToFahrenheit(value);
        } else if (from === 'fahrenheit' && to === 'celsius') {
            result = fahrenheitToCelsius(value);
        } else {
            result = value; // misma unidad origen y destino
        }
    } else if (category === 'length') {
        if (from === 'cm' && to === 'm') {
            result = cmToM(value);
        } else if (from === 'm' && to === 'cm') {
            result = mToCm(value);
        } else {
            result = value;
        }
    }

    resultEl.textContent = `Resultado: ${formatResult(result)} ${unitLabel(to)}`;
});

function unitLabel(unit) {
    const labels = {
        celsius: '°C',
        fahrenheit: '°F',
        cm: 'cm',
        m: 'm',
    };
    return labels[unit] ?? unit;
}