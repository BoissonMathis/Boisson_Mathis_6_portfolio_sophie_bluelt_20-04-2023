
// let regex = /^[a-zA-Z-]+$/;
// // let getUser = [{username: 'sophie.bluel@test.tld', password:'S0phie', token:'tokenTest'}];
// // console.log(getUser);


// loginForm.addEventListener('submit', async function(event) {
//     event.preventDefault();
    
//     var reponse = await fetch('http://localhost:5678/api/users/login');
//     var getUser = await reponse.json();
//     console.log(getUser);

//     if (myEmail.value === '' || myPassword.value === ''){
//         let loginError = document.getElementById('loginError');
//         loginError.style.display = 'flex';
//     } 
//     else if (regex.test(myEmail.value || myPassword.value) === false){
//         let loginError = document.getElementById('loginError');
//         loginError.style.display = 'flex';
//     }
//         // window.location.href = "/index.html";
//         // window.localStorage.setItem("token", token[0]);
//         //bearerToken  fetch
// });


import { userConnected } from "./userConnected.mjs";

if(window.localStorage.getItem("token")){
    window.location.href = "/index.html";
}

    
let loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    let myEmail = document.getElementById('email').value;
    let myPassword = document.getElementById('password').value;
    let loginError = document.getElementById('loginError');
    var reponse = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email: myEmail,
            password: myPassword,
        }),
        headers: {
            "Content-type": "application/json",
            "Authentication": "Bearer {token}",
        },
    })
    
    var getUser = await reponse.json()
    let loginToken = getUser.token;
    console.log(getUser);
    console.log(reponse.status);
    console.log(reponse);
    console.log(loginToken);

    
    if (reponse.status == 200){
        window.location.href = "/index.html";
        window.localStorage.setItem("token", JSON.stringify(loginToken));
        userConnected();
    }
    else if (reponse.status >= 400){
        loginError.style.display = 'flex';
    }
})

console.log(localStorage);