const gallery = document.getElementById('gallery');
console.log(gallery);

async function afficherProjets() {
    var reponse = await fetch('http://localhost:5678/api/works');
    var works = await reponse.json();
    console.log(works);

    works.forEach(element => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.setAttribute('src', element.imageUrl);
        image.setAttribute('alt', element.title);
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = element.title;

        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);

    });

};

afficherProjets();

const tousButton = document.getElementById('tousButton');

tousButton.addEventListener("click", async function() {
    objetsButton.classList.remove('selectedButton'),
    appartementsButton.classList.remove('selectedButton'),
    hotelsEtRestaurantsButton.classList.remove('selectedButton'),
    tousButton.classList.add('selectedButton'),
    gallery.innerHTML = '';
    afficherProjets();
    
});


const objetsButton = document.getElementById('objetsButton');

objetsButton.addEventListener('click', async function () {
    var reponse = await fetch('http://localhost:5678/api/works');
    var works = await reponse.json();
    console.log(works);

    const getObjets = works.filter(projet => projet.categoryId === 1);

    tousButton.classList.remove('selectedButton'),
    appartementsButton.classList.remove('selectedButton'),
    hotelsEtRestaurantsButton.classList.remove('selectedButton'),
    objetsButton.classList.add('selectedButton'),

    gallery.innerHTML = '';
    getObjets.forEach(element => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.setAttribute('src', element.imageUrl);
        image.setAttribute('alt', element.title);
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = element.title;

        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);

    });

});

async function afficherAppartements() {
    var reponse = await fetch('http://localhost:5678/api/works');
    var works = await reponse.json();
    console.log(works);

    objetsButton.classList.remove('selectedButton'),
    tousButton.classList.remove('selectedButton'),
    hotelsEtRestaurantsButton.classList.remove('selectedButton'),
    appartementsButton.classList.add('selectedButton'),

    gallery.innerHTML = ''; 
    var getAppartements = works.filter(projet => projet.categoryId === 2);
    console.log(getAppartements);
    
    getAppartements.forEach(element => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.setAttribute('src', element.imageUrl);
        image.setAttribute('alt', element.title);
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = element.title;

        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);

    });
};
const appartementsButton = document.getElementById('appartementsButton');
appartementsButton.addEventListener('click', afficherAppartements);

async function afficherHotelsEtRestaurants() {
    var reponse = await fetch('http://localhost:5678/api/works');
    var works = await reponse.json();
    console.log(works);

    objetsButton.classList.remove('selectedButton'),
    appartementsButton.classList.remove('selectedButton'),
    tousButton.classList.remove('selectedButton'),
    hotelsEtRestaurantsButton.classList.add('selectedButton'),

    gallery.innerHTML = ''; 
    const getHotelsEtRestaurants = works.filter(projet => projet.categoryId === 3);
    
    getHotelsEtRestaurants.forEach(element => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.setAttribute('src', element.imageUrl);
        image.setAttribute('alt', element.title);
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = element.title;

        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);

    });

}
const hotelsEtRestaurantsButton = document.getElementById('hotelsAndRestaurantsButton');
hotelsEtRestaurantsButton.addEventListener('click', afficherHotelsEtRestaurants);

