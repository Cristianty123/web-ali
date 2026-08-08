# Glosario - Lab 4 Calculadora JS

**Asignatura:** Desarrollo de aplicaciones web
**Docente:** Ing. Audo Alí Díaz Gómez
**Tema:** Referencia de conceptos (HTML, CSS y JavaScript)

---

## Objetivo

Documento de consulta con definiciones breves de los términos usados en los ejercicios 1 y 2 del laboratorio de calculadora. Cada entrada enlaza el concepto con archivos y fragmentos del proyecto cuando aplica.

---

## Arquitectura de una página web

### HTML, CSS y JavaScript (las tres capas)

| Capa | Pregunta que responde | En este lab |
|---|---|---|
| HTML | Qué hay en la página | Botones, pantalla, tabla del teclado |
| CSS | Cómo se ve y cómo se dispone | Colores, fuentes, layout tabla/flex/grid |
| JavaScript | Qué hace o cambia | Calcular, actualizar pantalla, responder clics |

### Separación de archivos

| Archivo | Rol |
|---|---|
| `index-table.html` | Estructura (marcado) |
| `calculator-base.css` | Apariencia compartida (colores, botones, pantalla) |
| `calculator-table.css` | Solo layout de la tabla |
| `calculator.js` | Lógica de cálculo (sin tocar el DOM) |
| `app.js` | Conexión con el DOM y eventos |

Separar lógica (`calculator.js`) de interfaz (`app.js`) facilita leer, probar y reutilizar el código.

---

## HTML

### `<!DOCTYPE html>`

Declara que el documento sigue el estándar HTML5. El navegador interpreta la página en modo estándar (no en "quirks mode").

### `lang="es"` (en `<html>`)

Indica que el contenido está en español. Mejora accesibilidad (lectores de pantalla) y SEO.

### `<meta charset="UTF-8">`

Define la codificación de caracteres. Permite mostrar tildes, `÷`, `×`, etc.

### Viewport (`<meta name="viewport" content="width=device-width, initial-scale=1.0">`)

Indica al navegador cómo escalar la página en dispositivos móviles.

- `width=device-width`: el ancho lógico coincide con el ancho de la pantalla del dispositivo.
- `initial-scale=1.0`: sin zoom inicial.

Sin esta etiqueta, muchos móviles muestran la página encogida, como si fuera un monitor de escritorio.

### `<title>`

Texto que aparece en la pestaña del navegador.

### `<main>`

Landmark semántico: marca el contenido principal de la página (la calculadora). Preferible a un `<div>` genérico.

### `id` y `class`

| Atributo | Uso | Regla típica | Ejemplo en el lab |
|---|---|---|---|
| `id` | Identificador único | Solo uno por página con ese nombre | `id="display"` |
| `class` | Etiqueta reutilizable | Varios elementos pueden compartirla | `class="btn btn-action"` |

Un mismo elemento puede tener `id` y `class`:

```html
<div id="display" class="display">0</div>
```

### Selectores CSS vs atributos HTML

En HTML se declara el nombre. En CSS/JS se busca con un prefijo:

| En HTML | En CSS / `querySelector` | En `getElementById` |
|---|---|---|
| `id="display"` | `#display` | `'display'` (sin `#`) |
| `class="keypad"` | `.keypad` | - |
| `<button>` | `button` | - |

### `<table>`, `<tr>`, `<td>`

Estructura tabular del teclado:

| Etiqueta | Significado | En la calculadora |
|---|---|---|
| `<table>` | Contenedor de la tabla | `<table class="keypad">` |
| `<tr>` | Fila (*table row*) | Una hilera de botones (AC/CE/%, 7-8-9, etc.) |
| `<td>` | Celda (*table data*) | Un botón por celda |

### `rowspan`

Atributo de `<td>` que indica cuántas filas ocupa esa celda.

```html
<td rowspan="2">
  <button class="btn-plus">+</button>
</td>
```

El botón `+` ocupa la altura de dos filas. Equivalente conceptual de `grid-row: span 2` en CSS Grid.

### `<button type="button">`

Crea un botón clickeable.

- `type="button"`: botón normal. No envía un formulario.
- Sin `type`, dentro de un `<form>` el comportamiento por defecto puede ser `submit`.

### Atributos `data-*` (`data-action`, `data-value`)

Atributos personalizados para guardar datos en el HTML que JavaScript leerá después:

```html
<button data-action="digit" data-value="7">7</button>
```

En JS se accede con `button.dataset.action` y `button.dataset.value`.

Un solo manejador de clic puede distinguir qué botón se presionó sin asignar un `id` distinto a cada tecla.

### Accesibilidad: `aria-label` y `aria-live`

| Atributo | Función | Ejemplo |
|---|---|---|
| `aria-label` | Nombre accesible cuando el texto visible no basta | `aria-label="Dividir"` en el botón `÷` |
| `aria-live="polite"` | Anuncia cambios de contenido a lectores de pantalla | En `#display` cuando cambia el número |

### `<link>` (recursos externos)

El elemento `<link>` en `<head>` conecta la página con recursos externos (CSS, fuentes, etc.).

#### `rel` (*relationship*)

Indica qué tipo de relación hay entre el documento y el recurso enlazado.

| Valor de `rel` | Significado | En el lab |
|---|---|---|
| `stylesheet` | Hoja de estilos CSS | `calculator-base.css`, `calculator-table.css` |
| `preconnect` | Conectar antes con otro servidor (optimización) | Google Fonts |

Ejemplo:

```html
<link rel="stylesheet" href="css/calculator-base.css" />
```

- `rel="stylesheet"`: el archivo enlazado es una hoja de estilos.
- `href`: ruta del archivo.

#### `preconnect`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

Indica al navegador que inicie la conexión con ese servidor antes de necesitar el recurso. Reduce la espera al cargar fuentes desde Google Fonts.

`crossorigin` en el segundo enlace permite la conexión segura con el CDN de archivos de fuente.

#### Fuente externa (Google Fonts)

```html
<link
  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
  rel="stylesheet"
/>
```

Descarga la familia tipográfica Orbitron (peso 700) para usarla en CSS:

```css
font-family: 'Orbitron', monospace;
```

### `<script src="...">` al final del `<body>`

Carga un archivo JavaScript externo.

Se coloca antes de `</body>` porque `app.js` busca `#display` y `.keypad` en cuanto se ejecuta. Esos elementos deben existir ya en el DOM.

Orden en el lab:

1. `calculator.js` (define funciones)
2. `app.js` (las usa)

---

## CSS

### Hoja de estilos externa

Archivo `.css` enlazado con `<link rel="stylesheet" href="...">`. Separa presentación del HTML.

En el lab hay dos niveles:

- Base (`calculator-base.css`): colores, tipografía, botones, pantalla.
- Layout (`calculator-table.css`, etc.): solo cómo se dispone el teclado.

### Selector

Patrón para elegir elementos y aplicarles estilos.

| Tipo | Sintaxis | Ejemplo |
|---|---|---|
| Por clase | `.nombre` | `.display`, `.btn` |
| Por id | `#nombre` | `#display` |
| Por etiqueta | `etiqueta` | `body`, `button` |
| Combinado | `.padre .hijo` | `.keypad .btn` |
| Pseudo-elemento | `::after` | Brillo en la pantalla LCD |

### `box-sizing: border-box`

Con `border-box`, el `padding` y el `border` cuentan dentro del ancho/alto del elemento. Facilita calcular tamaños sin sorpresas.

### Unidades: `px`, `em` y `rem`

| Unidad | Relativo a | Comportamiento | Uso típico en el lab |
|---|---|---|---|
| `px` | Píxel fijo del CSS | No cambia con el padre | Valores concretos (sombras, bordes) |
| `em` | Tamaño de fuente del padre | Se acumula en elementos anidados | Componentes que escalan con su contenedor |
| `rem` | Tamaño de fuente del root (`html`) | Consistente en toda la página | Recomendado para padding, márgenes, fuentes |

El lab usa principalmente `rem`:

```css
padding: 1.25rem;
font-size: 2rem;
min-height: 3.4rem;
gap: 0.65rem;
```

Si `html { font-size: 16px; }`, entonces `1.25rem = 20px`, `2rem = 32px`.

| Criterio | `px` | `em` | `rem` |
|---|---|---|---|
| Referencia | Píxel fijo CSS | Fuente del padre | Fuente del root (`html`) |
| Escala con el padre | No | Sí | No (solo con root) |
| Hereda tamaño del padre | No | Sí | No |
| Se acumula en anidamiento | No | Sí | No |
| Fácil de predecir | Muy | A veces difícil | Muy |
| Accesibilidad (escala de fuente del usuario) | Buena | Excelente | Excelente |
| Uso recomendado hoy | Limitado | Tamaño local por componente | Tipografía y espaciado general |

Ejemplo comparativo (con `html { font-size: 16px; }` y padre con `font-size: 20px`):

```css
html {
  font-size: 16px;
}

.parent {
  font-size: 20px;
}

.child-px {
  font-size: 16px;
}

.child-em {
  font-size: 1.5em;
}

.child-rem {
  font-size: 1.5rem;
}
```

| Elemento | Cálculo | Tamaño final |
|---|---|---|
| `.child-px` | 16px | 16px |
| `.child-em` | 1.5 x 20px | 30px |
| `.child-rem` | 1.5 x 16px | 24px |

### `calc()`

Función CSS para calcular valores:

```css
min-height: calc(3.4rem * 2 + 0.65rem);
```

Altura mínima del botón `+`: dos filas de botón más el espacio (`gap`) entre ellas.

### Colores

| Formato | Ejemplo | Notas |
|---|---|---|
| Hexadecimal | `#9a9a9a`, `#ffb347` | Muy común en CSS |
| `rgba()` | `rgba(0, 0, 0, 0.28)` | Color con transparencia (último valor = opacidad) |

### `linear-gradient`

Fondo con degradado:

```css
background: linear-gradient(180deg, #ececec 0%, #d8d8d8 100%);
```

`180deg`: de arriba hacia abajo. Simula volumen en botones y marco de la calculadora.

### `box-shadow`

Sombra exterior o interior (`inset`):

- Sombra exterior: la calculadora parece flotar sobre el fondo.
- Sombra `inset`: la pantalla parece hundida.

### Pseudo-clase `:active`

Estilo mientras el usuario mantiene presionado el botón (efecto de hundimiento).

### Pseudo-elemento `::after`

Crea un elemento visual extra que no está en el HTML. En el lab simula el brillo de cristal sobre la pantalla LCD.

### Layout: tabla vs Flexbox vs Grid

| Técnica | Dónde se define la cuadrícula | Botón `+` alto |
|---|---|---|
| Tabla HTML | Filas `<tr>` y celdas `<td>` | `rowspan="2"` |
| Flexbox | Filas `.keypad-row` con `display: flex` | Bloque `.keypad-bottom` + botón estirado |
| CSS Grid | `grid-template-columns: repeat(4, 1fr)` | `grid-row: span 2` |

Conceptos Flexbox usados en el ejercicio 2:

- `display: flex`: contenedor flexible.
- `flex-direction: column`: apilar filas verticalmente.
- `flex: 1`: repartir espacio equitativamente entre hijos.
- `gap`: espacio entre elementos.

Conceptos Grid usados en el ejercicio 2:

- `display: grid`: cuadrícula en CSS.
- `grid-template-columns`: número y tamaño de columnas.
- `grid-row: span 2`: ocupar dos filas de la cuadrícula.

### Propiedades de tabla en CSS

| Propiedad | Función |
|---|---|
| `border-collapse: separate` | Celdas separadas (permite `border-spacing`) |
| `border-spacing` | Espacio entre celdas (equivalente visual a `gap`) |
| `width: 25%` en `td` | Cuatro columnas iguales |

---

## JavaScript y DOM

### Fundamentos del lenguaje JavaScript

Conceptos del lenguaje usados en `calculator.js` y `app.js`, además de los ya vistos en el Lab 2.

#### Objeto literal

Sintaxis `{}` para agrupar datos con nombre en pares clave-valor:

```javascript
const calculatorState = {
  display: '0',
  previousValue: null,
  operator: null,
  waitingForOperand: false,
};
```

Cada propiedad (`display`, `operator`, etc.) se lee y escribe con notación de punto: `calculatorState.display`.

#### Funciones y `return`

Bloque reutilizable con un nombre. `return` devuelve un valor y termina la función. También sirve para salir antes si no hay nada más que hacer:

```javascript
function getDisplayValue() {
  return calculatorState.display;
}

function calculate() {
  if (calculatorState.operator === null) {
    return;  // salida anticipada: no hay operación pendiente
  }
  // ...
}
```

#### `null`

Valor que significa "vacío" o "sin valor asignado". En el estado inicial, `previousValue` y `operator` son `null` porque aún no hay operación en curso.

#### Operador ternario (`? :`)

Forma corta de un `if / else` que devuelve un valor:

```javascript
calculatorState.display === '0' ? digit : calculatorState.display + digit
```

Si la pantalla es `'0'`, se reemplaza por el dígito. Si no, se concatena al final.

#### Igualdad estricta (`===`)

Compara valor y tipo. En el lab se usa para comparar cadenas, números y `null`:

```javascript
calculatorState.display === '0'
calculatorState.operator === null
secondValue === 0
```

No confundir con `==` (igualdad flexible), que puede convertir tipos de forma implícita.

#### Concatenación de cadenas (`+`, `+=`)

El operador `+` une textos. `+=` concatena y asigna en un solo paso:

```javascript
calculatorState.display + digit   // une '12' + '3' -> '123'
calculatorState.display += '.'    // añade un punto al final
```

El estado guarda el número como **texto** (`'42'`, `'3.14'`) hasta que hace falta calcular. Entonces se convierte con `parseFloat()`.

#### `includes()` y `.length`

| Método / propiedad | Función | En el lab |
|---|---|---|
| `.includes('.')` | Indica si una cadena contiene un subtexto | Evitar dos puntos decimales |
| `.length` | Número de caracteres de una cadena | Decidir si el resultado cabe en pantalla |

```javascript
if (!calculatorState.display.includes('.')) { ... }

if (text.length <= 10) { ... }
```

#### Funciones flecha

Sintaxis abreviada para funciones, muy usada en callbacks:

```javascript
keypadElement.addEventListener('click', (event) => {
  // ...
});
```

Equivalente a `function (event) { ... }`. El parámetro `event` es el objeto con datos del clic.

#### Desestructuración

Extrae propiedades de un objeto en variables locales en una sola línea:

```javascript
const { action, value } = button.dataset;
// equivale a:
// const action = button.dataset.action;
// const value = button.dataset.value;
```

#### `String()` y `Number()`

Funciones de conversión entre texto y número:

```javascript
const text = String(value);   // número -> texto (para medir .length)
const inputValue = parseFloat(calculatorState.display);  // texto -> número decimal
Number(value).toPrecision(6)  // número -> texto con precisión fija
```

| Función | Entrada | Salida | Uso en el lab |
|---|---|---|---|
| `String(value)` | número | texto | Contar caracteres del resultado |
| `parseFloat(texto)` | texto numérico | número decimal | Leer lo que hay en pantalla |
| `Number(value)` | valor | número | Preparar el valor para `toPrecision()` |

#### `Number.isFinite()` y `NaN`

`Number.isFinite(value)` devuelve `true` solo si el valor es un número finito (no `NaN`, no `Infinity`).

```javascript
if (!Number.isFinite(value)) {
  return 'Error';
}
```

`NaN` (*Not a Number*) es el resultado de operaciones inválidas, como dividir entre cero:

```javascript
return secondValue === 0 ? NaN : firstValue / secondValue;
```

`formatDisplay()` detecta `NaN` con `isFinite` y muestra `'Error'` en pantalla.

#### `toPrecision()`

Método de números que devuelve una cadena con un número fijo de **cifras significativas**:

```javascript
return Number(value).toPrecision(6);
```

En `formatDisplay()`: si el resultado como texto tiene más de 10 caracteres, se acorta a 6 cifras significativas para que quepa en la pantalla LCD.

| Entrada | `toPrecision(6)` | Notas |
|---|---|---|
| `123456789012` | `'1.23457e+11'` | Puede usar notación científica |
| `3.141592653589` | `'3.14159'` | Redondea a 6 cifras significativas |
| `42` | `'42.0000'` | Rellena con ceros si hace falta |

No confundir con `toFixed(n)`, que fija **decimales** después del punto, no cifras significativas totales.

#### `switch`, `case`, `break` y `default`

Estructura de ramas según un valor. Cada `case` que coincide ejecuta su bloque. `break` evita caer en el siguiente `case`. `default` cubre valores no previstos:

```javascript
switch (action) {
  case 'digit':
    inputDigit(value);
    break;
  case 'equals':
    calculate();
    break;
  default:
    return;
}
```

En `performCalculation()`, el `switch` elige la operación aritmética (`+`, `-`, `*`, `/`).

### DOM (*Document Object Model*)

Representación en memoria del HTML que el navegador construye al cargar la página. JavaScript puede leer y modificar ese árbol.

Ejemplos en el lab:

- Leer: `document.getElementById('display')`
- Modificar: `displayElement.textContent = '42'`
- Escuchar: `keypadElement.addEventListener('click', ...)`

El DOM es el mapa vivo del HTML que JavaScript puede modificar en tiempo de ejecución.

### `document.getElementById()`

Busca un elemento por su `id`:

```javascript
const displayElement = document.getElementById('display');
```

Devuelve el elemento o `null` si no existe.

### `document.querySelector()`

Busca el primer elemento que coincida con un selector CSS:

```javascript
const keypadElement = document.querySelector('.keypad');
```

### `textContent`

Propiedad que lee o escribe el texto visible de un elemento (sin interpretar HTML):

```javascript
displayElement.textContent = getDisplayValue();
```

### Estado (*state*)

Datos que recuerdan en qué situación está la calculadora:

```javascript
const calculatorState = {
  display: '0',
  previousValue: null,
  operator: null,
  waitingForOperand: false,
};
```

La pantalla es la vista. `calculatorState` es la fuente de verdad. Al cambiar el estado, `updateDisplay()` refleja el cambio en el DOM.

### `const` y objetos mutables

`const` impide **reasignar** la variable, no congela el contenido interno de un objeto.

```javascript
const calculatorState = {
  display: '0',
  previousValue: null,
  operator: null,
  waitingForOperand: false,
};

calculatorState.display = '7';  // permitido: cambia una propiedad del objeto
calculatorState = { display: '0' };  // error: no se puede reasignar la variable
```

| Acción | Permitido con `const` | Ejemplo |
|---|---|---|
| Cambiar una propiedad del objeto | Sí | `calculatorState.display = '7'` |
| Reasignar la variable a otro valor | No | `calculatorState = { ... }` |

`const` fija la **referencia** (la variable apunta siempre al mismo objeto). Las **propiedades** de ese objeto pueden cambiar. En la calculadora, el objeto `calculatorState` es el mismo de principio a fin. Lo que varía son sus campos (`display`, `operator`, etc.).

Para bloquear también los cambios internos haría falta `Object.freeze(calculatorState)`. Este lab no lo usa, porque el estado debe actualizarse en cada pulsación de tecla.

### Evento y `addEventListener`

Un evento es algo que ocurre en la página (clic, tecla, carga, etc.).

`addEventListener('click', handler)` registra una función que se ejecuta cuando el usuario hace clic.

### Delegación de eventos

En lugar de un listener por botón, hay uno solo en el contenedor `.keypad`:

```javascript
keypadElement.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  // ...
});
```

Ventajas:

- Menos código.
- Funciona aunque el teclado sea `<table>` o `<div>`.
- Si se añaden botones, el mismo listener los cubre.

### `event.target` y `closest()`

| Concepto | Significado |
|---|---|
| `event.target` | Elemento exacto donde ocurrió el clic (a veces el texto dentro del botón) |
| `closest('button')` | Sube en el DOM hasta encontrar el `<button>` ancestro más cercano |

Útil cuando el clic cae sobre el carácter `7` dentro del botón y no sobre el borde del botón.

### `dataset`

Acceso a atributos `data-*` del HTML:

```javascript
const { action, value } = button.dataset;
// data-action="digit"  ->  action === 'digit'
// data-value="7"       ->  value === '7'
```

### `switch`

Ver **switch, case, break y default** en Fundamentos del lenguaje JavaScript. Se usa en `app.js` (acción del botón) y en `performCalculation()` (operador aritmético).

### `parseFloat()`

Ver **String() y Number()** en Fundamentos del lenguaje JavaScript. Convierte el texto de la pantalla en número antes de calcular:

```javascript
const inputValue = parseFloat(calculatorState.display);
```

### `eval()` (qué es y por qué no se usa aquí)

`eval()` ejecuta una cadena de texto como código JavaScript.

```javascript
eval('8 + 2')  // funciona, pero no se usa en este lab
```

En este ejercicio se evita porque:

1. El objetivo es practicar lógica explícita (`switch`, estado, funciones).
2. `eval()` no modela bien AC, CE, `%` ni operaciones encadenadas.
3. En aplicaciones reales puede ser inseguro si la cadena proviene del usuario.

### Separación `calculator.js` / `app.js`

| Archivo | Responsabilidad | Toca el DOM |
|---|---|---|
| `calculator.js` | Matemáticas y estado | No |
| `app.js` | Selectores, eventos, actualizar pantalla | Sí |

Flujo de una pulsación:

```
Clic en tecla -> app.js (¿qué botón?) -> calculator.js (actualiza estado) -> app.js (muestra el nuevo valor)
```

#### Relación con MVC

La separación de archivos **se parece** al patrón arquitectónico MVC (Modelo-Vista-Controlador), pero **no es MVC completo**. Aplica el mismo principio: no mezclar datos y reglas de negocio con la interfaz.

| Rol MVC | En este lab | Función |
|---|---|---|
| Modelo | `calculator.js` | Estado (`calculatorState`) y reglas de cálculo |
| Vista | HTML + CSS (`index-table.html`, `calculator-base.css`) | Estructura y apariencia |
| Controlador | `app.js` | Lee clics, llama al modelo, actualiza la pantalla |

En términos de MVC, el flujo sería: entrada del usuario -> controlador -> modelo -> vista.

**Dónde difiere de MVC estricto:**

1. **Sin sincronización automática.** En MVC clásico la vista suele observar al modelo. Aquí `app.js` debe llamar `updateDisplay()` manualmente tras cada acción. Si se omite, el estado cambia pero la pantalla no.
2. **Controlador y vista mezclados en `app.js`.** Además de enrutar eventos, `app.js` escribe directamente en el DOM (`displayElement.textContent`).
3. **HTML estático.** La cuadrícula de botones está fija en el marcado. Solo cambia el texto de la pantalla. Una vista MVC típica renderiza más datos desde el modelo.
4. **Escala reducida.** MVC es un patrón arquitectónico para organizar aplicaciones completas (p. ej. Laravel, Django MTV). Este lab aplica separación de responsabilidades a nivel de archivos.

| Término | ¿Aplica a este lab? |
|---|---|
| MVC completo | No |
| Separación inspirada en MVC | Sí |
| Separación de responsabilidades | Sí (término más preciso) |

En la práctica, `calculator.js` concentra el "qué debe ocurrir". `app.js` concentra el "cómo reacciona la página". Es un paso previo al pensamiento MVC que se verá en frameworks backend, sin implementar el patrón al pie de la letra.

---

## Herramientas

### DevTools (F12)

Herramientas de desarrollo del navegador. Pestañas útiles en este lab:

| Pestaña | Uso |
|---|---|
| Elements | Inspeccionar HTML y CSS aplicado |
| Console | Ver errores de JavaScript |

### Consola

Muestra errores (por ejemplo, si `app.js` no encuentra `#display` porque el script está en el `<head>`).

---

## Ver también

- [01-calculadora-javascript.md](01-calculadora-javascript.md)
- [02-comparacion-layouts-calculadora.md](02-comparacion-layouts-calculadora.md)
- Referencia de arquitectura (MVC como patrón): [referencia-conceptos-arquitectura-v5-slides.md](../01.%20W1%20-%20Introducción/referencia-conceptos-arquitectura-v5-slides.md)
- [MDN - DOM](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model)
- [MDN - CSS values and units](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Styling_basics/Values_and_units)
- [MDN - link](https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/link)
