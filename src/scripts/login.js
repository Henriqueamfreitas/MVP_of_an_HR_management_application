// We are going to edit the login and the register buttons and redirect to the login/register html page
const homeButton = document.querySelector('.header__buttons--home')
const homePath = '/src/home.html'
const registerPath = '/src/pages/register.html'
const registerButton = document.querySelector('.header__buttons--register')
function redirectPage(button, path){
    button.addEventListener('click', ()=>{
        location.replace(path)
    })
}

redirectPage(homeButton, homePath)
redirectPage(registerButton, registerPath)