window.onload = function() {
    getData();
};

const monsterContainer = document.getElementById("monster-container");
const backBtn = document.getElementById("back");
const forwardBtn = document.getElementById("forward");

let limit = "?_limit=100&_page=";
let page;
localStorage.getItem("page") ? page = Number(localStorage.getItem("page")) : page = 1;

let Url = 'http://localhost:3000/monsters/' + limit + page;

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());

    submitData(value.name, value.age, value.description);
    form.reset();
    location.reload();
}

backBtn.addEventListener("click", function() {
    page === 1 ? page = 1 : page = page - 1;
    localStorage.setItem("page", page);
    location.reload();
})

forwardBtn.addEventListener("click", function() {
    page === 11 ? page = 11 : page = page + 1;
    localStorage.setItem("page", page);
    location.reload();
})

function getData() {

    fetch(Url)
    .then(data => {return data.json()})
    .then(res => {
        for(let i = 0; i < res.length; i++) {
            const monsterDiv = document.createElement("div");
            const h2 = document.createElement("h2");
            const h4 = document.createElement("h4");
            const p = document.createElement("p");

            h2.textContent = res[i].name;
            h4.textContent = `Age: ${res[i].age}`;
            p.textContent = `Bio: ${res[i].description}`;
            monsterDiv.appendChild(h2);
            monsterDiv.appendChild(h4);
            monsterDiv.appendChild(p);
            monsterContainer.appendChild(monsterDiv);
        }
    });
}



function submitData(name, age, description) {
    const formData = {
        name: name,
        age: age,
        description: description
      };
      
      const configurationObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      };
      
      return fetch("http://localhost:3000/monsters", configurationObject)
        .then(function (response) {
          return response.json();
        })
        .then( () => getData())
        .catch(function (error) {
            console.log(error.message);
            document.body.append(error.message);
        });
}
