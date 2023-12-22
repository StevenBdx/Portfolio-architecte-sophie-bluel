
//récupération de champs du formulaire//
document.addEventListener("DOMContentLoaded", async () => {
  let loginForm = document.getElementById("login-form")
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault()
    let recoverEmail = document.getElementById("email")
    let email = recoverEmail.value
    let recoverPassword = document.getElementById("password")
    let password = recoverPassword.value
    postData(email, password)
  })

})

//Envoie de l'api//
async function postData(email, password) {
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      "email": email,
      "password": password
    }),

  });
  if (response.ok) {
    const url = location.protocol + '//' + location.host + '/FrontEnd/index.html'
    location.href = url
    let data = await response.json()
    console.log(data)
    localStorage.setItem("userId", data.userId)
    localStorage.setItem("token", data.token)
  }
  else {
    let newErrorMessage = document.querySelector(".input-error")
    newErrorMessage.classList.remove("hide")
    

  }


}
// function createErrorMessage (){
//     let textError = ("Vous vous êtes trompé dans votre saisie")
//     let newError = document.createElement("div")
//     let newMessage = document.createElement("p")
//     newMessage.innerText = textError
//     newError.classList.add("error") 

//     newError.appendChild(newMessage)

//     let errorMessage = document.getElementById("login-form")
//     errorMessage.appendChild(newError)
//   }



