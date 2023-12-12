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
    // console.log(allCategories)
    // for (let project of allProjects) {
    //     console.log(project)
    //     createFigure(project.title, project.imageUrl)

    // }
    
    createWorks(allProjects,allCategories)
    
   
    
    
    
})
function createWorks(allProjects,allCategories){
    allProjects.map(function(project){
        createFigure(project.title, project.imageUrl, project.categoryId)
    })
    
    createFilters(allCategories)
}
//je creer mes balises for works et je le lie aux parents/enfants //
function createFigure(title, pictureSrc, categoryId) {
    let newWorks = document.createElement("figure")
    let newPicture = document.createElement("img")
    let newTitle = document.createElement("figcaption")
    newTitle.innerText = title
    newPicture.src = pictureSrc
    newPicture.setAttribute("alt", title) 
    newWorks.classList.add("works-items")
    newWorks.dataset.categoryId = categoryId
    newWorks.appendChild(newPicture)
    newWorks.appendChild(newTitle)

    let gallery = document.querySelector(".gallery")
    gallery.appendChild(newWorks)

}

//effacement boutons//
// document.querySelector(".filters-container").innerHTML = ''


//generer les bouttons filtres//
function createFilters(allCategories){
    let filterContainer = document.querySelector(".filters-container")
    let filterAll = document.createElement("button")
    filterAll.innerText = "Tous"
    filterAll.dataset.categoryId = 0 
    filterAll.classList.add("button-filter") 
    filterContainer.appendChild(filterAll)
    allCategories.forEach((element) => {
        let filter = document.createElement("button")
        filter.innerText = element.name
        filter.dataset.categoryId = element.id
        filter.classList.add("button-filter")
        filterContainer.appendChild(filter)
    });
    applyFilters()
}

   
function applyFilters(){
    let listFilter = document.querySelectorAll(".button-filter")
    let works = document.querySelectorAll("works-items")
    listFilter.forEach((item) => {
        item.addEventListener("click", ()=>{
            let filterId = item.dataset.categoryId //recuperation de l'id qui a ete cliker//
            works.forEach((work) => {
                let workCategoryId = work.dataset.categoryId
                if (filterId == workCategoryId){
                    work.classList.remove("display-none")
                } else {
                    work.classList.add("display-none")
                }
            })  
        })
    })

}

