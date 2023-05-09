// We are going to define the URL base
const baseUrl = 'http://localhost:3333'

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

