const main = document.getElementById('main');
var countries = ['England', 'Scotland', 'Wales', 'Northern Ireland', 'Japan'];
const countryFilters = document.getElementById('country-filters');
filterImgs();

// Generate the country filters
countries.forEach(country => {
    let div = document.createElement('div');
    div.innerHTML = country;
    div.className = 'country-filter';
    div.onclick = function() {
        div.classList.toggle('country-filter-clicked');
        let filters = document.getElementsByClassName('country-filter');
        filters.forEach(filter => {
            if (filter != div){
                filter.classList.remove('country-filter-clicked');
            }
        });
        if (div.classList.contains('country-filter-clicked')) {
            filterImgs(country);
        } else {
            filterImgs();
        }
    };
    countryFilters.appendChild(div);
});

function filterImgs(country) {
    console.log(country);
    let imgs = document.getElementsByClassName('img-container');
    if (!country) {
        // Display all images
        
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.display = 'block';
        }
    } else {
        for (let i = 0; i < imgs.length; i++) {
            let hiddenCountry = imgs[i].getElementsByClassName('hidden-country')[0];
            if (hiddenCountry && hiddenCountry.innerHTML === country) {
                imgs[i].style.display = 'block';
            } else {
                imgs[i].style.display = 'none';
            }
        }
    }
}

function getCountryFromCode(countryCode) {
    if (countryCode === 'GB-ENG') { return 'England'; }
    else if (countryCode === 'GB-SCT') { return 'Scotland'; }
    else if (countryCode === 'GB-CYM') { return 'Wales'; }
    else if (countryCode === 'GB-NIR') { return 'Northern Ireland'; }
    else if (countryCode === 'JP') { return 'Japan'; }
}

fetch('media/artworks.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            let div = document.createElement('div');
            let img = document.createElement('img');
            let hiddenDiv = document.createElement('div');
            hiddenDiv.className = 'hidden-country';
            hiddenDiv.innerHTML = getCountryFromCode(element.country);
            img.src = `media/images/${element.slug}.jpg`;
            img.onerror = function() {
                this.onerror = null;
                this.src = `media/images/${element.slug}.png`;
            };
            img.alt = element.title;
            div.appendChild(img);
            div.appendChild(hiddenDiv);
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

    window.history.pushState({}, '', `?img=${element.slug}`);
};

function modalClose() {
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
    window.history.pushState({}, '', window.location.pathname);
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const imgSlug = urlParams.get('img');

    if (imgSlug) {
        fetch('media/artworks.json')
        .then(response => response.json())
        .then(data => {
            const element = data.find(element => element.slug === imgSlug);
            if (element) {
                const img = new Image();
                img.src = `media/images/${element.slug}.jpg`;

                img.onerror = function() {
                    this.onerror = null;
                    this.src = `media/images/${element.slug}.png`;
                    this.onload = function() {
                        openModal(element, this.src);
                    };
                };

                img.onload = function() {
                    openModal(element, this.src);
                };
            }
        })
        .catch(error => console.error(error));
    }
};