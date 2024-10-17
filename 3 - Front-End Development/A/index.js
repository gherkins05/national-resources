const main = document.getElementById('main');

fetch('media/artworks.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            let div = document.createElement('div');
            let img = document.createElement('img');
            img.src = `media/images/${element.slug}.jpg`;
            img.onerror = function() {
                this.onerror = null;
                this.src = `media/images/${element.slug}.png`;
            };
            img.alt = element.title;
            div.appendChild(img);
            div.className = 'img-container';
            div.onclick = function() {
                openModal(element, img.src);
            };
            main.appendChild(div);
        });
    })
    .catch(error => console.error(error));

const openModal = (element, imgSrc) => {
    let modal = document.getElementById('modal');
    modal.style.display = 'flex';

    let modalTitle = document.getElementById('modal-title');
    let modalDescription = document.getElementById('modal-description');
    let modalCountry = document.getElementById('modal-country');
    let modalImg = document.getElementById('modal-img');

    modalTitle.textContent = element.title;
    modalDescription.textContent = element.description;

    let country = "";
    if (element.country === 'GB-ENG') { country = "England"; }
    else if (element.country === 'GB-SCT') { country = "Scotland"; }
    else if (element.country === 'GB-CYM') { country = "Wales"; }
    else if (element.country === 'GB-NIR') { country = "Northern Ireland"; }
    else if (element.country === 'JP') { country = "Japan"; }
    modalCountry.textContent = country;

    modalImg.src = imgSrc;
};

function modalClose() {
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
}
