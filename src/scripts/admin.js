import { getAllDepartments, getCompanyById, getAllEmployees } from './requests.js'

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

// We are going to create a function that opens the create category modal
function handleCreateDepartmentModal(){
    const openButton = document.querySelector('.department__top--button')
    const modal = document.querySelector('.createDepartment__container')
    const closeButton = document.querySelector('.createDepartment__form--closeButton')
    const createButton = document.querySelector('.createDepartment__form--createButton')

    openButton.addEventListener('click', (event) => {
        event.preventDefault()
        
        modal.showModal()
        closeModal(closeButton, modal)
    })
}

// We are going to create a function that closes any modal
function closeModal(button, modal){
    button.addEventListener('click', (event) => {
        event.preventDefault()
        modal.close()
    })
}



const allDepartments = await getAllDepartments()
// console.log(allDepartments)
// We are going to create a function that create the card of the department
async function createDepartmentCard(object){
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
    editDepartment.classList = 'card__buttons--editDepartment'
    editDepartment.dataset.departmentId = object.id 
    excludeDepartment.classList = 'card__buttons--excludeDepartment'
    excludeDepartment.dataset.departmentId = object.id 
    
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
function renderDepartment(array){
    const cards = document.querySelector('.department__cards')
    cards.innerHTML = ''

    array.forEach(async (element) => {
        const card = await createDepartmentCard(element)
        cards.append(card)
    })
}


const allEmployees = await getAllEmployees()
console.log(allEmployees)
// We are going to create a function that create the card of the user
async function createUserCard(object){
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
    // const company = await getCompanyById(id)
    
    // Assigning values to the HTML elements
    h1.innerHTML = object.name
    // description.innerHTML = company.name
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
function renderUser(array){
    const cards = document.querySelector('.users__cards')
    cards.innerHTML = ''

    array.forEach(async (element) => {
        const card = await createUserCard(element)
        cards.append(card)
    })
}



handleCreateDepartmentModal()
redirectPage(logoutButton, loginPath)
renderDepartment(allDepartments)
renderUser(allEmployees)