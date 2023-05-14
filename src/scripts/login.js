import { validateLoginUser } from './requests.js'

// We are going to edit the login and the register buttons and redirect to the login/register html page
const homeButton = document.querySelector('.header__buttons--home')
const homePath = '/index.html'
const registerPath = '/src/pages/register.html'
const registerButton = document.querySelector('.header__buttons--register')
const formRegisterButton = document.querySelector('.main__form--registerButton')
function redirectPage(button, path){
    button.addEventListener('click', (event)=>{
        event.preventDefault()
        location.replace(path)
    })
}

// We are going to create a function that add an event to the login button, get all the value of the 
// inputs and insert in an object and call the function validateLoginUser() with this object as a parameter
async function handleLogin(){
    const loginButton = document.querySelector('.main__form--loginButton')
    const inputs = document.querySelectorAll('.main__form--input')
    const emailInput = inputs[0]
    let user = {}
    let count = 0    

    loginButton.addEventListener('click', async (event) => {
        event.preventDefault()
        localStorage.setItem("@empresas:email", emailInput.value)

        inputs.forEach(( { name, value } ) => {
            user[name] = value
            if(value === ''){
                count+=1
            }
        })

        if(count !== 0){
            count = 0
            alert('Preencha todos os campos necessários')
        } else{
            const loginObject = await validateLoginUser(user)
    
            const objectStringfied = JSON.stringify(loginObject)
            localStorage.setItem("@empresas:loginObject", objectStringfied)

            if(loginObject.isAdm === true){
                location.replace('/src/pages/admin.html')
            } else{
                location.replace('/src/pages/user.html')
            }
        }        
    })
}









redirectPage(homeButton, homePath)
redirectPage(registerButton, registerPath)
redirectPage(formRegisterButton, registerPath)
handleLogin()
