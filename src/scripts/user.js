import { getLoggedUserInformation, getCategoryInformation } from './requests.js'

// We are going to edit the logout, redirect to the login html page and clear the localStorage
const logoutButton = document.querySelector('.header__buttons--logout')
const loginPath = '/src/pages/login.html'
function redirectPage(button, path){
    button.addEventListener('click', (event)=>{
        event.preventDefault()
        localStorage.clear()
        location.replace(path)
    })
}



const userInformation = await getLoggedUserInformation()
// const categoryInformation = await getCategoryInformation()

function render(){
    // Getting the HTML elements from the document
    const userName = document.querySelector('.userInformation__container--h2')
    const email = document.querySelector('.userInformation__container--p')
    
    // Assgining value to the HTML elements
    userName.innerHTML = userInformation.name
    email.innerHTML = userInformation.email

    // console.log(categoryInformation)
    const companyName = document.querySelector('.company__container--name')
    const companyCategory = document.querySelector('.company__container--department')


}

redirectPage(logoutButton, loginPath)
render()