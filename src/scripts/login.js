// We are going to edit the login and the register buttons and redirect to the login/register html page
const homeButton = document.querySelector('.header__buttons--home')
const homePath = '/src/home.html'
const registerPath = '/src/pages/register.html'
const registerButton = document.querySelector('.header__buttons--register')
const formRegisterButton = document.querySelector('.main__form--registerButton')
function redirectPage(button, path){
    button.addEventListener('click', (event)=>{
        event.preventDefault()
        location.replace(path)
    })
}

redirectPage(homeButton, homePath)
redirectPage(registerButton, registerPath)
redirectPage(formRegisterButton, registerPath)