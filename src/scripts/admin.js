import { getAllDepartments, getCompanyById, getAllEmployees, getAllCompanies } from './requests.js'
import { createDepartmentCard, renderDepartment, createUserCard, renderUser } from './render.js'

const allDepartments = await getAllDepartments()
const allEmployees = await getAllEmployees()
const allCompanies = await getAllCompanies()
// console.log(allDepartments)
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

// We are going to get all the COMPANIES from the API and render them on the select
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
// is in the select
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

// We are going to create a function that closes any modal
function closeModal(button, modal){
    button.addEventListener('click', (event) => {
        event.preventDefault()
        modal.close()
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

export const modal = document.querySelector('.seeDepartment__container')

export const closeButton = document.querySelector('.seeDepartment__hireButton')
export const createButton = document.querySelector('.seeDepartment__hireButton')

function handleSeeDepartmentModal(){
    const openButton = document.querySelector('.card__buttons--seeDepartment')
    console.log(openButton)
    console.log(modal)
    console.log(closeButton)
    console.log(createButton)

    // openButton.addEventListener('click', (event) => {
    //     event.preventDefault()
        
    //     modal.showModal()
    //     closeModal(closeButton, modal)
    // })
}





handleCreateDepartmentModal()
handleSeeDepartmentModal()
redirectPage(logoutButton, loginPath)
renderDepartment(allDepartments)
renderUser(allEmployees)
renderSelect()
handleSelect()