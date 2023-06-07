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
        document.getElementById('addPicturePage').style.display = 'none';
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
        // addPicturePage.style.display = 'none';
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
    const error = document.getElementById('formError');



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


    document.getElementById('file').addEventListener('change', async function fileMaxlenght() {
        const file = document.getElementById('file').files[0];
        const fileSize = file.size;
        console.log(fileSize);

        if(fileSize >= 4194304){
            fileReset();
            error.style.display = 'block';
            error.innerHTML = 'Le fichier selectionné est trop volumineux';
        }
    })


    async function NewWorkCategorySelection() {
        var reponse = await fetch('http://localhost:5678/api/categories');
        var categories = await reponse.json();

        categories.forEach(element => {
            const createOption = document.createElement('option');
            createOption.setAttribute('value', element.name);
            createOption.setAttribute('id', element.id)
            createOption.innerText = element.name;
            document.getElementById('categorySelection').appendChild(createOption);
        })
    }

    NewWorkCategorySelection();

    
    const newWorkFormSubmit = document.getElementById('submitWorkButton');

    async function allowSubmitNewWorkForm () {
        var newFile = Boolean(document.getElementById('file').value === '');
        var newWorkTitle = Boolean(document.getElementById('newWorkTitle').value === '');
        error.innerHTML = '';

        if ((newFile == false) && (newWorkTitle == false)){

            newWorkFormSubmit.style.backgroundColor = '#1D6154';

        }else {

            newWorkFormSubmit.style.backgroundColor = '#A7A7A7';
        }
    }
    

    document.getElementById('file').addEventListener('change', allowSubmitNewWorkForm);
    document.getElementById('newWorkTitle').addEventListener('change', allowSubmitNewWorkForm);


    document.getElementById('submitWorkButton').addEventListener('click', async function submitNewWorkForm (e){
        e.preventDefault();

        var newFile = Boolean(document.getElementById('file').value === '');
        var newWorkTitle = Boolean(document.getElementById('newWorkTitle').value === '');
        console.log(newFile, newWorkTitle);

        if ((newFile == false) && (newWorkTitle == false)){

            newWorkFormSubmit.style.backgroundColor = '#1D6154';
            postNewWork();
        }if (newFile == true){
            error.innerHTML = 'Veuillez ajouter une image';
            e.preventDefault();

        }if (newWorkTitle == true){
            error.innerHTML = 'Veuillez renseigner un titre';

        }if ((newFile == true) && (newWorkTitle == true)){

            error.innerHTML = 'Veuillez renseigner tout les champs';
        }
    });

    const gallery = document.getElementById('gallery');

    async function postNewWork(event){
        
        var file = document.getElementById('file').files[0];
        var title = document.getElementById('newWorkTitle').value;
        var optionSelected = document.getElementById('categorySelection').selectedIndex;
        console.log(optionSelected);
        var category = document.getElementById('categorySelection').options[optionSelected].id;
        
        let formData = new FormData();
        
        formData.append('image',file);
        formData.append('title',title);
        formData.append('category',category);   

        let response = await fetch('http://localhost:5678/api/works',{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },  
            body: formData,
        });
        console.log(response);

        
        gallery.innerHTML = '';
        displayAllWorks();

        modalPhotoGallery.innerHTML = '';
        displayModalPhotoGallery();

        fileReset();

        error.innerHTML = 'Projet ajoutée à la gallery';
        document.getElementById('newWorkTitle').value = '';
        newWorkFormSubmit.style.backgroundColor = '#A7A7A7';
    };
}



export {displayModal};