import { displayAllWorks } from "./project.mjs";

//                                      modal                                                //
async function displayModal() {
    let modal = null

    const token = localStorage.getItem('token');

    const openModal = async function (e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        console.log(target)
        target.style.display = 'flex';
        target.removeAttribute('aria-hidden');
        target.setAttribute('aria-modal', 'true');
        modal = target
        modal.addEventListener('click', closeModal);
        modal.querySelector('#modalClose').addEventListener('click', closeModal);
        modal.querySelector('.modalStop').addEventListener('click', stopPropagation);
        document.querySelector('.modalPage1').style.display = 'block';
        displayModalPhotoGallery()
    }

    const closeModal = function (e) {
        if (modal == null) return
        e.preventDefault();
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        modal.removeEventListener('click', closeModal);
        modal.querySelector('#modalClose').removeEventListener('click', closeModal);
        modal.querySelector('.modalStop').removeEventListener('click', stopPropagation);
        modal == null
        modalPhotoGallery.innerHTML = '';
    }

    const stopPropagation = function (e){
        e.stopPropagation();
    }

    document.querySelectorAll('#projectEditButton').forEach(a =>{
        a.addEventListener('click', openModal);
    })

    //                                 modal page 1                                        //

    const modalPhotoGallery = document.querySelector('.photoGallery');
    const photoGalleryPage = document.getElementById('photoGalleryPage');

    async function displayModalPhotoGallery(){
        var reponse = await fetch('http://localhost:5678/api/works');
        var works = await reponse.json();
        addPicturePage.style.display = 'none';
        // console.log(works);

        works.forEach(element => {
            const figure = document.createElement('figure');
            figure.classList.add('modalFigure');

            const photoIcons = document.createElement('div');
            photoIcons.classList.add('photoIcons');

            const faArrows = document.createElement('i');
            faArrows.classList.add('fa-solid', 'fa-arrows-up-down-left-right', 'fa-arrows');
            
            // delete work
            const faDelete = document.createElement('i');
            faDelete.classList.add('fa-solid', 'fa-trash-can');
            const workId = faDelete.dataset.workId = element.id;
            
            faDelete.addEventListener('click', async function(event) {
                var retour = await fetch('http://localhost:5678/api/works/' + workId, {
                method: 'DELETE',
                body: null,
                headers: {
                "Authorization": `Bearer ${token}`,
            },
            })
            console.log(retour);
            // var work = await reponse.json();
            // console.log(work);
            modalPhotoGallery.innerHTML = '';
            displayModalPhotoGallery();
            document.getElementById('gallery').innerHTML = '';
            displayAllWorks();

            });

            const figurePhoto = document.createElement('div');
            figurePhoto.classList.add('figurePhoto');

            const image = document.createElement('img');
            image.setAttribute('src', element.imageUrl);
            image.setAttribute('alt', element.title);

            const edit = document.createElement('a');
            edit.innerHTML = 'éditer';

            modalPhotoGallery.appendChild(figure);
            figure.appendChild(photoIcons);
            figure.appendChild(figurePhoto);
            figure.appendChild(edit);
            photoIcons.appendChild(faArrows);
            photoIcons.appendChild(faDelete);
            figurePhoto.appendChild(image);
        });
    }

    const addPictureButton = document.getElementById('addPictureButton');

    function displayAddPicturePage(){
        photoGalleryPage.style.display = 'none';
        addPicturePage.style.display = 'block';
    }

    addPictureButton.addEventListener('click', displayAddPicturePage);

    const deleteAllWorks = document.getElementById('deleteAllWorks');
    deleteAllWorks.addEventListener('click', async function(event) {
        var reponse = await fetch('http://localhost:5678/api/works');
        var works = await reponse.json();

        works.forEach(async element => {
            var reponse = await fetch('http://localhost:5678/api/works/' + element.id, {
                    method: 'DELETE',
                    body: null,
                    headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            var works = await reponse.json();
            console.log(works);       
    });
        modalPhotoGallery.innerHTML = '';
        displayModalPhotoGallery(); 
    });

    //                                 modal page 2                                        //

    const previousPage = document.getElementById('previousPage');
    const addPicturePage = document.getElementById('addPicturePage');

    function previousModalPage(){
        addPicturePage.style.display = 'none';
        photoGalleryPage.style.display = 'block';
        modalPhotoGallery.innerHTML = '';
        displayModalPhotoGallery();
    }

    previousPage.addEventListener('click', previousModalPage);


    function previewImage() {
        var file = document.getElementById('file').files;
        console.log(file);

        if (file.length > 0) {
            var fileReader = new FileReader();

            fileReader.onload = function (e) {
                document.getElementById('preview').setAttribute('src', e.target.result);
            };

            fileReader.readAsDataURL(file[0]);
            document.getElementById('invisibleOnchange').style.display = 'none';
            document.getElementById('visibleOnchange').style.display = 'block';
        }

        else {
            document.getElementById('invisibleOnchange').style.display = 'block';
            document.getElementById('visibleOnchange').style.display = 'none';
        }
    }

    document.getElementById('file').addEventListener('change', previewImage);

    function fileReset(){

        const file = document.getElementById('file');
        var files = file.files;
        console.log(files);
        
        const postNewWorkForm = document.getElementById('postNewWork');
        const resetForm = document.createElement('form');
        resetForm.appendChild(file);
        resetForm.reset();
        console.log(files);
        
        postNewWorkForm.appendChild(file);
        resetForm.remove();

        document.getElementById('invisibleOnchange').style.display = 'block';
        document.getElementById('visibleOnchange').style.display = 'none';
        
    }

    document.getElementById('fileReset').addEventListener('click', fileReset)

    async function NewWorkCategorySelection() {
        var reponse = await fetch('http://localhost:5678/api/categories');
        var categories = await reponse.json();

        categories.forEach(element => {
            const createOption = document.createElement('option');
            createOption.setAttribute('value', element.name);
            createOption.innerText = element.name;
            document.getElementById('categorySelection').appendChild(createOption);
        })
    }

    NewWorkCategorySelection();

    async function addNewWork() {
        var reponse = await fetch('http://localhost:5678/api/works');
        var works = await reponse.json();
        const newWorkFormSubmit = document.getElementById('submitWorkButton');
        const imageInput = document.getElementById('file');
        const titleInput = document.getElementById('newWorkTitle');

        newWorkFormSubmit.addEventListener('submit', function (event) {
        event.preventDefault();

        // if (!titleInput.value || !imageInput.files.length <= 0){
        //     preventDefault();
        //     newWorkFormSubmit.style.backgroundColor = '#A7A7A7';
        // }

        // else {
        //     newWorkFormSubmit.style.backgroundColor = '#1D6154';
        // }
        
        const newWork = {
            category: event.target.querySelector('[name=category]').id,
            imageUrl: event.target.querySelector('[name=file]').files[0],
            title: event.target.querySelector('[name=title]').value,
        }
        const chargeUtile = JSON.stringify(newWork);
        console.log(newWork);

        fetch('http://localhost:5678/api/works'),{
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},

            body: chargeUtile,
        }

    })
    }

    addNewWork();

    function test() {
        const titleNewWork = document.getElementById('newWorkTitle');
        console.log(!!titleNewWork)
    }

    test();

    // console.log(document.forms);
    // document.forms['postNewWork'].addEventListener('submit', function (e) {
        
    //     console.log(this['submitWorkButton']);
    //     e.preventDefault();
    // });

    // document.getElementById('postNewWork').addEventListener('submit', function(e) {

    //     var inputs = this.getElementsByTagName('input');
        

    //     var erreur = document.getElementById('erreur');

    //     for (var i = 0; i < inputs.lenght; i++) {
    //         console.log(inputs[i]);
    //         if (!inputs[i].value) {
    //             erreur.innerHTML = 'error';
    //             erreur.style.color = 'red';
    //         }
    //     }

    //     if (erreur) {
    //         e.preventDefault();
    //         erreur.innerHTML = erreur;
    //         return false;
    //     } else {
    //         alert('formulaire envoyé');
    //     }
    // })
    // console.log(inputs);
}

export {displayModal};