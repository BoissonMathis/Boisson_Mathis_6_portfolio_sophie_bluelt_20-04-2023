const gallery = document.getElementById('gallery');
console.log(gallery);

async function displayAllWorks() {
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

displayAllWorks();

const sortButtons = document.getElementById('sortButtons');
const tousButton = document.getElementById('Button0');

async function displayFilters(){
    var reponse = await fetch('http://localhost:5678/api/categories');
    var categories = await reponse.json();
    console.log(categories);
    var reponse2 = await fetch('http://localhost:5678/api/works');
    var works = await reponse2.json();
    let allButtons = [document.getElementById('button0')];
    console.log(allButtons);

    categories.forEach(element => {
        const createButton = document.createElement('button');
        createButton.innerText = element.name;
        createButton.classList.add('sortButton');
        createButton.setAttribute('type', 'button');
        // createButton.setAttribute('id', 'button' + element.id);
        createButton.dataset.categoryId = element.id;
        sortButtons.appendChild(createButton);
        allButtons.push(createButton);
    })

    allButtons.forEach(button => {
        button.addEventListener("click", async function() {
            allButtons.forEach(button => {button.classList.remove('selectedButton');})
            button.classList.add('selectedButton');

            gallery.innerHTML = '';
            
            if (button.dataset.categoryId == 0){
                displayAllWorks();
            }
            else {
                let visibleWorks = works.filter(work => work.categoryId == button.dataset.categoryId);
                // let visibleWorks = works.filter((work) => { return work.id == button.dataset.categoryId });
                // let visibleWorks = works.filter(function (work){
                //     return work.id == button.dataset.categoryId
                // });
                visibleWorks.forEach(work => gallery.appendChild(getWorkHtmlElement(work)));
            }
        }
    )}
    )
};

function getWorkHtmlElement(work){
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.setAttribute('src', work.imageUrl);
    image.setAttribute('alt', work.title);
    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = work.title;

    figure.appendChild(image);
    figure.appendChild(figcaption);
    return figure;
}

displayFilters();