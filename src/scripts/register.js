import { createNewUser, validateLoginUser } from './requests.js'

// We are going to edit the login and the register buttons and redirect to the login/register html page
const homeButton = document.querySelector('.header__buttons--home')
const returnButton = document.querySelector('.main__form--returnButton')
const homePath = '/index.html'
const loginPath = '/src/pages/login.html'
const loginButton = document.querySelector('.header__buttons--login')
function redirectPage(button, path){
    button.addEventListener('click', (event)=>{
        event.preventDefault()
        location.replace(path)
    })
}

// We are going to create a function that add an event to the register button, get all the value of the 
// inputs and insert in an object and call the function createNewUser() with this object as a parameter
async function handleCreateUser(){
    const registerButton = document.querySelector('.main__form--registerButton')
    const inputs = document.querySelectorAll('.main__form--input')
    let user = {}

    registerButton.addEventListener('click', async (event) => {
        event.preventDefault()
        inputs.forEach(( { name, value} ) => {
            user[name] = value
        })
        console.log(user)

        await createNewUser(user)
        location.replace('/src/pages/login.html')
    })
    
}

redirectPage(homeButton, homePath)
redirectPage(returnButton, homePath)
redirectPage(loginButton, loginPath)
handleCreateUser()

