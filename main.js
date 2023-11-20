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
let addPostButton = document.querySelector(".container .add-post-button")
let createPostForm = document.querySelector(".create-post-form");
let createFormCloseButton = document.querySelector (".create-post-form .close-button")
let createPostButton = document.querySelector (".create-post-form .create-button")
let personImage = document.querySelector (".logout-prop .person-image");
let currenPage=1;
let lastPage=1;


  
if (localStorage.getItem("token") != null) {
  loginButtonMain.style.display="none";
  registerButton.style.display="none";
  logoutDiv.style.display="flex";
  if (addPostButton != null) {
    addPostButton.style.display="flex";

  }
  
  const user = getCurrentUser();

  let personName = document.querySelector (".logout-prop .person-name");

  personName.innerHTML = user.username;
  personImage.src=user.profile_image;
  getPosts();

}

window.addEventListener("scroll", function () {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endOfPage && currenPage < lastPage) {
    currenPage++;
    getPosts(currenPage);

    
  }
});



function getPosts (currenPage=1) {
  fetch (`https://tarmeezacademy.com/api/v1/posts?limit=8&page=${currenPage}`)
  .then (response => {
    if (response.ok) {
      return response.json();
    }
  }).then (json => {
    lastPage = json.meta.last_page;
    let posts = json.data;
    // console.log (posts);
    let postsArray = Array.from (posts);
    postsArray.forEach (function (post) {
      let postTitle = "";
        if (post.title != null ) {
          postTitle = post.title;
        }
        let content = `<div class="post-box bg-white rounded shadow">
          <div class="person-info d-flex border-bottom">
            <img src="${post.author.profile_image}" alt="" class="rounded-circle">
            <div class="user-name">@${post.author.name}</div>
          </div>
          <div class="post-body mt-1" onclick="postClicked(${post.id})">
            <div class="post-image">
              <img src="${post.image}" alt="">
            </div>
            <div class="post-content">
              <span class="post-time">${post.created_at}</span>
              <h6 class="post-title">${postTitle}</h6>
              <p class="post-text">${post.body}</p>
            </div>
            <div class="comments border-top">
              <i class="fa-regular fa-comments"></i>
              <span>(${post.comments_count}) Comments</span> 
              <span class="tags-${post.id}"></span>
            </div>
          </div>
        </div>`

        if (post.title == null) {
          post.title = " ";
        }

        if (postsContainer != null) {
          postsContainer.innerHTML += content;

        }

        

        let tags = post.tags;


      let currentPost = `.tags-${post.id}`
        tags.forEach (function (tag) {
          let tagsContainer = document.querySelector(currentPost);

          let tagsContent = `<span class="p-2 bg-dark-subtle rounded mx-1" role="button">${tag.name}</span>`

          tagsContainer.innerHTML += tagsContent; 
        })


    })

  })
}

getPosts();



//login form settings

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
          if (addPostButton != null) {
            addPostButton.style.display="flex";

          }
        
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
  if (addPostButton != null) {
    addPostButton.style.display="none";

  }
  
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
          if (addPostButton != null) {
            addPostButton.style.display="none";
        }
          addPostButton.style.display="flex";
          
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

// create post button//

if (addPostButton != null) {

  addPostButton.addEventListener("click", function() {
  splashScreen.style.display="block";
  createPostForm.style.display="block";
})

}


if (createFormCloseButton != null) {
  createFormCloseButton.addEventListener ("click", function () {
  createPostForm.style.display="none";
  splashScreen.style.display="none";
})


}


// create post button //



// create new post 

function createPost () {
  if (createPostButton != null) {
  createPostButton.addEventListener ("click",function() {
  let title = document.getElementById("create-post-title").value;
  let body = document.getElementById("create-post-body").value;
  let image = document.getElementById("create-post-image").files[0];
  let token = localStorage.getItem("token");
  let formData = new FormData();
  formData.append("title",title);
  formData.append("body", body);
  formData.append("image",image);
  
  fetch("https://tarmeezacademy.com/api/v1/posts",
    {
        headers: {
          'Accept': 'application/json',
          "authorization": `Bearer ${token}`
          
        },
        method: "POST",
        body: formData
    })
      .then( response => response.json())
      .then( response => {
        

      
        document.getElementById("create-post-title").value="";
        document.getElementById("create-post-body").value="";
        document.getElementById("create-post-image").value="";
        createPostForm.style.display="none";
        splashScreen.style.display="none";
        alertSettings("Post has been created Successfully", "green");
          setTimeout(() => {
            alert.style.display="none";
          }, "1000");

          window.location.reload();

          
          
      
      })
})


}

}


createPost();





function getCurrentUser () {
  let user = null;

  let localStorageUser = localStorage.getItem("userStorage");

  if (localStorageUser != null) {
    user = JSON.parse(localStorageUser);

}
  return user;


}



function postClicked (postId) {
  window.location = `postdetails.html?postId=${postId}`;
}


