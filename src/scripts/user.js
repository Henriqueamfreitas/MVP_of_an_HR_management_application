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
async function createUserCard(object){
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    
    h2.innerHTML = object.name
    
    div.classList = 'company__employees--card'
    h2.classList = 'employees__card--h2'
    
    div.append(h2)
    
    return div
}

const company = await readEmployeesByCompany(userInformation.company_id)
const employees = await company.employees
async function renderUserCard(array){
    // Getting the HTML elements from the document
    const userName = document.querySelector('.userInformation__container--h2')
    const email = document.querySelector('.userInformation__container--p')
    const controller = document.querySelector('.company__controller')
    const employees = document.querySelector('.company__employees')
   
    // Assgining value to the HTML elements
    userName.innerHTML = userInformation.name
    email.innerHTML = userInformation.email

    if(userInformation.company_id === null){
        const p = document.createElement('p')

        p.innerHTML = 'Você ainda não foi contratado'

        p.classList = 'company__controller--pUnemployeed'

        controller.append(p)
    } else{
        const company = await getCompanyById(userInformation.company_id)
        const departments = company.departments
        const filteredDepartment = departments.filter((department) => department.id === userInformation.department_id)

        const companyDescription = document.createElement('p')        

        // Assgining value to the HTML elements
        companyDescription.innerHTML = `${company.name} - ${filteredDepartment[0].name}`
        employees.append(companyDescription)

        array.forEach(async(element) => {
            const card = await createUserCard(element)
            employees.append(card)
        })
    }
}


renderUserCard(employees)
redirectPage(logoutButton, loginPath)
