// We are going to edit the login and the register buttons and redirect to the login/register html page
const homeButton = document.querySelector('.header__buttons--home')
const returnButton = document.querySelector('.main__form--returnButton')
const homePath = '/src/home.html'
const loginPath = '/src/pages/login.html'
const loginButton = document.querySelector('.header__buttons--login')
function redirectPage(button, path){
    button.addEventListener('click', (event)=>{
        event.preventDefault()
        location.replace(path)
    })
}

redirectPage(homeButton, homePath)
redirectPage(returnButton, homePath)
redirectPage(loginButton, loginPath)