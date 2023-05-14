import { getLoggedUserInformation, getCategoryInformation, getCompanyById, readEmployeesByCompany } from './requests.js'

function authentication(){
    const token = localStorage.getItem("@empresas:token") 
    const isAdm = localStorage.getItem("@empresas:isAdm") 

    if(!token){ 
        location.replace('/index.html')
    }
    if(isAdm === 'true'){
        location.replace('/index.html')
    }
}

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
    h2.classList = 'employees__card--h2 text-8'
    
    div.append(h2)
    
    return div
}

async function renderUserCard(){
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
        let classStyle = 'hidden'
        employees.style.backgroundColor = 'white'

        p.innerHTML = 'Você ainda não foi contratado'

        p.classList = 'company__controller--pUnemployeed text-4'

        controller.append(p)
    } else{
        const companyEmployee = await readEmployeesByCompany(userInformation.company_id)
        const employeesArray = await companyEmployee.employees

        const company = await getCompanyById(userInformation.company_id)
        const departments = company.departments
        const filteredDepartment = departments.filter((department) => department.id === userInformation.department_id)

        const companyDescription = document.createElement('p')        

        // Assgining value to the HTML elements
        companyDescription.innerHTML = `${company.name} - ${filteredDepartment[0].name}`
        companyDescription.classList = 'company__employees--companyDescription text-3'

        const employees = document.querySelector('.company__employees')
        employees.append(companyDescription)

        employeesArray.forEach(async(element) => {
            const card = await createUserCard(element)
            employees.append(card)
        })
    }
}


renderUserCard()
redirectPage(logoutButton, loginPath)
authentication()