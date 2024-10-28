//Put your code here

const cards = document.querySelectorAll('.card');

var i = 0;
setInterval(() => {
    revealCard(i);
    if (i < cards.length - 1) {
        i++;
    }
}, 500);

function revealCard(i) {
    cards[i].style.transform = 'rotateX(180deg)';
}