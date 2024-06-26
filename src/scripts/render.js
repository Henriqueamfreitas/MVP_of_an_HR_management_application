import { getAllDepartments, getCompanyById, getAllEmployees, fireEmployee } from './requests.js'
import { handleSeeDepartmentModal, handleUpdateDepartmentModal, handleRemoveDepartmentModal, handleUpdateEmployeeModal, handleDeleteEmployeeModal } from './admin.js'

const allDepartments = await getAllDepartments()
export async function createDepartmentCard(object){
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
    
    card.classList = 'department__cards--card'
    cardDescriptions.classList = 'card__descriptions'
    h1.classList = 'card__descriptions--h1 text-8'
    description.classList = 'card__descriptions--description text-11'
    companyName.classList = 'card__descriptions--companyName text-11'
    
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

    const id = object.company_id
    const company = await getCompanyById(id)
    
    h1.innerHTML = object.name
    description.innerHTML = object.description
    companyName.innerHTML = company.name
    seeDepartmentImg.src = '../../images/seeButon-Image.svg'
    editDepartmentImg.src = '../../images/editButon-Image.svg'
    excludeDepartmentImg.src = '../../images/deleteButon-Image.svg'

    card.append(cardDescriptions, cardButtons)
    cardDescriptions.append(h1, description, companyName)
    cardButtons.append(seeDepartment, editDepartment, excludeDepartment)
    seeDepartment.append(seeDepartmentImg)
    editDepartment.append(editDepartmentImg)
    excludeDepartment.append(excludeDepartmentImg)

    return card
}

export async function renderDepartment(array){
    const cards = document.querySelector('.department__cards')
    cards.innerHTML = ''

    array.forEach(async (element) => {
        const card = await createDepartmentCard(element)
        cards.append(card)
        handleSeeDepartmentModal()
        handleUpdateDepartmentModal()
        handleRemoveDepartmentModal()
    })
}

const allEmployees = await getAllEmployees()

export async function createUserCard(object){
    const card = document.createElement('div')
    const cardDescriptions = document.createElement('div')
    const h1 = document.createElement('h1')
    const description = document.createElement('p')
    
    const cardButtons = document.createElement('div')
    const editUser = document.createElement('button')
    const editUserImg = document.createElement('img')
    const excludeUser = document.createElement('button')
    const excludeUserImg = document.createElement('img')
    
    card.classList = 'department__cards--card'
    cardDescriptions.classList = 'card__descriptions'
    h1.classList = 'card__descriptions--h1 text-8'
    description.classList = 'card__descriptions--description text-11'
    
    cardButtons.classList = 'card__buttons'
    editUser.classList = 'card__buttons--editUser'
    editUser.dataset.userId = object.id 
    editUserImg.classList = 'card__buttons--editUserImg'
    editUserImg.dataset.userId = object.id 

    excludeUser.classList = 'card__buttons--excludeUser'
    excludeUser.dataset.userId = object.id 
    excludeUserImg.classList = 'card__buttons--excludeUserImg'
    excludeUserImg.dataset.userId = object.id 
    
    const id = object.company_id
    const company = await getCompanyById(id)
    
    h1.innerHTML = object.name
    if(id!== null){
        description.innerHTML = company.name
    } else{
        description.innerHTML = 'Ainda não foi contratado'
    }
    editUserImg.src = '../../images/editButon-Image.svg'
    excludeUserImg.src = '../../images/deleteButon-Image.svg'

    card.append(cardDescriptions, cardButtons)
    cardDescriptions.append(h1, description)
    cardButtons.append(editUser, excludeUser)
    editUser.append(editUserImg)
    excludeUser.append(excludeUserImg)

    return card
}

export async function renderUser(array){
    const cards = document.querySelector('.users__cards')
    cards.innerHTML = ''

    array.forEach(async (element) => {
        const card = await createUserCard(element)
        cards.append(card)
        handleUpdateEmployeeModal()
        handleDeleteEmployeeModal()
    })
}

export async function createModalUserCard(object){
    const card = document.createElement('div')
    const h1 = document.createElement('h1')
    const p = document.createElement('p')
    const button = document.createElement('button')

    card.classList = 'seeDepartment__employess-card'
    h1.classList = 'card__employee--name text-8'
    p.classList = 'card__employee--Companyname text-12'
    button.classList = 'card__employee--button text-10'
    button.dataset.employeeId = object.id

    const company = await getCompanyById(object.company_id)

    h1.innerHTML = object.name
    p.innerHTML = company.name
    button.innerHTML = 'Desligar'

    card.append(h1, p, button)
    
    button.addEventListener('click', async(event) => {
        const id = event.target.dataset.employeeId
        const modal = document.querySelector('.seeDepartment__container')
        await fireEmployee(id)
        modal.close()
        location.reload()
    })

    return card
}

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
