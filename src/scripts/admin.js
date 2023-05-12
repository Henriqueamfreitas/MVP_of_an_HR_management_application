import { getAllDepartments, getCompanyById, getAllEmployees, getAllCompanies, createNewDepartment, getAllUnemployed, hireEmployee, fireEmployee, updateDepartment, removeDepartment } from './requests.js'
import {  renderDepartment, renderUser, renderModalUser } from './render.js'

const allDepartments = await getAllDepartments()
const allEmployees = await getAllEmployees()
const allCompanies = await getAllCompanies()
const allUnemployed = await getAllUnemployed()
console.log(allDepartments)
// console.log(allEmployees)
// console.log(allCompanies)


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

// We are going to get all the COMPANIES from the API and render them on the select in the Admin.html page
async function renderSelect(){
    // We are getting an array with all the companies from the API and assigning them to the variables 
    // allCompanies
    const allCompanies = await getAllCompanies()
    // We are getting the 'select' from the HTML document
    const select = document.querySelector('.select')

    allCompanies.forEach((company) => {
        // We are going to create the HTML element
        const option = document.createElement('option')
        
        // We are going to assign value to the element
        option.innerHTML = company.name
        
        // We are going to assign class and id to the element
        option.value = company.id
        option.classList = 'select__option'

        // We are going to establish the hirarchy between the elements
        select.append(option)
    })
}

// We are going to create the function that filters the departments and employees based on what 
// is in the select and show them on the Admin.HTML page
async function handleSelect(){
    const select = document.querySelector('.select')
    const departmentContainer = document.querySelector('.department__cards')
    const employeeContainer = document.querySelector('.users__cards')
    
    select.addEventListener('click', () => {
        const value = select.value        
        const filteredDepartment = allDepartments.filter((department) => department.company_id === value)
        const filteredEmployee = allEmployees.filter((employee) => employee.company_id === value)

        if(value === ''){
            departmentContainer.innerHTML = ''
            employeeContainer.innerHTML = ''
            renderDepartment(allDepartments)
            renderUser(allEmployees)
        } else{
            departmentContainer.innerHTML = ''
            employeeContainer.innerHTML = ''
            renderDepartment(filteredDepartment)
            renderUser(filteredEmployee)
        }
    })
}

// We are going to get all the EMPLOYEES from the API and render them on the select in the createDeparmtnet 
// modal. Its the same idea as the renderSelect(), but we apply it on the createDepartment modal and with
// employees instead of companies
async function renderModalCompanySelect(){
    // We are getting an array with all the companies from the API and assigning them to the variables 
    // allCompanies
    const allCompanies = await getAllCompanies()
    // We are getting the 'select' from the HTML document
    const select = document.querySelector('.createDepartment__form--select')

    allCompanies.forEach((company) => {
        // We are going to create the HTML element
        const option = document.createElement('option')
        
        // We are going to assign value to the element
        option.innerHTML = company.name
        
        // We are going to assign class and id to the element
        option.value = company.id
        option.classList = 'form__select--option'

        // We are going to establish the hirarchy between the elements
        select.append(option)
    })
}

// We are going to create a function that opens the create department modal
function handleCreateDepartmentModal(){
    const openButton = document.querySelector('.department__top--button')
    const modal = document.querySelector('.createDepartment__container')
    const closeButton = document.querySelector('.createDepartment__form--closeButton')
    const createButton = document.querySelector('.createDepartment__form--createButton')
    

    renderModalCompanySelect()

    openButton.addEventListener('click', (event) => {
        event.preventDefault()
        
        modal.showModal()
        closeModal(closeButton, modal)
    })

    createButton.addEventListener('click', async (event) => {
        let department = {}
        let count = 0
        const inputs = document.querySelectorAll('.createDepartment__form--input')
        const select = document.querySelector('.createDepartment__form--select')

        inputs.forEach((input) => {
            if(input.value === ''){
                count+=1
            }
            department[input.name] = input.value
        })
        
        department['company_id'] = select.value
        if(select.value === ''){
            count+=1
        }

        if(count !== 0){
            count = 0
            alert('Por favor, preencha todos os campos')
        } else{
            // console.log(department)
            await createNewDepartment(department)
            await renderDepartment(allDepartments)
            modal.close()
        }        
    })
}

// We are going to get all the EMPLOYEES from the API and render them on the select in the seeDeparmtnet 
// modal. Its the same idea as the renderSelect(), but we apply it on the see department modal and with
// employees instead of companies
async function renderModalSeeDepartmentSelect(object){
    // We are getting the 'select' from the HTML document
    const select = document.querySelector('.seeDepartment__select')
    select.innerHTML = ''
    const option = document.createElement('option')
    option.innerHTML = 'Selecionar usuário'
    option.value = ''
    option.classList = 'seeDepartment__select--option'
    select.append(option)


    object.forEach((employee) => {
        // We are going to create the HTML element
        const option = document.createElement('option')
        
        // We are going to assign value to the element
        option.innerHTML = employee.name
        
        // We are going to assign class and id to the element
        option.value = employee.id
        option.classList = 'seeDepartment__select--option'

        // We are going to establish the hirarchy between the elements
        select.append(option)
    })
}


// We are going to create a function that handles the create department modal
export function handleSeeDepartmentModal(){
    const modal = document.querySelector('.seeDepartment__container')
    const openButtons = document.querySelectorAll('.card__buttons--seeDepartment')
    const closeButton = document.querySelector('.seeDepartment__closeButton')
    
    
    
    openButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            modal.showModal()
            
            localStorage.setItem("@empresas:departmentId", event.target.dataset.departmentId)
            renderModalSeeDepartmentSelect(allUnemployed)
            
            renderModalUser(allEmployees)
            handleHireEmployee()
            closeModal(closeButton, modal)
        })
    })
}


// We are going to create a function that hire an employee
function handleHireEmployee(){
    const createButton = document.querySelector('.seeDepartment__hireButton')
    createButton.addEventListener('click', async(event) => {
        const departmentId = localStorage.getItem("@empresas:departmentId")
        const select = document.querySelector('.seeDepartment__select')
        const employeeId = select.value
        const departmentEmployees = document.querySelector('.seeDepartment__employess')
        const userCards = document.querySelector('.users__cards')
    
        let departmentObject = {}
        departmentObject['department_id'] = departmentId
        
        if(select.value === ''){
            alert('Por favor, selecione o usuário a ser contratado')
        } else{
            select.innerHTML = ''
            departmentEmployees.innerHTML = ''
            departmentEmployees.innerHTML = ''
            userCards.innerHTML = ''
    
            await hireEmployee(departmentObject, employeeId)
            await renderModalUser(allEmployees)
            location.reload()
            modal.close()
        }
    })
}


// We are going to create a function that handles the update department modal
export function handleUpdateDepartmentModal(){
    const modal = document.querySelector('.updateDepartment__container')
    const openButtons = document.querySelectorAll('.card__buttons--editDepartment')
    const closeButton = document.querySelector('.updateDepartment__closeButton')
    const saveButton = document.querySelector('.updateDepartment__saveButton')
    const input = document.querySelector('.updateDepartment__input')

    openButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            modal.showModal()

            const id = event.target.dataset.departmentId
            localStorage.setItem("@empresas:departmentId", id)
            const filteredDepartment = allDepartments.filter((department) => department.id === id)
            input.value = filteredDepartment[0].description
            closeModal(closeButton, modal)
        })
    })
    saveButton.addEventListener('click', (event) => {
        const departmentId = localStorage.getItem("@empresas:departmentId")
        const newDescription = input.value
        const filteredDepartment = allDepartments.filter((department) => department.id === departmentId)
        let updatedDepartment = {}
        
        updatedDepartment['description'] = newDescription
        updatedDepartment['name'] = filteredDepartment[0].name
        console.log(departmentId)
        console.log(updatedDepartment)
        
        updateDepartment(updatedDepartment, departmentId)
        modal.close()
        location.reload()
    })
}

// We are going to create a function that handles the remove department modal
export function handleRemoveDepartmentModal(){
    const modal = document.querySelector('.deleteDepartment__container')
    const openButtons = document.querySelectorAll('.card__buttons--excludeDepartment')
    const h2 = document.querySelector('.deleteDepartment__h2')
    const closeButton = document.querySelector('.deleteDepartment__closeButton')
    const deleteButton = document.querySelector('.deleteDepartment__deleteButton')

    
    openButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            modal.showModal()
            
            const id = event.target.dataset.departmentId
            localStorage.setItem("@empresas:departmentId", id)
            
            const filteredDepartment = allDepartments.filter((department) => department.id === id)
            const departmentName = (filteredDepartment[0].name)
            h2.innerHTML = `Realmente deseja remover o departamento ${departmentName} e demitir seus funcionários?`

            closeModal(closeButton, modal)
        })
    })
    deleteButton.addEventListener('click', (event) => {
        const departmentId = localStorage.getItem("@empresas:departmentId")
        
        removeDepartment(departmentId)
        modal.close()
        location.reload()
    })
}

// We are going to create a function that closes any modal
function closeModal(button, modal){
    button.addEventListener('click', (event) => {
        event.preventDefault()
        modal.close()
    })
}



handleCreateDepartmentModal()
redirectPage(logoutButton, loginPath)
renderDepartment(allDepartments)
renderUser(allEmployees)
renderSelect()
handleSelect()
