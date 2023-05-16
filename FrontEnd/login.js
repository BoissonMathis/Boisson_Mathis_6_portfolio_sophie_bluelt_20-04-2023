
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


// let loginForm = document.getElementById('loginForm');
// loginForm.addEventListener('submit', async function(event) {
//     event.preventDefault();
//     let myEmail = document.getElementById('email').value;
//     let myPassword = document.getElementById('password').value;
//     fetch('http://localhost:5678/api/users/login', {
//         method: 'POST',
//         body: JSON.stringify({
//             email: myEmail,
//             password: myPassword,
//         }),
//         headers: {
//             "Content-type": "application/json",
//         },
//     })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
// })

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
        },
    })
    var getUser = await reponse.json()
    console.log(getUser)

    if (getUser.message == 'user not found'){
                loginError.style.display = 'flex';
            }
    else if (getUser){
        window.location.href = "/index.html";
        window.localStorage.setItem("token", getUser.token.value);
    }
})