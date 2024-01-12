export function toast(message, color) {
    const body = document.querySelector('body');
    const container = document.createElement('div');
    const text = document.createElement('p');
  
    container.classList.add('toast__container', 'toast__add');
    container.style.backgroundColor = color;
  
    text.innerText = message;
  
    container.appendChild(text);
  
    body.appendChild(container);
  
    setTimeout(() => {
      container.classList.add('toast__remove');
    }, 3000);
  
    setTimeout(() => {
      body.removeChild(container);
    }, 4990);
}
const green = '#22966D'
const red = '#C96047'

const baseUrl = 'http://localhost:3333'
const stringfiedToken = JSON.parse(localStorage.getItem('@empresas:loginObject')) || ''
const token = stringfiedToken.authToken

const requestHeaders = { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,                                  
} 


export async function getAllCategories(){
    const allCategories = await fetch(`${baseUrl}/categories/readAll`, {
        method: 'GET',
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return allCategories
}

export async function getAllCompanies(){
    const allCompanies = await fetch(`${baseUrl}/companies/readAll`, {
        method: 'GET',
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return allCompanies
}

export async function createNewUser(userBody){
    const user = await fetch(`${baseUrl}/employees/create`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userBody),
    })
    .then(async (res) => {
        if(res.ok){
            console.log('Usuário cadastrado')
            return res.json()
        } else{
            const response = await res.json()
            alert(response.message)
        }
    })

    return user
}

export async function validateLoginUser(userBody){
    const user = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userBody),
    })
    .then(async (res) => {
        if(res.ok){
            toast('login realizado com sucesso', green)
            return res.json()
        } else{
            const response = await res.json()
            alert(response.message)
        }
    })
    return user
}

export async function getLoggedUserInformation(){
    const userInformation = await fetch(`${baseUrl}/employees/profile`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })
    return userInformation
}

export async function getCategoryInformation(categoryId){
    const categoryInformation = await fetch(`${baseUrl}/departments/readById/${categoryId}`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return categoryInformation
}

export async function getAllDepartments(){
    const allDeparments = await fetch(`${baseUrl}/departments/readAll`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return allDeparments
}

export async function getCompanyById(companyId){
    const company = await fetch(`${baseUrl}/companies/readById/${companyId}`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return company
}

export async function getAllEmployees(){
    const AllEmployees = await fetch(`${baseUrl}/employees/readAll`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return AllEmployees
}

export async function createNewDepartment(departmentBody){
    const newDepartment = await fetch(`${baseUrl}/departments/create`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(departmentBody),
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })
    return newDepartment
}

export async function getAllUnemployed(){
    const allUnemployed = await fetch(`${baseUrl}/employees/outOfWork`, {
        method: 'GET',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })
    return allUnemployed
}

export async function hireEmployee(departmentId, employeeId){
    const newEmployee = await fetch(`${baseUrl}/employees/hireEmployee/${employeeId}`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(departmentId),
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return newEmployee
}

export async function fireEmployee(employeeId){
    const firedEmployee = await fetch(`${baseUrl}/employees/dismissEmployee/${employeeId}`, {
        method: 'PATCH',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return firedEmployee
}

export async function updateDepartment(departmentBody, departmentId){
    const departmentUpdated = await fetch(`${baseUrl}/departments/update/${departmentId}`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(departmentBody), 
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })
    return departmentUpdated
}

export async function removeDepartment(departmentId){
    const departmentRemoved = await fetch(`${baseUrl}/departments/delete/${departmentId}`, {
        method: 'DELETE',
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })
    return departmentRemoved
}

export async function updateEmployee(employeeBody, employeeId){
    const employeeUpdated = await fetch(`${baseUrl}/employees/updateEmployee/${employeeId}`, {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(employeeBody), 
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })
    return employeeUpdated
}

export async function removeEmployee(employeeId){
    const employeeRemoved = await fetch(`${baseUrl}/employees/deleteEmployee/${employeeId}`, {
        method: 'DELETE',
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })
    return employeeRemoved
}

export async function readDepartmentsByCompany(companyId){
    const departments = await fetch(`${baseUrl}/departments/readByCompany/${companyId}`, {
        method: 'GET',
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })
    return departments
}

export async function readEmployeesByCompany(companyId){
    const employees = await fetch(`${baseUrl}/companies/readById/${companyId}`, {
        method: 'GET',
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok){
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })
    return employees
}
