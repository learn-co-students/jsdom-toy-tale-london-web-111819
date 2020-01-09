let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{

  
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const createBtn = document.querySelector('input.submit')
  const likeBtn = document.querySelectorAll('.like-btn')

  // debugger
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  createBtn.addEventListener('click', function(e){
    e.preventDefault()
    let toyData = {
      name: document.querySelector('input[name="name"]').value,
      likes: 0, 
      image: document.querySelector('input[name="image"]').value
    }

    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toyData)
    };

    return fetch(toys, configObj)
      .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      const toyCollection = document.querySelector('#toy-collection')
      renderToy(data, toyCollection)
    })
  })


  const toys = 'http://localhost:3000/toys'

  fetch(toys)
  .then(function(response) {
    return response.json()
  })
  .then(function(allToys){
    const toyCollection = document.querySelector('#toy-collection')
    for(const data of allToys){
    renderToy(data, toyCollection)
    }  
  })

  function renderToy(data, toyCollection){
    //defining Elements
    const toyCard = document.createElement('div')
    const toyName = document.createElement('h2')
    const toyImage = document.createElement('img')
    const toyLikes = document.createElement('p')
    const likeButton = document.createElement('button')

    //Adding Attributes to the Elements
    toyCard.id = data.id
    toyCard.classList.add('card')

    toyName.innerText = data.name

    toyImage.setAttribute('src', data.image)
    toyImage.classList.add('toy-avatar')
    
    if (data.likes == 1){
      toyLikes.innerText = `${data.likes} Like`
    }
    else {
    toyLikes.innerText = `${data.likes} Likes`
    }

    likeButton.id = data.id
    likeButton.classList.add('like-btn')
    likeButton.innerText = 'Like <3'
    likeButton.addEventListener('click', function(){
    
    let likeObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({

        'likes': data.likes ++
    })
  }

    return fetch(`http://localhost:3000/toys/${data.id}`, likeObj)
      .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      if (data.likes == 1){
        toyLikes.innerText = `${data.likes} Like`
      }
      else {
      toyLikes.innerText = `${data.likes} Likes`
      }



  })
})

    toyCard.appendChild(toyName)
    toyCard.appendChild(toyImage)
    toyCard.appendChild(toyLikes)
    toyCard.appendChild(likeButton)
    toyCollection.append(toyCard)
  }


  
  

})

