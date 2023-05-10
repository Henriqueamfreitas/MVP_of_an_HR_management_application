import { getAllDepartments, getCompanyById } from './requests.js'

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
function handleCreateCategoryModal(){
    const openButton = document.querySelector('.categories__top--button')
    const modal = document.querySelector('.createCategorie__container')
    const closeButton = document.querySelector('.createCategorie__form--closeButton')
    const createButton = document.querySelector('.createCategorie__form--createButton')

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
console.log(allDepartments)

// console.log(id)
// console.log(typeof(id))
// console.log(JSON.parse(id))
// console.log(typeof(id))


const company = await getCompanyById('0325382c-c3d0-41f7-b9ad-74e210522e96')
console.log(company)


handleCreateCategoryModal()
redirectPage(logoutButton, loginPath)