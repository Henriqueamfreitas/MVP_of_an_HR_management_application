import { getAllCategories, getAllCompanies } from './requests.js'

async function renderSelect(){
    const allCategories = await getAllCategories()

    const select = document.querySelector('.companies__select')

    allCategories.forEach((category) => {
        const option = document.createElement('option')
        
        option.innerText = category.name

        option.value = category.id
        option.classList = 'companies__select--option'

        select.append(option)
    })
}

const allCompanies = await getAllCompanies()
async function renderCompanies(array){
    const container = document.querySelector('.container__company')

    array.forEach(async (element) => {
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')
        
        const allCategories = await getAllCategories()
        const categoryId = element.category_id
        const filteredCategory = allCategories.filter((category) => category.id === categoryId)

        h3.innerText = element.name
        p.innerText = filteredCategory[0].name

        div.classList = 'container__company--div'
        h3.classList = 'container__company--h3 text-8'
        p.classList = 'container__company--p text-14'

        container.append(div)
        div.append(h3,p)
    })
}

const loginButton = document.querySelector('.header__buttons--login')
const loginPath = '/src/pages/login.html'
const registerPath = '/src/pages/register.html'
const registerButton = document.querySelector('.header__buttons--register')
function redirectPage(button, path){
    button.addEventListener('click', ()=>{
        location.replace(path)
    })
} 

async function handleSelect(){
    const select = document.querySelector('.companies__select')
    const container = document.querySelector('.container__company')
    
    select.addEventListener('click', () => {
        const value = select.value        
        const filteredCompanies = allCompanies.filter((company) => company.category_id === value)

        if(value === ''){
            container.innerHTML = ''
            renderCompanies(allCompanies)
        } else{
            container.innerHTML = ''
            renderCompanies(filteredCompanies)
        }
    })
}

renderSelect()
renderCompanies(allCompanies)
redirectPage(loginButton, loginPath)
redirectPage(registerButton, registerPath)
handleSelect()
