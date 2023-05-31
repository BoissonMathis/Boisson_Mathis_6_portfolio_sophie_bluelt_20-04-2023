const logAndDelog = document.querySelector('.logAndDelog');
const editButtons = document.querySelectorAll('#articleEditButton, #editionModeEditButton, #projectEditButton, #figureEditButton')
const editionMode = document.querySelector('#editionMode')

async function userConnected(){

    if (localStorage.hasOwnProperty('token') == true){

        editButtons.forEach(element => {
            element.style.display = 'flex';
        });

        editionMode.style.display = 'flex';
        logAndDelog.innerHTML = '<li>delog</li>';
        logAndDelog.addEventListener('click', deleteToken)

    } else if (localStorage.hasOwnProperty('token') == false){

        editButtons.forEach(element => {
            element.style.display = 'none';
        });

        editionMode.style.display = 'none';
    }

    return
}

export {userConnected};

function deleteToken (){
    localStorage.removeItem('token');
}

console.log(localStorage.hasOwnProperty('token'));