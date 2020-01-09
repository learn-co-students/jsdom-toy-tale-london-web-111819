let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toySubmitForm = document.querySelector('.add-toy-form')
  const toyCollection = document.querySelector('#toy-collection')
  const nameInput = document.querySelector('[name=name]')
  const imgInput = document.querySelector('[name=image]')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

    fetch('http://localhost:3000/toys').then(function(response) {
      return response.json();
    })

    .then(function(toys) {
      for (let i = 0; i < toys.length; i++) {
        // Create the elements
        const card = document.createElement('div')
        const toyName = document.createElement('h2')
        card.appendChild(toyName)
        const toyImg = document.createElement('img')
        toyImg.className = 'toy-avatar'
        card.appendChild(toyImg)
        const toyLikes = document.createElement('p')
        card.appendChild(toyLikes)
        const likeButton = document.createElement('button')
        likeButton.textContent = 'Like'
        card.appendChild(likeButton)
        card.className = 'card'
        likeButton.className = 'like-button'

        // add the content from fetch response
        toyName.textContent = toys[i].name
        toyImg.src = toys[i].image
        toyLikes.textContent = toys[i].likes

        // add the card to document
        toyCollection.appendChild(card)

        // listen for likes
        likeButton.addEventListener('click', function(e) {
          const buttonParent = e.target.parentNode;
          const likesAmount = buttonParent.getElementsByTagName('p')[0];
          console.log(likesAmount)
          let newLikes = parseInt(likesAmount.innerText);
          newLikes += 1
          likesAmount.innerText = newLikes
          const configurationObject = {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              likes: newLikes
            })
          }
          fetch(`http://localhost:3000/toys/${toys[i].id}`, configurationObject)
        })

      }
    })

    toySubmitForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const configurationObject = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: nameInput.value,
          image: imgInput.value
        })
      }

      fetch('http://localhost:3000/toys', configurationObject)
      .then(function(response) {
        location.reload()
      })

    })
})


