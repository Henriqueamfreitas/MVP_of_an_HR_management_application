// We are going to define the URL base
const baseUrl = 'http://localhost:3333'
const stringfiedToken = JSON.parse(localStorage.getItem("@empresas:loginObject")) || ''
const token = stringfiedToken.authToken

const requestHeaders = { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,                                  
} 


// We are going to get an array with all the CATEGORIES from the API (Alimetício, varejo ...)
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

// We are going to get an array with all the COMPANIES from the API
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

// We are going to create a function that recieves an object with name, email and password and create a 
// new user with that characteristics
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
            console.log(response.message)
        }
    })

    return user
}

// We are going to create a function that recieves an object with email and password and check if these 
// credentials are correct
export async function validateLoginUser(userBody){
    const user = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userBody),
    })
    .then(async (res) => {
        if(res.ok){
            console.log("credenciais válidas")
            return res.json()
        } else{
            const response = await res.json()
            console.log(response.message)
        }
    })

    return user
}

// We are going to get an array with all the information from the logged user
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

// We are going to create a function that recieves the category ID of the logged user and return
// an array with these department characteristics
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

// We are going to get an array with all the departments
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

// We are going to create a function that recieves the company ID of the logged user and return
// an array with these company characteristics
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

// We are going to get an array with all the employees
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

// We are going to create a function that recieves an object with department information and create
// a department with these characteristics
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



