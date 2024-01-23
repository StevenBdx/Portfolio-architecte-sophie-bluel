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

    //connection verification//
    let tokenExist = localStorage.getItem("token")
    
    if (tokenExist != null) {
    let textForModif = document.querySelector(".modif-text").classList.remove("hide")
    let editionFilter = document.querySelector(".filters-container")
    document.querySelector(".edition-mode").classList.remove("hide")
    let changeLoginNav = document.getElementById("log-out")
    changeLoginNav.innerText = 'Logout'
    changeLoginNav.href = 'index.html'
    editionFilter.classList.add("hide");
    changeLoginNav.addEventListener('click', function(){
        localStorage.removeItem("token")
        document.querySelector(".edition-mode").classList.add("hide")
    })
    }
    
    function createWorks(allProjects,allCategories){
        allProjects.map(function(project){
            createFigure(project, true)
        })   
    }
    createWorks(allProjects,allCategories)
    createFilters(allCategories)
    applyFilters()
     
})

//je creer mes balises for works et je le lie aux parents/enfants //
function createFigure(project, displayTitle) {
    let newWorks = document.createElement("figure")
    let newPicture = document.createElement("img")
    newPicture.src = project.imageUrl
    newPicture.setAttribute("alt", project.title) 
    newWorks.classList.add("works-items")
    newWorks.dataset.categoryId = project.categoryId
    newWorks.dataset.projectId = project.id
    newWorks.appendChild(newPicture)
    
    
    if (displayTitle){
        let newTitle = document.createElement("figcaption")
        newTitle.innerText = project.title
        newWorks.appendChild(newTitle)
        let gallery = document.querySelector(".gallery")
        gallery.appendChild(newWorks)
    }else {
        let galleryModal = document.getElementById('gallery-modal')
        let buttonfordelete = document.createElement('button')                     //creation button poubelle//
        buttonfordelete.classList.add('button-delete') 
        let carbageIcon = document.createElement('i')                             //creation image poubelle//
        carbageIcon.classList.add('fa-solid', 'fa-trash-can', 'delete-icone')
        carbageIcon.dataset.projectId = project.id
        buttonfordelete.appendChild(carbageIcon)
        newWorks.appendChild(buttonfordelete)
        newWorks.classList.add("works-modal")
        galleryModal.appendChild(newWorks)
    }
    

}

//generer les bouttons filtres//
function createFilters(allCategories){
    let filterContainer = document.querySelector(".filters-container")
    let filterAll = document.createElement("button")
    filterAll.innerText = "Tous"
    filterAll.dataset.categoryId = 0 
    filterAll.classList.add("button-filter", "button-filter-active") 
    filterContainer.appendChild(filterAll)
    allCategories.forEach((element) => {
        let filter = document.createElement("button")
        filter.innerText = element.name
        filter.dataset.categoryId = element.id
        filter.classList.add("button-filter")
        filterContainer.appendChild(filter)
    });
    
}

   
function applyFilters(){
    let listFilter = document.querySelectorAll(".button-filter")
    let works = document.querySelectorAll(".works-items")
    listFilter.forEach((item) => {
        item.addEventListener("click", ()=>{
            let filterId = item.dataset.categoryId //recuperation de l'id qui a ete cliker//
            listFilter.forEach((buttonCheck) => {
                let filterToCheck = buttonCheck.dataset.categoryId 
                if (filterId === filterToCheck) {
                    buttonCheck.classList.add("button-filter-active")      
                }else {
                    buttonCheck.classList.remove("button-filter-active")
                }

            }) 

            works.forEach((work) => {
                let workCategoryId = work.dataset.categoryId
                if (filterId == workCategoryId || filterId == 0){
                    work.classList.remove("display-none")
                } else {    
                    work.classList.add("display-none")
                }    
            })
        })
    })

}

let modal = null

let openModal = async function (e) {
    e.preventDefault()
    let target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    let galleryModal = document.getElementById('gallery-modal')
    if (galleryModal.children.length === 0){
        let allCategories = await getAllCategories()
        let allProjects = await getAllProjects()
    
    function createWorks(allProjects,allCategories){
        allProjects.map(function(project){
            createFigure(project, false)

        })   
    }
    createWorks(allProjects,allCategories)
    }
   
   
}

let modalAddPhoto = function (e) {
    e.preventDefault()
    let target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

let closeModal = function (e) {
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

let stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})


document.querySelectorAll('.add-work').forEach(a => {
    a.addEventListener('click', modalAddPhoto)
})

