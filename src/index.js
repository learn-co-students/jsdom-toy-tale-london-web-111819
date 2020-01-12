//API Functions

//Constrants / Global Variables

//Functions

//EventListeners/Loading Functions

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
 
  // / MY CODE STARTS HERE =================================================================================
// ==================================================================================
///HELPER APIS
function get(URI){
  return fetch(URI).then(response=>response.json()).catch(error=>showError(error))
}

function destroy(URI, id){
  console.log(id)
  let configObj = {
    method: "DELETE"
  }
  return fetch(`${URI}${id}`, configObj).then(response=>response.json()).catch(error=>showError(error))
}

function post(URI,newToyObj){
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToyObj)
  };
  return fetch(URI,configObj).then(response=>response.json()).catch(error=>showError(error))
}

function patch(url, id, bodyObject) {
  return fetch(`${url}${id}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify(bodyObject)
  }).then(resp => resp.json())
}

//CONSTANTS
const toyAddButton = document.querySelector(".add-toy-form")
const URI = "http://localhost:3000/toys/"
const toyCollection = document.querySelector("#toy-collection")

//FUNCTIONS
function showError(error){
  console.log(error.message)
}

function fetchToysAndPutThemInThePage(URI){
  get(URI).then(toys=>toys.forEach(addCardToPage))
}

function deleteToyAndRemoveFromPage(id,elementToRemove){
  destroy(URI,id).then(response=>elementToRemove.remove())
}

function addNewToyAndRenderTheCard(event){
  let newToyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  };
  post(URI,newToyObj).then(toy=>function(toy){
    addCardToPage(toy)
  });
}

function updateLikeandRenderPage(id, likesElement) {
  let bodyObject = {
    likes: parseInt(likesElement.innerText) + 1
  }
  patch(URI, id, bodyObject).then(toy => {
    likesElement.innerText = `${toy.likes} LikesZZZ`
  })
}

function addCardToPage(toy){
let newDiv = document.createElement('div')
newDiv.classList.add('card')
let newh2 = document.createElement('h2')
newh2.innerText = toy.name
let newImg = document.createElement('img')
newImg.classList.add('toy-avatar')
newImg.src = toy.image
let newP = document.createElement('p')
newP.innerText = `${toy.likes} Likes`
let newLikeButton = document.createElement('button')
newLikeButton.innerText = "Like <3"
newLikeButton.classList.add('like-btn')
newLikeButton.addEventListener("click",function(event){
  console.log("Likes clicked")
  updateLikeandRenderPage(toy.id,newP)
})
let newDeleteButton = document.createElement('button')
newDeleteButton.innerText = "Delete"
newDeleteButton.addEventListener("click",()=>deleteToyAndRemoveFromPage(toy.id,newDiv))
newDiv.append(newh2,newImg,newP,newLikeButton,newDeleteButton)
toyCollection.appendChild(newDiv)
}

//EVENETLISTENERS / LOADINGFUNCTIONS
fetchToysAndPutThemInThePage(URI)
toyAddButton.addEventListener("submit",function(event){
  addNewToyAndRenderTheCard(event)
});

  // MY CODE FINISHES HERE==================================================================================
// ==================================================================================

})
