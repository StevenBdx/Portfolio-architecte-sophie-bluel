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

//je creer mes balises for works et je le lie aux parents/enfants
//project : contient un tableau avec les données du projet.
/*exemple : {
  "id": 0,
  "title": "string",
  "imageUrl": "string",
  "categoryId": "string",
  "userId": 0
}*/
//displaytilte : est un booleen : true : ajoute l'element a la galerie de la page, false ajoute l'element a la galerie de la modale.
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
        buttonfordelete.type = 'button'
        let carbageIcon = document.createElement('i')                             //creation image poubelle//
        carbageIcon.classList.add('fa-solid', 'fa-trash-can', 'delete-icone')
        carbageIcon.dataset.projectId = project.id
        buttonfordelete.dataset.projectId = project.id
        buttonfordelete.appendChild(carbageIcon)
        buttonfordelete.addEventListener("click", deleteWorkEvent)
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

let modal = document.getElementById("myModal")
let btnModif = document.querySelector(".js-modal")
let spanClose = document.getElementsByClassName("close")[0]

// When the user clicks the button, open the modal
btnModif.onclick = async function() {
    modal.style.display = "flex"
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
// When the user clicks on <span> (x), close the modal
spanClose.onclick = function() {
    modal.style.display = "none"
}

	// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none" 
        }
    }

// targeting elements of modal
let createBtn = document.getElementById("create-btn")
let innerGallery = document.getElementById("inner-gallery")
let innerForm = document.getElementById("inner-form")
let returnGallery = document.getElementById("return-gallery")
let createWork = document.getElementById("create-work")



createBtn.addEventListener("click", function() {
    innerGallery.classList.add("hide")
    innerForm.classList.add("show")
});  

returnGallery.addEventListener("click", function() {
    innerGallery.classList.remove("hide")
    innerForm.classList.add("hide")
    innerForm.classList.remove("show")
});


//create work form on modal 2
createWork.addEventListener("submit", async function(e) {
    e.preventDefault()
    let image = document.querySelector("#insert-image").files[0]
    let title = document.getElementById("name").value 
    let category = document.getElementById("categories-select").value
    let postToken = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", parseInt(category));
    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": 'Bearer ' + postToken,
        },
        body: formData,
    });

    if (response.ok) {
        let responseProject = await response.json()
        createFigure(responseProject,true)
        createFigure(responseProject,false)
        document.getElementById("name").value = ''
        document.getElementById("categories-select").value = ''
        document.getElementById('insert-image').value = ''
        document.getElementById("image-preview").src = './assets/icons/picture-svgrepo-com1.png'
        document.getElementById("image-preview").classList.remove("image-loaded")
        document.getElementById("format").classList.remove("hide")
        document.getElementById("input-image").classList.remove("hide")
    }
}); 

document.getElementById("insert-image").addEventListener("change", checkInput)
document.getElementById("categories-select").addEventListener("change", checkInput)
document.getElementById("name").addEventListener("change", checkInput)

function checkInput() {
    let image = document.querySelector("#insert-image").files[0]
    let title = document.getElementById("name").value
    let category = document.getElementById("categories-select").value
    let buttonValid = document.getElementById("add-work")
    //condition for valid button
    if(title !== '' && category !== '' && image !== ''){
        buttonValid.disabled = false 
        buttonValid.style.opacity = 1
    }else {
        buttonValid.disabled = true
        buttonValid.style.opacity = 0.33
    }
}


// creation function for delete works
const deleteWorkEvent = function(event) {
    event.stopPropagation()
    const targetId = event.target.getAttribute("data-project-id")
    deleteWork(targetId)
}; 

async function deleteWork(id) {
    let postToken = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE", 
        headers: {
            "Authorization": 'Bearer ' + postToken,
        },         
    });

    if (response.ok) {
        let gallery = document.querySelector(".gallery")
        let galleryModal = document.getElementById("gallery-modal")
        Array.from(gallery.children).forEach((item) => {
            if(id === item.dataset.projectId){  
                item.remove()
            }
        })
        Array.from(galleryModal.children).forEach((item) => {
            if(id === item.dataset.projectId){
                item.remove()
            }
        })  
    }
}
//function for file for display when u select him//
document.addEventListener("DOMContentLoaded", () => {
    const inputImage = document.getElementById("insert-image")
    const imagePreview = document.getElementById("image-preview")
    const textFormat = document.getElementById("format")
    const inputLabel = document.getElementById("input-image")
  
    inputImage.addEventListener("change", (e) => {
      const file = e.target.files[0]
  
      if (file) {
        const reader = new FileReader()
  
        reader.onload = function (e) {
          imagePreview.src = e.target.result
          imagePreview.classList.add("image-loaded")
          textFormat.classList.add("hide")
          inputLabel.classList.add("hide")
        };
  
        reader.readAsDataURL(file)
      } else {
        // Réinitialise l'aperçu si aucun fichier n'est sélectionné
        imagePreview.src = ""
        imagePreview.classList.remove("image-loaded")
        textFormat.classList.remove("hide")
        inputLabel.classList.remove("hide")
      }
    });
  });



