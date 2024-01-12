import { validateLoginUser } from './requests.js'

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
            const token = JSON.stringify(loginObject.authToken)
            const isAdm = JSON.stringify(loginObject.isAdm)
            localStorage.setItem("@empresas:loginObject", objectStringfied)
            localStorage.setItem("@empresas:token", token)
            localStorage.setItem("@empresas:isAdm", isAdm)

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
