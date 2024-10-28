//Put your code here

const blurOverLay = document.getElementById('customSlider');
const blurSlider = document.getElementById('sliderSelector');
const maxWidth = document.getElementById('img').width;

blurSlider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startWidth = parseInt(document.defaultView.getComputedStyle(blurOverLay).width, 10);
    document.documentElement.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const newWidth = startWidth + dx;
    blurOverLay.style.width = `${Math.min(newWidth, maxWidth)}px`;
}

function onMouseUp() {
    isDragging = false;
    document.documentElement.removeEventListener('mousemove', onMouseMove);
    document.documentElement.removeEventListener('mouseup', onMouseUp);
}