//Put your code here

const redSlider = document.getElementById('red');
const greenSlider = document.getElementById('green');
const blueSlider = document.getElementById('blue');
const color = document.getElementById('color');

redSlider.oninput = function() {
    changeColor();
}
greenSlider.oninput = function() {
    changeColor();
}
blueSlider.oninput = function() {
    changeColor();
}

function changeColor() {
    let redHex = parseInt(redSlider.value).toString(16).padStart(2, '0');
    let greenHex = parseInt(greenSlider.value).toString(16).padStart(2, '0');
    let blueHex = parseInt(blueSlider.value).toString(16).padStart(2, '0');
    
    let newColor = `#${redHex}${greenHex}${blueHex}`;
    console.log(newColor);
    color.style.backgroundColor = newColor;
}