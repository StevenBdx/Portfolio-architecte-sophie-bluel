

document.addEventListener("DOMContentLoaded", async () => {
    let loginForm = document.getElementById("login-form")
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault()
        let recoverEmail = document.getElementById("email")
        let email = recoverEmail.value
        let recoverPassword = document.getElementById("password")
        let password = recoverPassword.value
        postData(email, password)
    })
    
})


async function postData(email, password) {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        "email": email,
        "password": password
      }), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
    });
  console.log(response)
  }

  
  