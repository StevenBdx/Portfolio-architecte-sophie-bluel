
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

  })
  if (response.ok) {//conditions de recuperation des token , et affichage erreur si mauvaise saisie//
    const url = location.protocol + '//' + location.host + '/FrontEnd/index.html'
    location.href = url
    let data = await response.json()
    localStorage.setItem("userId", data.userId)//recup de mes token//
    localStorage.setItem("token", data.token)//recup de mes token//
  }
  else {
    let newErrorMessage = document.getElementById("input-error-id")
    newErrorMessage.classList.remove("hide")
  }
}




