// API endpoint --------------------------------------------
const baseUrl = "https://api.github.com/users/";

// Get Elements --------------------------------------------
const searchInput = getElement("#searchInput"),
  searchButton = getElement("#searchButton"),
  container = getElement("#Profile"),
  erroMessage = getElement("#error");

let username; // Nome ou numero passado na caixa de busca
let user; // Responsavel por guardar os dados recebidos da API
let card; // Responsavel por receber o HTML

// Build Functions --------------------------------------------

// Função para reduzir a escrita na captura de elementos HTML
function getElement(element) {
  return document.querySelector(element);
}

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel
function requestuserinfo(url, name) {
  console.log("requestuserinfo");
  fetch(url + name)
    .then((response) => response.json())
    .then((data) => {
      user = data;
    })
    .catch((err) => console.log(err));
}

function startApp(username) {
  console.log("startApp");
  requestuserinfo(baseUrl, username);

  setTimeout(function () {
    if (user.detail) {
      erroMessage.style.display = "block";
      container.style.display = "none";
    } else {
      erroMessage.style.display = "none";
      container.style.display = "flex";
      container.innerHTML = createCard();
    }
  }, 800);
}

searchButton.addEventListener("click", (event) => {
  console.log("searchButton");
  event.preventDefault();
  username = searchInput.value.toLowerCase();
  requestuserinfo(baseUrl, username);
  startApp(username);
});

function createCard() {
  console.log("createCard");

  card = `
  <div class="flex flex-col md:flex-row justify-evenly p-12 rounded-xl bg-slate-600">
  <img class="w-[230px] h-[230px] rounded-xl mr-10 mb-2" src="${user.avatar_url}" alt="" />
  <div class="flex-col justify-center">
    <h1 class="text-3xl mb-2">Login: ${user.login}</h1>
    <h1 class="text-3xl mb-2">name: ${user.name}</h1>
    <div class="flex mb-2">
      <i class="mr-2 fa-solid fa-2x fa-location-dot"></i>
      <h2 class="text-2xl">${user.location}</h2>
    </div>
    <h2 class="text-xl mb-2">Blog: <a href="${user.blog}">${user.blog}</a></h2>
    <h2></h2>
    <div class="flex flex-col md:flex-row mb-2">
      <p class="text-xl mr-2">Seguindo: ${user.following}</p>
      <p class="text-xl">Seguidores ${user.followers}</p>
    </div>
    <div class="mb-2">
      <p class="text-xl mb-2">${user.bio}</p>
      <p class="text-xl"> Respositorios Publicos: ${user.public_repos}</p>
    </div>
    <div>
      <a href="${user.html_url}">
        <i class="fa-brands fa-2x fa-github"></i>
      </a>
    </div>
  </div>
  <p></p>
</div>`;
  return card;
}
