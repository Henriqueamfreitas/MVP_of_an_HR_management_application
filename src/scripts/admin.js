import { getAllDepartments, getCompanyById, getAllEmployees } from './requests.js'
import { createDepartmentCard, renderDepartment, createUserCard, renderUser } from './render.js'

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






handleCreateDepartmentModal()
redirectPage(logoutButton, loginPath)

const allDepartments = await getAllDepartments()
renderDepartment(allDepartments)

const allEmployees = await getAllEmployees()
renderUser(allEmployees)