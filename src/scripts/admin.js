import { getAllDepartments, getCompanyById, getAllEmployees, getAllCompanies, createNewDepartment, getAllUnemployed, hireEmployee, fireEmployee, updateDepartment, removeDepartment, updateEmployee, removeEmployee, readDepartmentsByCompany } from './requests.js'
import {  renderDepartment, renderUser, renderModalUser } from './render.js'

const allDepartments = await getAllDepartments()
const allEmployees = await getAllEmployees()
const allCompanies = await getAllCompanies()
const allUnemployed = await getAllUnemployed()


function authentication(){
    const token = localStorage.getItem("@empresas:token") 
    const isAdm = localStorage.getItem("@empresas:isAdm") 
    console.log(isAdm)

    if(!token){ 
        location.replace('/index.html')
    }
    if(isAdm === 'false'){
        location.replace('/index.html')
    }
}

const logoutButton = document.querySelector('.header__buttons--logout')
const loginPath = '/src/pages/login.html'
function redirectPage(button, path){
    button.addEventListener('click', (event)=>{
        event.preventDefault()
        localStorage.clear()
        location.replace(path)
    })
}

async function renderSelect(){
    const allCompanies = await getAllCompanies()

    const select = document.querySelector('.select')

    allCompanies.forEach((company) => {
        const option = document.createElement('option')
        
        option.innerHTML = company.name
        
        option.value = company.id
        option.classList = 'select__option'

        select.append(option)
    })
}

async function handleSelect(){
    const select = document.querySelector('.select')
    const departmentContainer = document.querySelector('.department__cards')
    const employeeContainer = document.querySelector('.users__cards')
    const textNoDepartments = document.querySelector('.cards__noDepartments')

    
    select.addEventListener('click', () => {
        const value = select.value 
        if(value === ''){
            textNoDepartments.innerHTML = ''
            departmentContainer.innerHTML = ''
            employeeContainer.innerHTML = ''
            renderDepartment(allDepartments)
            renderUser(allEmployees)
        } else{
        localStorage.setItem("@empresas:company_id", value)       
        const filteredDepartment = allDepartments.filter((department) => department.company_id === value)
        const filteredEmployee = allEmployees.filter((employee) => employee.company_id === value)
        addAndRemoveText()

        departmentContainer.innerHTML = ''
        employeeContainer.innerHTML = ''
        renderDepartment(filteredDepartment)
        renderUser(filteredEmployee)
        }
    })
}

async function renderModalCompanySelect(){
    const allCompanies = await getAllCompanies()
    const select = document.querySelector('.createDepartment__form--select')

    allCompanies.forEach((company) => {
        const option = document.createElement('option')
        
        option.innerHTML = company.name
        
        option.value = company.id
        option.classList = 'form__select--option'

        select.append(option)
    })
}

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
            await createNewDepartment(department)
            await renderDepartment(allDepartments)
            modal.close()
        }        
    })
}

async function renderModalSeeDepartmentSelect(object){
    const select = document.querySelector('.seeDepartment__select')
    select.innerHTML = ''
    const option = document.createElement('option')
    option.innerHTML = 'Selecionar usuário'
    option.value = ''
    option.classList = 'seeDepartment__select--option'
    select.append(option)

    object.forEach((employee) => {
        const option = document.createElement('option')
        
        option.innerHTML = employee.name
        
        option.value = employee.id
        option.classList = 'seeDepartment__select--option'

        select.append(option)
    })
}

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
            modal.close()
            location.reload()
        }
    })
}

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

export function handleUpdateEmployeeModal(){
    const modal = document.querySelector('.updateEmployee__container')
    const openButtons = document.querySelectorAll('.card__buttons--editUser')
    const closeButton = document.querySelector('.updateEmployee__closeButton')
    const inputs = document.querySelectorAll('.updateEmployee__input')
    const saveButton = document.querySelector('.updateEmployee__deleteButton')

    openButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            modal.showModal()
            
            const id = event.target.dataset.userId
            localStorage.setItem("@empresas:employeeId", id)
            
            const filteredEmployee = allEmployees.filter((employee) => employee.id === id)
            inputs[0].value = filteredEmployee[0].name
            inputs[1].value = filteredEmployee[0].email
            
            closeModal(closeButton, modal)
        })
    })
    saveButton.addEventListener('click', async(event) => {
        const employeeId = localStorage.getItem("@empresas:employeeId")
        let employeeBody = {}
        let count = 0
        inputs.forEach((input) => {
            if(input === ''){
                count+=1
            }
            employeeBody[input.name] = input.value
        })

        if(count !== 0){
            count = 0
            alert('Por favor, preencha todos os campos')
        } else{
            await updateEmployee(employeeBody, employeeId)
            modal.close()
            location.reload()
        }
    })

}

export function handleDeleteEmployeeModal(){
    const modal = document.querySelector('.deleteEmployee__container')
    const openButtons = document.querySelectorAll('.card__buttons--excludeUser')
    const closeButton = document.querySelector('.deleteEmployee__closeButton')
    const deleteButton = document.querySelector('.deleteEmployee__deleteButton')
    const h2 = document.querySelector('.deleteEmployee__h2')
    
    openButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            modal.showModal()
            
            
            const id = event.target.dataset.userId
            localStorage.setItem("@empresas:employeeId", id)
            const filteredEmployee = allEmployees.filter((employee) => employee.id === id)
            h2.innerHTML = `Realmente deseja remover o usuário ${filteredEmployee[0].name} ?`
                        
            closeModal(closeButton, modal)
        })
    })
    deleteButton.addEventListener('click', async (event) => {
        const employeeId = localStorage.getItem("@empresas:employeeId")
            await removeEmployee(employeeId)
            modal.close()
            location.reload()
    })

}

function closeModal(button, modal){
    button.addEventListener('click', (event) => {
        event.preventDefault()
        modal.close()
    })
}

async function addAndRemoveText(){
    const textNoDepartments = document.querySelector('.cards__noDepartments')
    const companyId = localStorage.getItem("@empresas:company_id")
    const select = document.querySelector('.select')

    const company = await getCompanyById(companyId)
    
    let classStyle = 'hidden'
    const departments = await readDepartmentsByCompany(companyId)

    if((select.value !== '') && (departments[0] === undefined)){
        textNoDepartments.classList.remove(classStyle)
        textNoDepartments.innerHTML = `Empresa ${company.name} não possui departamentos cadastrados`
    } else if((departments[0] !== undefined) || (select.value === '')){
        textNoDepartments.classList.add(classStyle)
        textNoDepartments.innerHTML = ''
    }
}

handleCreateDepartmentModal()
redirectPage(logoutButton, loginPath)
renderDepartment(allDepartments)
renderUser(allEmployees)
renderSelect()
handleSelect()
authentication()
