let authorArray;
const authorBar = document.querySelector("#author-display");
const imageDetail = document.querySelector(".image-detail");
const authorDetail = document.querySelector("#author-details")

document.addEventListener("DOMContentLoaded", () => {
  getAuthors();

  function getAuthors() {
    fetch("http://localhost:3000/authors")
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        authorArray = data;
        renderAuthorImages(authorArray);
      });
  }

  function renderAuthorImages(authorArray) {
    authorBar.innerHTML = authorArray.map(renderEachImage).join("");
  }

  function renderEachImage(author) {
    return `
        <img id=${author.id} class="author-image" src="${author.image}" />
        `;
  }
});
//DOMContentLoaded ends

document.addEventListener("click", (e) => {
  if (e.target.className === "author-image") {
    const authorToDisplay = authorArray.find(
      (author) => author.id === parseInt(e.target.id)
    );
    renderAuthorDetails(authorToDisplay);
  }
});

function renderAuthorDetails(author) {
  authorDetail.innerHTML = `
  <img class="image-detail" src="${author.image}">
  <h3 class="author-name">${author.name}</h3>
  `
}
