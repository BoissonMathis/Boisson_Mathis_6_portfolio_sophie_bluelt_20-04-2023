async function userConnected(){
    if (localStorage.hasOwnProperty('token') == true){
        document.querySelector('#articleEditButton').style.display = 'flex';
        document.querySelector('#editionModeEditButton').style.display = 'flex';
        document.querySelector('#projectEditButton').style.display = 'flex';
        document.querySelector('#figureEditButton').style.display = 'flex';
        document.querySelector('#editionMode').style.display = 'flex';
    } else if (localStorage.hasOwnProperty('token') == false){
        document.querySelector('#articleEditButton').style.display = 'none';
        document.querySelector('#editionModeEditButton').style.display = 'none';
        document.querySelector('#projectEditButton').style.display = 'none';
        document.querySelector('#figureEditButton').style.display = 'none';
        document.querySelector('#editionMode').style.display = 'none';
    }
    return

}

export {userConnected};

console.log(localStorage.hasOwnProperty('token'));