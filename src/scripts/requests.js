// We are going to define the URL base
const baseUrl = 'http://localhost:3333'
const requestHeaders = { 
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}`,                                  
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