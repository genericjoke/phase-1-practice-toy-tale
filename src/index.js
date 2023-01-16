let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded",
  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json();
    })
    .then(function (toyList) {
      toyList.forEach(renderToy);
    }));

function renderToy(toy) {
  const toyDiv = document.createElement("div");
  toyDiv.classList.add("card");

  const toyName = document.createElement("h2");
  const toyImg = document.createElement("img");
  let toyLikes = document.createElement("p");
  const toyButton = document.createElement("button");

  toyName.textContent = `${toy.name}`;
  toyImg.src = `${toy.image}`;
  toyLikes.textContent = `${toy.likes}`;
  toyButton.textContent = "Like  ❤️";
  toyDiv.id = `${toy.id}`

  toyImg.classList.add("toy-avatar")
  toyButton.classList.add("like-btn");

  toyButton.addEventListener("click", function (e) {
    toyLikes.textContent = parseInt(toyLikes.textContent)+1;
    console.log(toyLikes);
    fetch(`http://localhost:3000/toys/${toyDiv.id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": toyLikes.textContent
      })
    })
  });
  
  toyDiv.appendChild(toyName);
  toyDiv.appendChild(toyImg);
  toyDiv.appendChild(toyLikes);
  toyDiv.appendChild(toyButton);
  document.getElementById('toy-collection').appendChild(toyDiv);
}

document.addEventListener("submit", function (e) {
  e.preventDefault();
  postRequest(e);
  renderToy({
    "name": e.target.name.value,
    "image": e.target.image.value,
    "likes": 0,
    "id": temp.id
  });

  e.target.name.value = "";
  e.target.image.value = "";
})

function postRequest(e) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    })
  })
}

