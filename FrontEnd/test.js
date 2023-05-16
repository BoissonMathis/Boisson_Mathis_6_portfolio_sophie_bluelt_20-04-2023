// async function changerImage() {
// var reponse = await fetch('http://localhost:5678/api/works')
// var works = await reponse.json()
// // var image = getImage.json()
// // JSON.parse(image)
// console.log(works);

// // document.querySelector('#images').src = image.url
// }

// changerImage();

// pour chaque objet dans works
// creer une balise figure
// rattacher la balise figure a <div class="gallery">
// creer une balise img
// creer une balise figcaption
// rattacher les deux a la balise figure
// mettre le src dun objet works a la balise img
// complter la balise figcaption avec le titre du meme objet

// tout afficher

// const gallery = document.getElementsByClassName('.gallery')
// console.log(gallery)
const gallery = document.getElementById('gallery');
console.log(gallery);

let count = 0;

async function afficherProjets() {
    var reponse = await fetch('http://localhost:5678/api/works');
    var works = await reponse.json();
    console.log(works);

    const getImage = works.map(works => works.imageUrl);
    const getTitle = works.map(works => works.title);
    const getIdProjet = works.map(works => works.id);
    console.log(getImage);
    console.log(getTitle);
    console.log(getIdProjet);


    works.forEach(element => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.setAttribute('src', element.imageUrl);
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = element.title;

        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);

    });

    
    
};

afficherProjets();


// afficherProjets();

// const projet = document.createDocumentFragment();
// const li = fragment
//   .appendChild(document.createElement("section"))
//   .appendChild(document.createElement("ul"))
//   .appendChild(document.createElement("li"));
// li.textContent = "hello world";

// document.body.appendChild(fragment);



// const works = ["Firefox", "Chrome", "Opera", "Safari"];
// console.log(works);
// const gallery = document.getElementsByClassName('gallery'); // assuming ul exists
// const projet = document.createDocumentFragment();


// works.forEach((works) => {
//   const figure = document.createElement("figure");
//   const image = document.createElement('img')
//   const title = document.createElement('figcaption')
//   figure.appendChild(image)
//   figure.appendChild(title)
  
//   projet.appendChild(figure);
// });

// gallery.appendChild(projet);
