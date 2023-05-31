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
    
    var getUser = await reponse.json();
    let loginToken = getUser.token;

    if (reponse.status == 200){
        window.location.href = "/index.html";
        window.localStorage.setItem("token", loginToken);
        userConnected();
    }
    else if (reponse.status >= 400){
        loginError.style.display = 'flex';
    }
})

console.log(localStorage);