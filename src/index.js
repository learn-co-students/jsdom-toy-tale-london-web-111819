let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  const inputForm = document.querySelector(".add-toy-form")
  inputForm.addEventListener("submit", function(e) {
    let name = document.querySelector('input[name="name"]').value 
    let image = document.querySelector('input[name="image"]').value
     
    let formData = {
      name: name,
      image: image,
      likes: 0
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
  fetch("http://localhost:3000/toys", configObj)
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      location.reload() //this refreshes page, as new toy is now part of index, it will load with
    })                          //functions below
    .catch(function(error){
      alert("unauthorized");
      console.log(error.message);
    });                
  });
  getAllToys()

  function getAllToys(){
    const targetUrl = "http://localhost:3000/toys"

    fetch(targetUrl)
     .then(resp => resp.json())
     .then(json => renderToys(json));
    
  }

function renderToys(json) {
 const targetDiv = document.querySelector("#toy-collection")
  for (const element of json) {
  const newDiv = document.createElement('div')
  newDiv.className = "card"
  newDiv.id = element.id
  
  const newH2 = document.createElement('h2')
  newH2.innerText = element.name 
  newDiv.appendChild(newH2)

  const newImg = document.createElement('img')
  newImg.src = element.image
  newImg.className = "toy-avatar"
  newDiv.appendChild(newImg)

  const newP = document.createElement('p')
  newP.innerText = `${element.likes} Likes `
  newDiv.appendChild(newP)

  const newButton = document.createElement('button')
  newButton.className = "like-btn"
  newButton.innerText = "Like <3"
  newButton.addEventListener("click", function(e){
    // find what the current likes is

    let targetId = e.target.parentNode.id
    let constructedUrl = "http://localhost:3000/toys".concat("/").concat(targetId)
    fetch(constructedUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      let currentLikes = object.likes    

    //construct the PATCH request and increment the likes
    const newLikes = currentLikes +1
    updateLikesForMe(newLikes,constructedUrl)
  }) 

  })
  newDiv.appendChild(newButton)
  targetDiv.appendChild(newDiv)
 }
}
//WORKING!
function updateLikesForMe(newLikes,constructedUrl){
let updateData = {
  likes: newLikes
};
let configObj2 = {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(updateData)
};

fetch(constructedUrl, configObj2)
.then(function(response){
  return response.json();
})
.then(function(object){
  location.reload() //this refreshes page, as new toy is now part of index, it will load with
})                          //functions below
.catch(function(error){
  alert("unauthorized");
  console.log(error.message);
});  
}
//WORKING! 


})
