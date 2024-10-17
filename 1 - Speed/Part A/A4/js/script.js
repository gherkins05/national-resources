//Put your code here
const smiley = document.getElementById('smiley');
function happy() {
    smiley.classList.add('happy');
    smiley.classList.remove('sad');
    smiley.classList.remove('angry');

    smiley.innerHTML = ':)';
}
function middle() {
    smiley.classList.add('middle');
    smiley.classList.remove('sad');
    smiley.classList.remove('happy');

    smiley.innerHTML = ':|';
}
function sad() {
    smiley.classList.add('sad');
    smiley.classList.remove('happy');
    smiley.classList.remove('middle');

    smiley.innerHTML = ':(';
}