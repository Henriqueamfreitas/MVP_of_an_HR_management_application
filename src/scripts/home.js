import { getAllCategories } from './requests.js'

// We are going to get all the categories from the API and render them on the select in the HTML document
async function renderSelect(){
    // We are getting an array with all the categories from the API and assigning them to the variables allCategories
    const allCategories = await getAllCategories()
    // We are getting the 'select' from the HTML document
    const select = document.querySelector('.companies__select')

    allCategories.forEach((category) => {
        // We are going to create HTML element
        const option = document.createElement('option')
        
        // We are going to assign value to the element
        option.innerText = category.name

        // We are going to assign class and id to the element
        option.value = category.id
        option.classList = 'companies__select--option'

        // We are going to establish the hirarchy between the elements
        select.append(option)
    })
}
renderSelect()