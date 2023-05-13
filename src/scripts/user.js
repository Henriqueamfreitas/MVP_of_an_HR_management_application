import { getLoggedUserInformation, getCategoryInformation, getCompanyById, readEmployeesByCompany } from './requests.js'

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

async function render(){
    const company = await getCompanyById(userInformation.company_id)
    const departments = company.departments
    const filteredDepartment = departments.filter((department) => department.id === userInformation.department_id)
    
    // Getting the HTML elements from the document
    const userName = document.querySelector('.userInformation__container--h2')
    const email = document.querySelector('.userInformation__container--p')
    const companyName = document.querySelector('.company__container--name')
    const companyDepartment = document.querySelector('.company__container--department')
    
    // Assgining value to the HTML elements
    userName.innerHTML = userInformation.name
    email.innerHTML = userInformation.email
    companyName.innerHTML = company.name
    companyDepartment.innerHTML = filteredDepartment[0].name





}

const company = await readEmployeesByCompany(userInformation.company_id)
const employees = await company.employees
async function createUserCard(object){
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    
    h2.innerHTML = object.name
    
    div.classList = 'company__employees--card'
    h2.classList = 'employees__card--h2'
    
    div.append(h2)
    
    return div
}

async function renderUserCard(array){
    const company = await getCompanyById(userInformation.company_id)
    const departments = company.departments
    const filteredDepartment = departments.filter((department) => department.id === userInformation.department_id)
    
    // Getting the HTML elements from the document
    const userName = document.querySelector('.userInformation__container--h2')
    const email = document.querySelector('.userInformation__container--p')
    const companyName = document.querySelector('.company__container--name')
    const companyDepartment = document.querySelector('.company__container--department')
    
    // Assgining value to the HTML elements
    userName.innerHTML = userInformation.name
    email.innerHTML = userInformation.email
    companyName.innerHTML = company.name
    companyDepartment.innerHTML = filteredDepartment[0].name


    const companyEmployees = document.querySelector('.company__employees')
    array.forEach(async (element) => {
        const card = await createUserCard(element)
        companyEmployees.append(card)
    })    
}


renderUserCard(employees)
redirectPage(logoutButton, loginPath)
render()