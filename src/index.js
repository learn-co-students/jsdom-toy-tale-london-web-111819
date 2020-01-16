document.addEventListener("DOMContentLoaded", ()=>{


  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const appendToysDiv = document.querySelector("#toy-collection")
  const baseUrl = "http://localhost:3000/toys/"


  function get(url) {
    return fetch(url)
    .then(resp => resp.json())
  }

  function post(url, obj) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
  }

  function patch(url, id, obj) {
    return fetch(`${url}${id}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(resp => resp.json())
  }


  function destroy(url, id) {
    return fetch(`${url}${id}`, {
      method: "DELETE"
    })
  }

  function getToys() {
    get(baseUrl)
    .then(toys => toys.forEach(renderToys))
  }

  function renderToys(toy) {
    let div = document.createElement("div")
    div.className = "card"

    let h2 = document.createElement("h2")
    h2.innerText = toy.name

    let img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"

    let p = document.createElement("p")
    p.innerText = `${toy.likes} likes`

    let likeBtn = document.createElement("button")
    likeBtn.className = "like-btn"
    likeBtn.innerText = "Like <3"

    let deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Delete"


    div.append(h2, img, p, likeBtn, deleteBtn)
    appendToysDiv.appendChild(div)

    likeBtn.addEventListener("click", () => patchLikeThenRender(toy.id, p))
    deleteBtn.addEventListener("click", () => deleteToyFromServerThenClient(toy, div))

  }

  function deleteToyFromServerThenClient(toy, div) {
    destroy(baseUrl, toy.id).then(() => div.remove())
  }

  function postToyThenRenderToy(event) {
    event.preventDefault()

    let bodyObj = {
      name: event.target.name.value,
      image: event.target.image.value
    }
    post(baseUrl, bodyObj)
    .then(toy => {
      renderToys(toy)
      toyForm.reset()
    })
  }

  function patchLikeThenRender(id, p) {
     
      let bodyObj = {
        likes: parseInt(p.innerText) + 1
      }

      patch(baseUrl, id, bodyObj).then(toy => {
        p.innerText = `${toy.likes} likes`
      })
    
  }


   

  let addToy = false

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })







  getToys()

  toyForm.addEventListener("submit", postToyThenRenderToy)

})