const resultCube = document.getElementById("resultCube");
const elements = {
  font: [
    { select: 'selectFontFamily', code: 'codeFontFamily', property: 'fontFamily' },
    { select: 'selectFontSize', code: 'codeFontSize', property: 'fontSize' },
    { select: 'selectFontWeight', code: 'codeFontWeight', property: 'fontWeight' },
    { select: 'selectColor', code: 'codeColor', property: 'color' }
  ],
  border: [
    { select: 'selectBorderWidth', code: 'codeBorderWidth', property: 'borderWidth' },
    { select: 'selectBorderStyle', code: 'codeBorderStyle', property: 'borderStyle' },
    { select: 'selectBorderColor', code: 'codeBorderColor', property: 'borderColor' },
    { select: 'selectBorderRadiusTL', code: 'codeBorderRadiusTL', property: 'borderTopLeftRadius' },
    { select: 'selectBorderRadiusTR', code: 'codeBorderRadiusTR', property: 'borderTopRightRadius' },
    { select: 'selectBorderRadiusBR', code: 'codeBorderRadiusBR', property: 'borderBottomRightRadius' },
    { select: 'selectBorderRadiusBL', code: 'codeBorderRadiusBL', property: 'borderBottomLeftRadius' }
  ]
};


function updateCodeValue(element, codeElement) {
  codeElement.innerText = getComputedStyle(resultCube)[element.property];
};

function addEventListenerToElement(element) {
  const selectElement = document.getElementById(element.select);
  const codeElement = document.getElementById(element.code);

  const property = element.property;
  let prefix = "";
  if (
    property === "fontSize" || property === "borderWidth" ||
    property === "borderTopLeftRadius" || property === "borderTopRightRadius" ||
    property === "borderBottomRightRadius" || property === "borderBottomLeftRadius"
  ) {
    prefix = "px";
  };

  selectElement.value = prefix === 'px' ? parseFloat(getComputedStyle(resultCube)[property]) : getComputedStyle(resultCube)[property];
  codeElement.innerText = getComputedStyle(resultCube)[property];

  selectElement.addEventListener("input", () => {
    resultCube.style[property] = selectElement.value + prefix;
    updateCodeValue(element, codeElement);
  });
};

for (const type of Object.values(elements)) {
  for (const element of type) {
    addEventListenerToElement(element);
  };
};


// Background Color
const backgroundColors = [
  { select: 'selectRGBRed', code: 'codeRGBRed', property: 'backgroundColor' },
  { select: 'selectRGBGreen', code: 'codeRGBGreen', property: 'backgroundColor' },
  { select: 'selectRGBBlue', code: 'codeRGBBlue', property: 'backgroundColor' },
  { select: 'selectRGBOpacity', code: 'codeRGBOpacity', property: 'opacity' }
];

function updateCodeAndBackgroundColor() {
  const red = document.getElementById(backgroundColors[0].select).value;
  const green = document.getElementById(backgroundColors[1].select).value;
  const blue = document.getElementById(backgroundColors[2].select).value;
  const opacity = document.getElementById(backgroundColors[3].select).value;

  resultCube.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;

  document.getElementById(backgroundColors[0].code).innerText = red;
  document.getElementById(backgroundColors[1].code).innerText = green;
  document.getElementById(backgroundColors[2].code).innerText = blue;
  document.getElementById(backgroundColors[3].code).innerText = opacity;
};

for (const element of backgroundColors) {
  document.getElementById(element.select).addEventListener('input', updateCodeAndBackgroundColor);
};


// Gradient
const gradient = [
  { select: 'selectGradientStart', code: 'codeGradientStart', property: 'background' },
  { select: 'selectGradientEnd', code: 'codeGradientEnd', property: 'background' }
];

function updateCodeAndBackgroundGradient() {
  const startColor = document.getElementById(gradient[0].select).value;
  const endColor = document.getElementById(gradient[1].select).value;

  resultCube.style.background = `linear-gradient(#${startColor}, #${endColor})`;

  if (startColor === '' || endColor === '') {
    resultCube.style.removeProperty('background');
  };

  document.getElementById(gradient[0].code).innerText = '#' + startColor;
  document.getElementById(gradient[1].code).innerText = '#' + endColor;
};

for (const element of gradient) {
  document.getElementById(element.select).addEventListener('input', updateCodeAndBackgroundGradient);
};

// start - b55d1d
// end - b3c1f3


// Position
const codePositionTransform = document.getElementById('codePositionTransform');
const positionClasses = ['center', 'top-left', 'top-right', 'bottom-right', 'bottom-left'];

const positionInputs = [
  { select: 'selectPositionCenter', code: 'codePositionTransform', class: 'center' },
  { select: 'selectPositionTLC', code: '', class: 'top-left', y: 'top: 0', x: 'left: 0' },
  { select: 'selectPositionTRC', code: '', class: 'top-right', y: 'top: 0', x: 'right: 0' },
  { select: 'selectPositionBRC', code: '', class: 'bottom-right', y: 'bottom: 0', x: 'right: 0' },
  { select: 'selectPositionBLC', code: '', class: 'bottom-left', y: 'bottom: 0', x: 'left: 0' }
];

function updateCubePosition() {
  for (const positionInput of positionInputs) {
    const { select, code, class: className, y, x } = positionInput;
    const element = document.getElementById(select);

    if (element.checked) {
      for (const myClass of positionClasses) {
        resultCube.classList.remove(myClass);
      };

      resultCube.classList.add(className);

      if (code !== '') {
        exampleCodeList.appendChild(codePositionTransform);
      } else {
        codePositionY.innerText = y;
        codePositionX.innerText = x;
        codePositionTransform.remove();
      };
    };
  };
};

for (const positionInput of positionInputs) {
  document.getElementById(positionInput.select).addEventListener('input', updateCubePosition);
};


// Copy btn & Code section
const btnCopy = document.getElementById("btnCopy");
const exampleCodeList = document.getElementById("exampleCodeList");

btnCopy.addEventListener("click", () => {
  navigator.clipboard.writeText(exampleCodeList.innerText);
});