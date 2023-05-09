const baseUrl = 'http://localhost:3333'

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

