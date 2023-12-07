async function getAllProjects() {
    let response = await fetch("http://localhost:5678/api/works")
    let data = await response.json()
    return data
}


async function getAllCategories() {
    let response = await fetch("http://localhost:5678/api/categories")
    let data = await response.json()
    return data
}

document.addEventListener("DOMContentLoaded", async () => {
    let allCategories = await getAllCategories()
    let allProjects = await getAllProjects()
    console.log(allCategories)
    // for (let project of allProjects) {
    //     console.log(project)
    //     createFigure(project.title, project.imageUrl)

    // }
    allProjects.map(function(project){
        createFigure(project.title, project.imageUrl)
    })
    createFilters("Tous")
    allCategories.map(function(categories){
        createFilters(categories.name)
    })
})

//je creer mes balises et je le lie aux parents/enfants //
function createFigure(title, pictureSrc) {
    let newWorks = document.createElement("figure")
    let newPicture = document.createElement("img")
    let newTitle = document.createElement("figcaption")
    newTitle.innerText = title
    newPicture.src = pictureSrc
    newPicture.setAttribute("alt", title) 

    newWorks.appendChild(newPicture)
    newWorks.appendChild(newTitle)

    let gallery = document.querySelector(".gallery")
    gallery.appendChild(newWorks)

}

function createFilters(name) {
let newFilter = document.createElement("button")

newFilter.innerText = name

let container = document.querySelector(".filters-container")
container.appendChild(newFilter)
}
