import { getAllCategories, getAllCompanies } from './requests.js'

// We are going to get all the CATEGORIES from the API and render them on the HTML document
async function renderSelect(){
    // We are getting an array with all the categories from the API and assigning them to the variables allCategories
    const allCategories = await getAllCategories()
    // We are getting the 'select' from the HTML document
    const select = document.querySelector('.companies__select')

    allCategories.forEach((category) => {
        // We are going to create the HTML element
        const option = document.createElement('option')
        
        // We are going to assign value to the element
        option.innerText = category.name

        // We are going to assign class and id to the element
        option.value = category.id
        option.classList = 'companies__select--option'

        // We are going to establish the hirarchy between the elements
        select.append(option)
    })
}

// We are going to get all the COMPANIES from the API and render them on the HTML document
async function renderCompanies(){
    // We are getting an array with all the categories from the API and assigning them to the variables allCategories
    const allCompanies = await getAllCompanies()
    // We are getting the 'select' from the HTML document
    const container = document.querySelector('.companies__container')

    allCompanies.forEach(async (company) => {
        // We are going to create the HTML elements
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')
        
        // In the return of the getAllCompanies() function, we get an array. But, in this array, there is only 
        // information about the category_id and we need the category Name. So, we call the getAllCategories() 
        // function and filter the category with the same ID as the company (filteredCategory) 
        const allCategories = await getAllCategories()
        const categoryId = company.category_id
        const filteredCategory = allCategories.filter((category) => category.id === categoryId)

        // We are going to assign value to the element
        h3.innerText = company.name
        p.innerText = filteredCategory[0].name

        // We are going to assign class and id to the element
        div.classList = 'container__company'
        h3.classList = 'container__company--h3'
        p.classList = 'container__company--p'

        // We are going to establish the hirarchy between the elements
        container.append(div)
        div.append(h3,p)
    })
}

// We are going to edit the login button and redirect to the login html page
const loginButton = document.querySelector('.header__buttons--login')
const loginPath = '/src/pages/login.html'
const registerPath = '/src/pages/register.html'
const registerButton = document.querySelector('.header__buttons--register')
function redirectPage(button, path){
    button.addEventListener('click', ()=>{
        location.replace(path)
    })
} 

// Functions
renderSelect()
renderCompanies()
redirectPage(loginButton, loginPath)
redirectPage(registerButton, registerPath)
