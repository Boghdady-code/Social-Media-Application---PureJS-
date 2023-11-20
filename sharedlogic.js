let postsContainer = document.querySelector (".posts-container");
let loginButtonMain = document.querySelector (".container .heading .buttons .login");
let loginForm = document.querySelector(".login-form");
let loginFormCloseButton = document.querySelector (".login-form .close-button")
let splashScreen = document.querySelector (".splash");
let loginButtonSecond= document.querySelector (".splash .login-form .login-button");
let registerButton = document.querySelector (".container .heading .buttons .register");
let logoutDiv = document.querySelector (".container .heading .buttons .logout-prop");
let logoutButton = document.querySelector (".container .heading .buttons .logout");
let alertClosure = document.querySelector (".alert .alert-body i");
let alert = document.querySelector (".alert")
let heading = document.createElement("h1");
let registerButtonMain = document.querySelector(".container .buttons .register");
let registerForm = document.querySelector(".register-form");
let registerFormCloseButton = document.querySelector (".register-form .close-button")
let registerButtonSecond= document.querySelector (".splash .register-form .register-button");
let personImage = document.querySelector (".logout-prop .person-image");

if (localStorage.getItem("token") != null) {
  loginButtonMain.style.display="none";
  registerButton.style.display="none";
  logoutDiv.style.display="flex";
  const user = getCurrentUser();

  let personName = document.querySelector (".logout-prop .person-name");

  personName.innerHTML = user.username;
  personImage.src=user.profile_image;
  

  
  

}

loginButtonMain.addEventListener("click", function() {
  splashScreen.style.display="block";

  loginForm.style.display="block";
  


})


loginFormCloseButton.addEventListener ("click", function () {
  registerForm.style.display="none";
  splashScreen.style.display="none";
})


// login form settings //


//alert
alertClosure.addEventListener("click", function() {
  alert.style.display="none";
})


function alertSettings (message, color) {
  let headingText = document.createTextNode (message);
  alert.style.display="block";
  alert.style.backgroundColor = color;
  heading.appendChild(headingText);
  let alertBody = document.querySelector(".alert .alert-body");
  alertBody.appendChild(heading);
  


}



//alert

//login
loginButtonSecond.addEventListener("click", function() {
  let usernameValue = document.getElementById("input-login").value;
  let passwordValue = document.getElementById("password-login").value;
  console.log (usernameValue, passwordValue)
  

    fetch("https://tarmeezacademy.com/api/v1/login",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          
        },
        method: "POST",
        body: JSON.stringify({"username":usernameValue, "password":passwordValue})
    })
      .then( response => response.json())
      .then( response => {
        document.getElementById("input-login").value="";
        document.getElementById("password-login").value="";
        splashScreen.style.display="none";
        loginForm.style.display="none";
        const token = response.token
        const userStorage = response.user
        
        if (token != null && userStorage != null) {
          localStorage.setItem ("token", token);
          localStorage.setItem("userStorage", JSON.stringify(userStorage));
          alertSettings("Logged in successfully", "green")
          setTimeout(() => {
            alert.style.display="none";
            heading.innerHTML=" ";
          }, "1000");
          loginButtonMain.style.display="none";
          registerButton.style.display="none";
          logoutDiv.style.display="flex";
        
          //  let userProfilePic = response.user.profile_image;
          // personImage.src = userProfilePic;
          const user = getCurrentUser();
          console.log (user);

          let personName = document.querySelector (".logout-prop .person-name");

          personName.innerHTML = user.username;
          personImage.src=user.profile_image;
          
          
        } else {
          alertSettings("Username or Password are incorrect", "#d0342c");
          
          setTimeout(() => {
            alert.style.display="none";
            heading.innerHTML=" ";
          }, "1000");
          

        

          


        }
      })
      

})

//login

//logout 

logoutButton.addEventListener ("click", function() {
  localStorage.removeItem("token");
  localStorage.removeItem("userStorage");
  logoutDiv.style.display="none";

  
  loginButtonMain.style.display="inline-block";
  registerButton.style.display="inline-block";
  alertSettings("Logged out successfully", "green")
  setTimeout(() => {
  alert.style.display="none";
  heading.innerHTML=" ";
  }, "2000");
  // personImage.src = "";


})






//register button//

registerButtonMain.addEventListener("click", function() {
  splashScreen.style.display="block";
  registerForm.style.display="block";
})


registerFormCloseButton.addEventListener ("click", function () {
  registerForm.style.display="none";
  splashScreen.style.display="none";
})


//register button//


// register

registerButtonSecond.addEventListener("click", function() {
  let usernameValue = document.getElementById("register-username").value;
  let passwordValue = document.getElementById("register-password").value;
  let nameValue= document.getElementById("register-name").value;
  let emailValue= document.getElementById("register-email").value;
  let image = document.getElementById("register-image").files[0];
  let formData = new FormData();
  formData.append("username",usernameValue);
  formData.append("password",passwordValue);
  formData.append("email",emailValue);
  formData.append("name",nameValue);
  formData.append("image",image);
    fetch("https://tarmeezacademy.com/api/v1/register",
    {
        headers: {
          'Accept': 'application/json'
          
        },
        method: "POST",
        body: formData
    })
      .then( response => response.json())
      .then( response => {
        console.log (response);
        document.getElementById("register-username").value="";
        document.getElementById("register-password").value="";
        document.getElementById("register-name").value="";
        document.getElementById("register-email").value="";
        document.getElementById("register-image").file="";
        splashScreen.style.display="none";
        loginForm.style.display="none";
        const token = response.token
        const userStorage = response.user
        

        
        if (token != null && userStorage != null) {
          localStorage.setItem ("token", token);
          localStorage.setItem("userStorage", JSON.stringify(userStorage));
          alertSettings("User Created successfully", "green")
          setTimeout(() => {
            alert.style.display="none";
            heading.innerHTML=" ";
          }, "1000");
          loginButtonMain.style.display="none";
          registerButton.style.display="none";
          logoutDiv.style.display="flex";
          
          
          const user = getCurrentUser();

          let personName = document.querySelector (".logout-prop .person-name");

          personName.innerHTML = user.username;

          personImage.src=user.profile_image;
          

        } 
        else {
          alertSettings("Username or Email is already Exist", "#d0342c");
          setTimeout(() => {
            alert.style.display="none";
            heading.innerHTML=" ";
          }, "1000");
        }
      })
})

function getCurrentUser () {
  let user = null;

  let localStorageUser = localStorage.getItem("userStorage");

  if (localStorageUser != null) {
    user = JSON.parse(localStorageUser);

}
  return user;


}
