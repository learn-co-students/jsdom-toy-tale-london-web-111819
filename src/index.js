let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{

  // gobal variables

  const baseUrl = "http://localhost:3000/toys/"
  const toyCollection = document.querySelector("[id ='toy-collection'")
  const addNewToyForm = document.querySelector(".add-toy-form")
  const inputName = document.querySelector("[name='name']")
  const inputImage = document.querySelector("[name='image']")

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

  //request functions 

  function get(url){
    return fetch(url)
    .then((response) => response.json())
  }

  function post(url, bodyOject){
    return fetch(url,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(bodyOject)
    }).then((response) => response.json())
  }

  function patch(url, id, bodyOject){
    return fetch(`${url}${id}`, {
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(bodyOject)
    }).then((response) => response.json())
  }


  //functions 

  function renderToys(toysList){
    for(const toy of toysList){
      renderToy(toy)
    }
  }

  function renderToy(toy){
    let div = document.createElement("div")
    div.className = "card"
    let h2 = document.createElement("h2")
    h2.innerText = toy.name
    let img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"
    let p = document.createElement("p")
    p.innerText = `${toy.likes} Likes`
    let likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.innerText = "Like <3"
    likeButton.addEventListener('click', () => increaseToyLikes(p, toy.id))
    div.append(h2, img, p, likeButton)
    toyCollection.append(div)
  }

  function getAllToys(){
    get(baseUrl)
    .then((toys) => renderToys(toys))
  }

  function addNewToy(e){
    e.preventDefault()

    bodyOject = {
      name: inputName.value,
      image: inputImage.value, 
      likes: 0
    }
    post(baseUrl, bodyOject)
    .then((toy) => renderToy(toy))
  }

  function increaseToyLikes(likesElement, id){
    bodyOject={
      likes: parseInt(likesElement.innerText.split(" ")[0]) + 1
    }
    patch(baseUrl, id, bodyOject)
    .then((toy) => {likesElement.innerText = `${toy.likes} Likes`})
  }


  // call functions and event listeners 

  getAllToys()
  
  addNewToyForm.addEventListener('submit', addNewToy)

})
