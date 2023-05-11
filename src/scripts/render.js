import { getAllDepartments, getCompanyById, getAllEmployees } from './requests.js'
import { handleSeeDepartmentModal } from './admin.js'

const allDepartments = await getAllDepartments()
// console.log(allDepartments)
// We are going to create a function that create the card of the department
export async function createDepartmentCard(object){
    // We are going to create the HTML elements
    const card = document.createElement('div')
    const cardDescriptions = document.createElement('div')
    const h1 = document.createElement('h1')
    const description = document.createElement('p')
    const companyName = document.createElement('p')
    
    const cardButtons = document.createElement('div')
    const seeDepartment = document.createElement('button')
    const seeDepartmentImg = document.createElement('img')
    const editDepartment = document.createElement('button')
    const editDepartmentImg = document.createElement('img')
    const excludeDepartment = document.createElement('button')
    const excludeDepartmentImg = document.createElement('img')
    
    // Assigning classes and IDs to the HTML elements
    card.classList = 'department__cards--card'
    cardDescriptions.classList = 'card__descriptions'
    h1.classList = 'card__descriptions--h1'
    description.classList = 'card__descriptions--description'
    companyName.classList = 'card__descriptions--companyName'
    
    cardButtons.classList = 'card__buttons'
    seeDepartment.classList = 'card__buttons--seeDepartment'
    seeDepartment.dataset.departmentId = object.id 
    seeDepartmentImg.classList = 'seeDepartment__img'
    seeDepartmentImg.dataset.departmentId = object.id
    editDepartment.classList = 'card__buttons--editDepartment'
    editDepartment.dataset.departmentId = object.id 
    editDepartmentImg.classList = 'editDepartment__img'
    editDepartmentImg.dataset.departmentId = object.id
    excludeDepartment.classList = 'card__buttons--excludeDepartment'
    excludeDepartment.dataset.departmentId = object.id 
    excludeDepartmentImg.classList = 'excludeDepartment__img'
    excludeDepartmentImg.dataset.departmentId = object.id

    
    // Getting the name of the company by the company id
    const id = object.company_id
    const company = await getCompanyById(id)
    
    // Assigning values to the HTML elements
    h1.innerHTML = object.name
    description.innerHTML = object.description
    companyName.innerHTML = company.name
    seeDepartmentImg.src = '../../images/seeButon-Image.svg'
    editDepartmentImg.src = '../../images/editButon-Image.svg'
    excludeDepartmentImg.src = '../../images/deleteButon-Image.svg'

    // Establishing the hierarchy between the elements
    card.append(cardDescriptions, cardButtons)
    cardDescriptions.append(h1, description, companyName)
    cardButtons.append(seeDepartment, editDepartment, excludeDepartment)
    seeDepartment.append(seeDepartmentImg)
    editDepartment.append(editDepartmentImg)
    excludeDepartment.append(excludeDepartmentImg)

    return card
}

// We are going to create a function that render the cards of the department
export async function renderDepartment(array){
    const cards = document.querySelector('.department__cards')
    cards.innerHTML = ''

    array.forEach(async (element) => {
        const card = await createDepartmentCard(element)
        cards.append(card)
        handleSeeDepartmentModal()
    })

}

const allEmployees = await getAllEmployees()
// We are going to create a function that create the card of the user to be rendered on the admin.HTML
// page
export async function createUserCard(object){
    // We are going to create the HTML elements
    const card = document.createElement('div')
    const cardDescriptions = document.createElement('div')
    const h1 = document.createElement('h1')
    const description = document.createElement('p')
    
    const cardButtons = document.createElement('div')
    const editUser = document.createElement('button')
    const editUserImg = document.createElement('img')
    const excludeUser = document.createElement('button')
    const excludeUserImg = document.createElement('img')
    
    // Assigning classes and IDs to the HTML elements
    card.classList = 'department__cards--card'
    cardDescriptions.classList = 'card__descriptions'
    h1.classList = 'card__descriptions--h1'
    description.classList = 'card__descriptions--description'
    
    cardButtons.classList = 'card__buttons'
    editUser.classList = 'card__buttons--editUser'
    editUser.dataset.userId = object.id 
    excludeUser.classList = 'card__buttons--excludeUser'
    excludeUser.dataset.userId = object.id 
    
    // Getting the name of the company by the company id
    const id = object.company_id
    const company = await getCompanyById(id)
    
    // Assigning values to the HTML elements
    h1.innerHTML = object.name
    description.innerHTML = company.name
    editUserImg.src = '../../images/editButon-Image.svg'
    excludeUserImg.src = '../../images/deleteButon-Image.svg'

    // Establishing the hierarchy between the elements
    card.append(cardDescriptions, cardButtons)
    cardDescriptions.append(h1, description)
    cardButtons.append(editUser, excludeUser)
    editUser.append(editUserImg)
    excludeUser.append(excludeUserImg)

    return card
}

// We are going to create a function that render the cards of the department
export function renderUser(array){
    const cards = document.querySelector('.users__cards')
    cards.innerHTML = ''

    array.forEach(async (element) => {
        if(element.company_id !== null){
            const card = await createUserCard(element)
            cards.append(card)
        }
    })
}

// We are going to create a function that create the card of the user to be rendered on the seeDepartment
// modal
export async function createModalUserCard(object){
    // We are going to create the HTML elements
    const card = document.createElement('div')
    const h1 = document.createElement('h1')
    const p = document.createElement('p')
    const button = document.createElement('button')

    // Assigning classes and IDs to the HTML elements
    card.classList = 'seeDepartment__employess-card'
    h1.classList = 'card__employee--name'
    p.classList = 'card__employee--Companyname'
    button.classList = 'card__employee--button'
    button.dataset.employeeId = object.id

    const company = await getCompanyById(object.company_id)

    // Assigning values to the HTML elements
    h1.innerHTML = object.name
    p.innerHTML = company.name
    button.innerHTML = 'Desligar'

    // Establishing the hierarchy between the elements
    card.append(h1, p, button)
    
    return card
}

// We are going to create a function that render the cards of the department
export async function renderModalUser(array){
    const cards = document.querySelector('.seeDepartment__employess')
    cards.innerHTML = ''
    const departmentId = localStorage.getItem("@empresas:departmentId")

    const departmentName = document.querySelector('.seeDepartment__h2')
    const departmentDescription = document.querySelector('.seeDepartment__h3')
    const departmentCompany = document.querySelector('.seeDepartment__p')

    const filteredDepartment = allDepartments.filter((department) => department.id === departmentId)
    const company = await getCompanyById(filteredDepartment[0].company_id)
    
    departmentName.innerHTML = filteredDepartment[0].name 
    departmentDescription.innerHTML = filteredDepartment[0].description
    departmentCompany.innerHTML = company.name 
    
    array.forEach(async (element) => {
        if(element.department_id === departmentId){
            const card = await createModalUserCard(element)
            cards.append(card)
        }
    })
}
